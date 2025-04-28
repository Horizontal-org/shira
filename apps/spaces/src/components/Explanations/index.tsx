import React, { FunctionComponent, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { useStore } from '../../store'
import { DragItem } from '../LegacyQuestionContent/components/DragItem'
import { ExplanationInput } from './components/ExplanationInput'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Component } from '../../utils/dynamicComponents'
import { Explanation } from '../../store/slices/explanation'
import { publish } from '../../utils/customEvent'
import { cleanDeletedExplanations } from '../../utils/explanations'
import { ExplanationDragItem } from './components/ExplanationDragItem'
import { Body2Regular, styled } from '@shira/ui'
import { remapHtml } from '../../utils/remapHtml'

interface Props {
  initialData?: Explanation[]
  content?: Object
  handleContent?: (id: string, value: string) => void
  onDelete?: (explId: number) => void
}

export const Explanations: FunctionComponent<Props> = ({ 
  initialData, 
  content, 
  handleContent,
  onDelete
}) => {

  const {
    storeExplanations,
    changeSelected,
    selectedExplanation,
    deleteExplanation,
    updateExplanation,
    updateExplanations,
    setInitialExplanations,    
  } = useStore((state) => ({
    storeExplanations: state.explanations,
    changeSelected: state.changeSelected,
    selectedExplanation: state.selectedExplanation,
    updateExplanation: state.updateExplanation,
    updateExplanations: state.updateExplanations,
    deleteExplanation: state.deleteExplanation,
    setInitialExplanations: state.setInitialExplanations,    
  }), shallow)

  useEffect(() => {
    if(initialData?.length > 0) {
      const initialExplanations = initialData?.map(init => init)
      setInitialExplanations(initialExplanations)
    }
  }, [initialData])

  const reorder = (list, startIndex, endIndex) => {
    const result: Explanation[] = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result.map((r, i) => {
      return {
        ...r,
        position: i + 1
      }
    })
  };
  

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      storeExplanations,
      result.source.index,
      result.destination.index
    );

    updateExplanations(items)
  }

  const cleanStateExplanations = (indexToDelete) => {
    
    const html = remapHtml(content)
    
    const explanationsHtml = html.querySelectorAll('[data-explanation]') 
    const toDelete = Array.from(explanationsHtml).find(e => parseInt(e.getAttribute('data-explanation')) === parseInt(indexToDelete))

    if (toDelete && toDelete.nodeName !== 'MARK') {
      const id = toDelete.getAttribute('id')
      
      const stringWithoutAttribute = content[id].replace(/ data-explanation='[^']*'/g, '');
      handleContent(
        id,
        stringWithoutAttribute
      )

      // console.log("🚀 ~ cleanContent ~ stringWithoutAttribute:", stringWithoutAttribute)


      // const cleanContent = (content) => {
      //   const stringWithoutAttribute = content.replace(/ data-explanation='[^']*'/g, '');
      //   console.log("🚀 ~ cleanContent ~ stringWithoutAttribute:", stringWithoutAttribute)
      //   console.log(stringWithoutAttribute);
      //   // setContent(id, stringWithoutAttribute);
      // };
      // if(id.includes('required')) {
      //   const content = requiredContent[id]
      //   cleanContent(content, setRequiredContent);
      // }
      // if(id.includes('optional')) {
      //   const content = optionalContent[id]
      //   cleanContent(content, setOptionalContent);
      // }
      // if(id.includes('attachment')){
      //   const content = dynamicContent[id]
      //   cleanContent(content, setDynamicContent);
      // }
    }
  }

  return (
    <Wrapper>
  
      <Body2Regular>Explanations will be shown in the following order in the quiz. </Body2Regular>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >          
              { storeExplanations.map(((e, i) => (
                <ExplanationDragItem
                  key={e.position + ''} 
                  id={e.position + ''}   
                  title={e.title}
                  text={e.text}
                  selected={+e.index === selectedExplanation}
                  index={i}  
                  component={(
                    // ONLY INPUT
                    <ExplanationBox
                      key={e.index}
                      selected={+e.index === selectedExplanation}
                      onClick={() => {
                        changeSelected(e.index)
                      }}
                    >
                      <ExplanationInput 
                        text={e.text}
                        unselect={() => { changeSelected(null) }}
                        onUpdate={(text) => {
                          updateExplanation(e.index, text, e.position, e.id, e.title)
                        }}
                      />
                    </ExplanationBox>
                  )}
                  onDelete={() => {   
                    // this removes the data-explanation attr from zustand                                     
                    cleanStateExplanations(e.index)
                    // this removes the data-explanation attribute from the DOM
                    publish('delete-explanation', { deleteIndex: e.index })
                    
                    // cleanDeletedExplanations(e.index)
                    onDelete(e.index)
                    // this removes the explanation item
                    deleteExplanation(e.index)                    
                  }}
                />
              ))) }
              { provided.placeholder }
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-left: 8px;
  height: 100%;
  padding: 4px;
  > p {
    margin: 0;
    padding: 10px;
    font-weight: 600;
  }
`

interface StyledExplanation {
  selected: boolean;
}

const ExplanationBox = styled.div<StyledExplanation>`
  padding: 8px;
  border-radius: 16px; 
  background-color: ${props => props.theme.colors.green1};
  
  > textarea {
   background-color: ${props => props.theme.colors.green1};
  }

  ${props => props.selected && `
    background-color: white;


    > textarea {
      background-color: white;
    }
  `}
`
