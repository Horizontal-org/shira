import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { Input } from '../../../Input'
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
      <InputWithExplanation
        id='component-required-sender-name'
        name='sender-name'
        placeholder='Sender name'
        initialValue={parseCustomElement('component-required-sender-name')}
        required={true}
        onChange={(expl, value) => {
          onChange(expl, value, 'component-required-sender-name')
        }}
      />
      <InputWithExplanation
        id='component-required-sender-email'
        required={true}
        name='sender-email'
        placeholder='Sender email'
        initialValue={parseCustomElement('component-required-sender-email')}
        onChange={(expl, value) => {
          onChange(expl, value, 'component-required-sender-email')
        }}
      />
    </div>
  )
}
