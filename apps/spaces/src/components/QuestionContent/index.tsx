import { cloneElement, FunctionComponent, useEffect, useState } from 'react'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components'
import shallow from 'zustand/shallow';
import { useStore } from '../../store';
import { Component, componentOptions } from '../../utils/dynamicComponents';

import { AddComponent } from '../AddComponent'
import { Attachment } from '../DynamicComponents/Attachment';
import { TextEditor } from '../DynamicComponents/TextEditor'
import { DragItem } from './components/DragItem';

interface Props {
  appType: string;
  initialContent?: {
    position: number;
    type: string;
    content: string;
    node: JSX.Element;
  }[];
}


const componentsList = [
  {
    type: 'text',
    node: (<TextEditor />),
    position: 0
  },
  {
    type: 'attachment',
    node: (<Attachment />),
    position: 0
  }
]

export const reorder = (list, startIndex, endIndex) => {
  const result: Component[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const validate = (appType, componentType, comps) => {
  const appLimits = componentOptions(appType)
  const componentLimits = appLimits.find((appL) => appL.id === componentType)

  return comps.filter((c) => c.type === componentLimits.id).length < componentLimits.limit
}

export const QuestionContent: FunctionComponent<Props> = ({
  appType,
  initialContent
}) => {
  const {
    lastIndex, 
    setLastIndex ,
    deleteExplanations,
    deleteContent,
  } = useStore((state) => ({
    lastIndex: state.lastIndex,
    setLastIndex: state.setLastIndex,
    deleteExplanations: state.deleteExplanations,
    deleteContent: state.deleteContent
  }), shallow)

  const [components, handleComponents] = useState<Component[]>(initialContent ?? [
    {
      node: (<TextEditor/>),
      type: 'text',
      position: lastIndex
    },
  ]) 

  useEffect(() => {
    setLastIndex(components.length)
  }, [])

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: Component[] = reorder(
      components,
      result.source.index,
      result.destination.index
    );

    handleComponents(items)
  }
  
  return (
    <>
      <DynamicContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >          
                { components.map(((c, i) => (
                  <DragItem 
                  key={c.position + ''} 
                  id={c.position + ''}   
                  index={i}  
                  component={cloneElement(c.node, { 
                    componentId: c.position,
                    componentPosition: i,
                    initialContent: c.content 
                  })}
                  onDelete={() => {
                    const newComponents = components.filter(cf => cf.position !== c.position)                
                    handleComponents(newComponents)
                    setLastIndex(newComponents.length)
                    deleteExplanations(c.position, c.type)
                    deleteContent(`component-${c.type}-${c.position}`)
                  }}
                />
                ))) }
                { provided.placeholder }
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DynamicContent>
      <AddComponent
        type={appType}        
        componentOptions={componentOptions}
        addComponent={(componentType) => {
          if (validate(appType, componentType, components)) {
            const newComponents = [...components]
            const newIndex = lastIndex + 1
  
            let findComponent = {
              ...componentsList.find((c) => c.type === componentType),
              position: newIndex,
            }
  
            setLastIndex(newIndex)
            newComponents.push(findComponent)
            handleComponents(newComponents)
          }          
        }} 
      />
    </>
  )
}

const DynamicContent = styled.div`
  padding-bottom: 8px;
`
