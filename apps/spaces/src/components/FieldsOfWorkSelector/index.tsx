import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { AppItem } from '../AppItem'

interface Props {}

export const FieldsOfWorkSelector: FunctionComponent<Props> = () => {

  const {
    fieldsOfWork,
    fetchFieldsOfWork,
    setSelectedFieldsOfWork,
    selectedFieldsOfWork
  } = useStore((state) => ({
    fieldsOfWork: state.fields_of_work,
    fetchFieldsOfWork: state.fetchFieldsOfWork,
    setSelectedFieldsOfWork: state.setSelectedFieldsOfWork,
    selectedFieldsOfWork: state.selectedFieldsOfWork
  }), shallow)
  const [selected, handleSelected] = useState(null)

  useEffect(() => {
    fetchFieldsOfWork()
  }, [])

  useEffect(() => {
    setSelectedFieldsOfWork(selected)
  }, [selected])

  useEffect(() => {
    if (selected !== selectedFieldsOfWork) {
      handleSelected(parseInt(selectedFieldsOfWork))
    }
  }, [selectedFieldsOfWork])

  return (
    <Wrapper>
      { fieldsOfWork.map((a) => (
        <AppsWrapper key={a.id}>
          <AppItem           
            label={a.name}
            onClick={() => {
              if (selected === a.id) {
                handleSelected(null)
              } else {
                handleSelected(a.id)
              }
            }}
            selected={selected === a.id}
          />
        </AppsWrapper>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  `
  
  const AppsWrapper = styled.div`
  padding-right: 12px;
  padding-bottom: 10px;
`