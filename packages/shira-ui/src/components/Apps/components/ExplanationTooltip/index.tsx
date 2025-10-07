import { FunctionComponent, useEffect, useState, useRef } from "react"
import styled from 'styled-components';
import './styles.css'

import { usePopper } from 'react-popper';
import { Explanation } from "../../../../domain/explanation";

interface Props {
  explanation: Explanation
  explanationNumber?: number
  showExplanations?: boolean
}

const ExplanationTooltip: FunctionComponent<Props> = ({
  explanation,
  explanationNumber,
  showExplanations,
}) => {

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const referenceElementRef = useRef<HTMLElement | null>(null);

  const isUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return text.startsWith('http://') || text.startsWith('https://') || text.startsWith('www.');
    }
  };

  const { styles, attributes, update } = usePopper(referenceElementRef.current, popperElement, {
    modifiers: [
      { name: 'flip', options: { fallbackPlacements: ['top', 'bottom'], padding: 100 } },
      { name: 'arrow', options: { element: arrowElement } },
      { name: 'offset', options: { offset: [0, 8] } },
    ],
  });

  useEffect(() => {
    const referenceElement = document.querySelector(`[data-explanation="${explanation.index}"]`) as HTMLElement;
    referenceElementRef.current = referenceElement;
  }, [explanation.index]);

  useEffect(() => {
    const referenceElement = document.querySelector(`[data-explanation="${explanation.index}"]`) as HTMLElement;

    if (showExplanations && parseInt(explanation.index) === explanationNumber) {
      referenceElement?.scrollIntoView?.({ behavior: 'smooth' })
    }
  }, [explanationNumber, showExplanations, explanation.index])

  useEffect(() => {
    const references = document.querySelectorAll(`[data-explanation="${explanationNumber}"]`) as NodeListOf<HTMLElement>
    const explanations = document.querySelectorAll(`[data-explanation]`) as NodeListOf<HTMLElement>
    let parentDiv: HTMLElement | null = null

    // here we should remove the background color from all the explanations
    explanations.forEach(e => {
      e.style.zIndex = '0'
      e.style.background = 'transparent';
      parentDiv = e.parentElement as HTMLElement;
      if (parentDiv) {
        parentDiv.style.zIndex = '0';
      }
    })

    // here we should highlight the current explanation
    references.forEach(reference => {
      if (reference && showExplanations) {
        parentDiv = reference.parentElement as HTMLElement;
        reference.style.zIndex = '4';
        reference.style.background = 'white';
        reference.style.position = 'relative'

        if (parentDiv) {
          parentDiv.style.zIndex = '4';
        }
      }
    })

    // recheck ref position since images take a second to load
    update && update()
  }, [explanationNumber, showExplanations])

  return (
    <Wrapper
      ref={setPopperElement}
      id={`explanation-${explanation.index}`}
      className="tooltip"
      style={styles.popper}
      {...attributes.popper}
      hide={parseInt(explanation.index) !== explanationNumber || !showExplanations}
    >
      <TooltipContent isUrl={isUrl(explanation.text)}>
        {explanation.text}
      </TooltipContent>
      <div ref={setArrowElement} id='arrow' style={styles.arrow} />
    </Wrapper>
  )
}

const Wrapper = styled('div') <{ hide: boolean }>`  
  ${props => props.hide && `
    visibility: hidden;
    > #arrow::before {
      visibility: hidden;
    }
  `}
`

const TooltipContent = styled.div<{ isUrl: boolean }>`
  font-size: 14px;
  line-height: 1.4;
  
  ${props => props.isUrl ? `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 280px;
  ` : `
    white-space: normal;
    word-wrap: break-word;
    max-width: 280px;
  `}
`

export default ExplanationTooltip