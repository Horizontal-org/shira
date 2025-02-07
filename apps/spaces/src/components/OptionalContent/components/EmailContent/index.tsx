import React, { FunctionComponent, useRef, useState } from 'react'
import styled from 'styled-components'
import { InputWithExplanation } from '../../../InputWithExplanation'
import useParseHTML from '../../../../hooks/useParseHtml'
interface Props {
  onChange: (expl, value, name) => void
  initialData?: string
}

export const EmailContent: FunctionComponent<Props> = ({ onChange, initialData }) => {

  const { parseCustomElement } = useParseHTML(initialData)

  return (
    <div>
      <Separator>
        <InputWithExplanation 
          id='component-optional-subject'
          name='subject'
          placeholder='Subject'
          initialValue={parseCustomElement('component-optional-subject')}
          onChange={(expl, value) => {
            onChange(expl, value, 'component-optional-subject')
          }}
        />
      </Separator>
    </div>
  )
}

const Separator = styled.div`
  padding-bottom: 12px;
  display: flex;
  align-items: center;
`