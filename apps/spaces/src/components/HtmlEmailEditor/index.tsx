import { useEffect, useMemo, useRef, useState } from 'react'
import { basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { html } from '@codemirror/lang-html'
import { setDiagnostics } from '@codemirror/lint'
import { htmlSyntaxIssues } from '../../utils/htmlSyntaxValidation'
import { getEmailTextLength } from '../../utils/emailTextLength'
import { CharacterCount, styled } from '@horizontal-org/shira-ui'
import { useTranslation } from 'react-i18next'

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
  const issues = useMemo(() => htmlSyntaxIssues(source), [source])

  const count = useMemo(() => getEmailTextLength(source), [source])

  useEffect(() => {
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
            if (!update.docChanged) return
            const value = update.state.doc.toString()
            setSource(value)
            onChangeRef.current(value)
          }),
        ],
      }),
    })

    view.current = editor

    return () => {
      view.current = null
      editor.destroy()
    }
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
      <div ref={host} />

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
    background-color: color-mix(in srgb, ${props => props.theme.colors.light.paleGreen} 50%, transparent);
  }

  .cm-editor .cm-activeLineGutter {
    background-color: ${props => props.theme.colors.green2};
  }
`
