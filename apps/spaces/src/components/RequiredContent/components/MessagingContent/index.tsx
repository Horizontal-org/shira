import React, { FunctionComponent } from 'react'
import { InputWithExplanation } from '../../../InputWithExplanation'
import useParseHTML from '../../../../hooks/useParseHtml'

interface Props {
  onChange: (expl, value, name) => void
  initialData?: string
}

export const MessagingContent: FunctionComponent<Props> = ({ onChange, initialData }) => {
  const { parseCustomElement } = useParseHTML(initialData)
  return (
    <div>
      <div>
        <InputWithExplanation
          id='component-required-phone'
          name='sender-phone'
          placeholder='Phone number'
          initialValue={parseCustomElement('component-required-phone')}
          required={true}
          onChange={(expl, value) => {
            onChange(expl, value, 'component-required-phone')
          }}
          validation='phone'
        />
      </div>

      <div>
        <InputWithExplanation
          id='component-required-fullname'
          name='sender-fullname'
          placeholder='Name'
          initialValue={parseCustomElement('component-required-fullname')}
          required={true}
          onChange={(expl, value) => {
            onChange(expl, value, 'component-required-fullname')
          }}
        />
      </div>
    </div>
  )
}
