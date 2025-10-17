import { FunctionComponent, useEffect, useState, useRef } from "react"
import { styled } from '@shira/ui'
import './styles.css'

import { Explanation } from "../../../domain/explanation"
import { usePopper } from 'react-popper';

interface Props {
  explanation: Explanation
  explanationNumber: number
  showExplanations: boolean
  referenceElement?: HTMLElement
}

const ExplanationTooltip: FunctionComponent<Props> = ({ 
  explanation,
  explanationNumber,
  showExplanations,
}) => {
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const referenceElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
  const referenceElement = document.querySelector(`[data-explanation="${explanation.index}"]`) as HTMLElement;

  referenceElementRef.current = referenceElement;
  }, [explanation.index]);

  useEffect(() => {
    const referenceElement = document.querySelector(`[data-explanation="${explanation.index}"]`) as HTMLElement;

    if(showExplanations && parseInt(explanation.index) === explanationNumber) {
      referenceElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [explanationNumber, showExplanations, explanation.index])

  useEffect(() => {
    const references = document.querySelectorAll(`[data-explanation="${explanationNumber}"]`)  as NodeListOf<HTMLElement>
    const explanations = document.querySelectorAll(`[data-explanation]`) as NodeListOf<HTMLElement>
    let parentDiv: HTMLElement | null = null

    // here we should remove the background color from all the explanations
    explanations.forEach( e => {
      e.style.zIndex = '0'
      e.style.background = 'transparent';
      parentDiv = e.parentElement as HTMLElement;
      if (parentDiv) {
        parentDiv.style.zIndex = '0';
      }
    })
    
    // here we should highlight the current explanation
    references.forEach( reference => {
      if(reference && showExplanations) {
        parentDiv = reference.parentElement as HTMLElement;
        reference.style.zIndex = '4';
        reference.style.background = 'white';
  
        if (parentDiv) {
          parentDiv.style.zIndex = '4';
        }
      }
    })
    
  }, [explanationNumber, showExplanations])
  
  const { styles, attributes } = usePopper(referenceElementRef.current, popperElement, {
    modifiers: [
      { name: 'flip', options: { fallbackPlacements: ['top', 'bottom'], padding: 100 }},
      { name: 'arrow', options: { element: arrowElement } },
      { name: 'offset', options: { offset: [0, 8] }},
    ],
  });

  return (
    <Wrapper 
      ref={setPopperElement} 
      id={`explanation-${explanation.index}`} 
      className="tooltip" 
      style={styles.popper} 
      {...attributes.popper}
      hide={parseInt(explanation.index) !== explanationNumber || !showExplanations}
      >
      {explanation.text}
      <div ref={setArrowElement} id='arrow' style={styles.arrow}/>
    </Wrapper>
  )
}

const Wrapper = styled('div')<{ hide: boolean }>`
  ${props => props.hide && `
  visibility: hidden;
  > #arrow::before {
    visibility: hidden;
  }
  `
}
`




export default ExplanationTooltip