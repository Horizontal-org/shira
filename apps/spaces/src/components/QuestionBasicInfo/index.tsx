import { FunctionComponent, useState } from "react";
import { 
  Body3, 
  Box, 
  FilterButton, 
  styled, 
  SubHeading3, 
  TextInput 
} from '@shira/ui'
import { App } from "../../fetch/app";
import { QuestionToBe } from "../QuestionFlowManagement/types";

interface Props {
  handleQuestion: (k, v) => void;
  handleApp: (app: App) => void
  question: QuestionToBe
  apps: App[]
  initialAppType: string
}

export const QuestionBasicInfo: FunctionComponent<Props> = ({
  handleQuestion,
  handleApp,
  question,
  apps,
  initialAppType
}) => {

  
  return (
    <StyledBox>   
      <div>
        <SubHeading3>Question name</SubHeading3>
        <Body3>This name will only visible to you, to help you remember what this question is about</Body3>
      </div>

      <div>
        <TextInput
          label="Question name"
          value={question.name}
          onChange={(e) => { 
            handleQuestion('name', e.target.value)
          }}
        />
      </div>

      <div>
        <SubHeading3>Is it phishing?</SubHeading3>
        <FilterButtonsContainer>        
          <FilterButton 
            text="Yes"
            color="green"
            handleFilter={() => {
              handleQuestion('isPhishing', true)
            }}
            isActive={question.isPhishing}
          />

          <FilterButton 
            text="No"
            color="green"
            handleFilter={() => {
              handleQuestion('isPhishing', false)
            }}
            isActive={!question.isPhishing}
          />
        </FilterButtonsContainer>
      </div>

      <div>
        <SubHeading3>Selected app</SubHeading3>
        <FilterButtonsContainer>        

          { apps && apps
          .filter((a) => initialAppType ? initialAppType === a.type : true)          
          .map((a) => (
            <FilterButton 
              key={a.id}
              text={a.name}
              color="green"
              handleFilter={() => {
                handleApp(a)
              }}
              isActive={question.app && question.app.id ===  a.id}
            />
          ))}
          
        </FilterButtonsContainer>
      </div>



    </StyledBox>
  )
}


const StyledBox = styled(Box)`
  position: relative;
  z-index:1;
  padding: 48px;
  width: 1024px;
`

const FilterButtonsContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`
