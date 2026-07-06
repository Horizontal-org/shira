import { FunctionComponent, useEffect, useRef } from "react"
import styled from 'styled-components';
import './styles.css'

// import { usePopper } from 'react-popper';
import { Explanation } from "../../../../domain/explanation";
import { arrow, autoUpdate, flip, offset, useFloating } from "@floating-ui/react";

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

  // const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  // const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const arrowRef = useRef(null);

  const referenceElementRef = useRef<HTMLElement | null>(null);

  const isUrl = (text: string) => {
    if (!text || text.length === 0) return false;
    try {
      new URL(text);
      return true;
    } catch {
      return text.startsWith('http://') || text.startsWith('https://') || text.startsWith('www.');
    }
  };

  // const { styles, attributes, update } = usePopper(referenceElementRef.current, popperElement, {
  //   modifiers: [
  //     { name: 'flip', options: { fallbackPlacements: ['top', 'bottom'], padding: 100 } },
  //     { name: 'arrow', options: { element: arrowElement } },
  //     { name: 'offset', options: { offset: [0, 8] } },
  //   ],
  // });


  const { refs, floatingStyles, update, middlewareData, placement } = useFloating({
    placement: 'bottom',
    middleware: [
      offset(8),
      flip({
        fallbackPlacements: ['top', 'bottom'],
        padding: 100,
      }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate
  });

  useEffect(() => {
    const referenceElement = document.querySelector(`[data-explanation="${explanation.index}"]`) as HTMLElement;
    referenceElementRef.current = referenceElement;
    refs.setReference(referenceElement)
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
      ref={refs.setFloating}
      id={`explanation-${explanation.index}`}
      className="tooltip"
      style={floatingStyles}
      hide={parseInt(explanation.index) !== explanationNumber || !showExplanations}
    >

      <Arrow
        ref={arrowRef}
        $x={middlewareData.arrow?.x}
        $y={middlewareData.arrow?.y}
        $side={placement.split('-')[0] as 'top' | 'bottom' | 'left' | 'right'}
      />

      <TooltipContent isUrl={isUrl(explanation.text)}>
        {explanation.text}
      </TooltipContent>
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

// font-size: 14px;
const TooltipContent = styled.div<{ isUrl: boolean }>`
  line-height: 1.4;
  
  ${props => props.isUrl ? `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 280px;
  ` : `
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 280px;
  `}

  max-height: 600px;
  overflow-y: auto;
`

export const Arrow = styled.div<{
  $x?: number;
  $y?: number;
  $side: 'top' | 'bottom' | 'left' | 'right';
}>`
  pointer-events: none;
  position: absolute;
  width: 20px;
  height: 20px;
  background: #9FB747;

  ${({ $x }) => ($x != null ? `left: ${$x}px;` : '')}
  ${({ $y }) => ($y != null ? `top: ${$y}px;` : '')}

  ${({ $side }) => {
    const map = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    }
    return `${map[$side]}: -10px;`
  }}

  ${({ $side }) => {
    const clipPaths: Record<string, string> = {
      bottom: 'clip-path: polygon(50% 0%, 100% 50%, 0% 50%);',
      top: 'clip-path: polygon(0% 50%, 100% 50%, 50% 100%);',
      left: 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%);',
      right: 'clip-path: polygon(50% 0%, 0% 50%, 50% 100%);',
    }
    return clipPaths[$side]
  }}
`;

export default ExplanationTooltip