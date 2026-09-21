import { useEffect, useMemo, useRef, useState } from 'react'
import { basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { html } from '@codemirror/lang-html'
import { setDiagnostics } from '@codemirror/lint'
import { parser } from '@lezer/html'
import { htmlSyntaxIssues } from '../../utils/htmlSyntaxValidation'
import { getEmailTextLength } from '../../utils/emailTextLength'
import { CharacterCount, ExplanationButton, GeneralTooltip, styled } from '@horizontal-org/shira-ui'
import { useTranslation } from 'react-i18next'
import { useStore } from '../../store'
import { subscribe, unsubscribe } from '../../utils/customEvent'

interface Props {
  initialContent?: string
  onChange: (source: string) => void
  maxLength?: number
  characterLimitErrorText?: string
}

export const HtmlEmailEditor = ({
  initialContent = '',
  onChange,
  maxLength,
  characterLimitErrorText,
}: Props) => {
  const { t } = useTranslation()
  const host = useRef<HTMLDivElement>(null)
  const view = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const [source, setSource] = useState(initialContent ?? '')
  const [canAddExplanation, setCanAddExplanation] = useState(false)
  const [activeExplanation, setActiveExplanation] = useState<number | null>(null)
  const [showExplanationButtonTooltip, setShowExplanationButtonTooltip] = useState(false)
  const issues = useMemo(() => htmlSyntaxIssues(source), [source])

  const count = useMemo(() => getEmailTextLength(source), [source])

  useEffect(() => {
    const updateExplanationSelection = (editor: EditorView) => {
      const selection = editor.state.selection.main
      const value = editor.state.doc.toString()
      const explanation = getExplanationAtSelection(value, selection.from, selection.to)

      setActiveExplanation(explanation)
      setCanAddExplanation(
        explanation === null && canWrapSelection(value, selection.from, selection.to)
      )

      const { selectedExplanation, changeSelected } = useStore.getState()
      if (explanation !== selectedExplanation) changeSelected(explanation)
    }

    const editor = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: initialContent ?? '',
        extensions: [
          basicSetup,
          html(),
          EditorView.lineWrapping,
          EditorView.contentAttributes.of({
            'aria-label': t('create_question.html_editor.title'),
          }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const value = update.state.doc.toString()
              setSource(value)
              onChangeRef.current(value)
            }
            if (update.docChanged || update.selectionSet) {
              updateExplanationSelection(update.view)
            }
          }),
        ],
      }),
    })

    view.current = editor
    updateExplanationSelection(editor)

    return () => {
      view.current = null
      editor.destroy()
    }
  }, [])

  useEffect(() => {
    const handleDeleteExplanation = (event: CustomEvent<{ deleteIndex: number }>) => {
      const editor = view.current
      if (!editor) return

      const value = editor.state.doc.toString()
      const nextValue = removeExplanationMarks(value, event.detail.deleteIndex)
      if (nextValue === value) return

      editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length, insert: nextValue },
      })
    }

    subscribe('delete-explanation', handleDeleteExplanation)
    return () => unsubscribe('delete-explanation', handleDeleteExplanation)
  }, [])

  useEffect(() => {
    const editor = view.current
    if (
      editor &&
      initialContent != null &&
      editor.state.doc.toString() !== initialContent
    ) {
      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.length,
          insert: initialContent,
        },
      })
    }
  }, [initialContent])

  useEffect(() => {
    const editor = view.current
    if (editor)
      editor.dispatch(
        setDiagnostics(
          editor.state,
          issues.map((issue) => ({
            from: Math.min(issue.from, editor.state.doc.length),
            to: Math.min(issue.to, editor.state.doc.length),
            severity: 'error' as const,
            message: t(`create_question.html_editor.errors.${issue.code}`),
          }))
        )
      )
  }, [issues, t])

  return (
    <Wrapper>
      <EditorRow>
        <EditorHost ref={host} />
        <GeneralTooltip
          enabled={!canAddExplanation && activeExplanation === null}
          show={showExplanationButtonTooltip}
          setShow={setShowExplanationButtonTooltip}
          label={t('create_question.tabs.content.explanation_tooltip')}
        >
          <ExplanationButton
            isText
            hasExplanation={activeExplanation !== null}
            active={activeExplanation !== null}
            disabled={!canAddExplanation || activeExplanation !== null}
            onClick={() => {
              const editor = view.current
              if (!editor) return

              const { from, to } = editor.state.selection.main
              const value = editor.state.doc.toString()
              if (!canWrapSelection(value, from, to)) return

              const store = useStore.getState()
              const newIndex = store.explanationIndex + 1
              const openingMark = `<mark data-explanation="${newIndex}">`

              editor.dispatch({
                changes: [
                  { from, insert: openingMark },
                  { from: to, insert: '</mark>' },
                ],
                selection: {
                  anchor: from + openingMark.length,
                  head: to + openingMark.length,
                },
              })
              store.addExplanation(newIndex)
            }}
          />
        </GeneralTooltip>
      </EditorRow>

      {maxLength && (
        <CharacterCount currentLength={count} maxLength={maxLength} />
      )}
      {maxLength && count > maxLength && (
        <p role="alert">{characterLimitErrorText}</p>
      )}

    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  min-width: 0;

  .cm-editor {
    border: 1px solid ${props => props.theme.colors.dark.mediumGrey};
    text-align: left;
  }

  .cm-scroller {
    min-height: 240px;
    max-height: 480px;
    overflow: auto;
  }

  .cm-editor .cm-activeLine {
    background-color: color-mix(in srgb, ${props => props.theme.colors.light.paleGreen} 30%, transparent);
  }

  .cm-editor .cm-activeLineGutter {
    background-color: ${props => props.theme.colors.green2};
  }

  .cm-editor .cm-selectionMatch {
    background-color: ${props => props.theme.colors.green1};
  }
`

const EditorRow = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`

const EditorHost = styled.div`
  flex: 1;
  min-width: 0;
`

const getTextNodeAt = (source: string, position: number, bias: -1 | 1) => {
  const node = parser.parse(source).resolve(position, bias)
  return node.name === 'Text' ? node : null
}

const canWrapSelection = (source: string, from: number, to: number) => {
  if (from === to || !source.slice(from, to).trim()) return false

  const startText = getTextNodeAt(source, from, 1)
  const endText = getTextNodeAt(source, to, -1)
  if (!startText || !endText || startText.from !== endText.from || startText.to !== endText.to) {
    return false
  }

  let ancestor = startText.parent
  while (ancestor) {
    if (ancestor.name === 'Element') {
      const openTag = ancestor.getChild('OpenTag')
      const tagName = openTag?.getChild('TagName')
      const name = tagName ? source.slice(tagName.from, tagName.to).toLowerCase() : ''
      if (['mark', 'script', 'style', 'title'].includes(name)) return false
    }
    ancestor = ancestor.parent
  }

  return true
}

const getExplanationAtSelection = (source: string, from: number, to: number) => {
  const startText = getTextNodeAt(source, from, 1)
  const endText = getTextNodeAt(source, to || from, to === from ? 1 : -1)
  if (!startText || !endText) return null

  let ancestor = startText.parent
  while (ancestor) {
    if (ancestor.name === 'Element' && ancestor.from <= endText.from && ancestor.to >= endText.to) {
      const openTag = ancestor.getChild('OpenTag')
      const tagName = openTag?.getChild('TagName')
      const name = tagName ? source.slice(tagName.from, tagName.to).toLowerCase() : ''
      if (name === 'mark' && openTag) {
        const match = source
          .slice(openTag.from, openTag.to)
          .match(/\bdata-explanation\s*=\s*(?:"(\d+)"|'(\d+)'|(\d+))/i)
        if (match) return Number(match[1] ?? match[2] ?? match[3])
      }
    }
    ancestor = ancestor.parent
  }

  return null
}

const removeExplanationMarks = (source: string, explanationIndex: number) => {
  const index = String(explanationIndex).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(
    `<mark\\b(?=[^>]*\\bdata-explanation\\s*=\\s*(?:"${index}"|'${index}'|${index}(?=\\s|>)))[^>]*>([\\s\\S]*?)<\\/mark\\s*>`,
    'gi'
  )
  return source.replace(pattern, '$1')
}
