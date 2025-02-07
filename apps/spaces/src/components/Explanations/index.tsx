import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { DragItem } from '../QuestionContent/components/DragItem'
import { ExplanationInput } from './components/ExplanationInput'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Component } from '../../utils/dynamicComponents'
import { Explanation } from '../../store/slices/explanation'
import { publish } from '../../utils/customEvent'

interface Props {
  initialData?: Explanation[]
}

export const Explanations: FunctionComponent<Props> = ({ initialData }) => {

  const {
    storeExplanations,
    changeSelected,
    selectedExplanation,
    deleteExplanation,
    updateExplanation,
    updateExplanations,
    setInitialExplanations,
    setRequiredContent,
    setOptionalContent,
    setDynamicContent,
    requiredContent,
    optionalContent,
    dynamicContent
  } = useStore((state) => ({
    storeExplanations: state.explanations,
    changeSelected: state.changeSelected,
    selectedExplanation: state.selectedExplanation,
    updateExplanation: state.updateExplanation,
    updateExplanations: state.updateExplanations,
    deleteExplanation: state.deleteExplanation,
    setInitialExplanations: state.setInitialExplanations,
    setRequiredContent: state.setRequiredContent,
    setOptionalContent: state.setOptionalContent,
    setDynamicContent: state.setContent,
    requiredContent: state.requiredContent,
    optionalContent: state.optionalContent,
    dynamicContent: state.content
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
    const explanationsHtml = document.getElementById('dynamic-content').querySelectorAll('[data-explanation]') 

    const toDelete = Array.from(explanationsHtml).find(e => parseInt(e.getAttribute('data-explanation')) === parseInt(indexToDelete))

    if (toDelete.nodeName !== 'MARK') {
      const id = toDelete.getAttribute('id')

      const cleanContent = (content, setContent) => {
        const stringWithoutAttribute = content.replace(/ data-explanation='[^']*'/g, '');
        console.log(stringWithoutAttribute);
        setContent(id, stringWithoutAttribute);
      };

      if(id.includes('required')) {
        const content = requiredContent[id]
        cleanContent(content, setRequiredContent);
      }
      if(id.includes('optional')) {
        const content = optionalContent[id]
        cleanContent(content, setOptionalContent);
      }
      if(id.includes('attachment')){
        const content = dynamicContent[id]
        cleanContent(content, setDynamicContent);
      }
    }
  }

  return (
    <Wrapper>
  
      <p>Explanations</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >          
              { storeExplanations.map(((e, i) => (
                <DragItem
                  key={e.position + ''} 
                  id={e.position + ''}   
                  index={i}  
                  component={(
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
                          updateExplanation(e.index, text, e.position, e.id)
                        }}
                      />
                    </ExplanationBox>
                  )}
                  onDelete={() => {   
                    // this removes the data-explanation attr from zustand                                     
                    cleanStateExplanations(e.index)
                    // this removes the data-explanation attribute from the DOM
                    publish('delete-explanation', { deleteIndex: e.index })
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
  background: #eee;
  border-radius: 4px;
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
  border: 2px solid white;
  padding: 8px;
  border-radius: 4px; 
  background: white;
  margin-bottom: 4px;

  ${props => props.selected && `
    border: 2px solid #424242;
  `}
`
