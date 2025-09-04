import { FunctionComponent } from "react";
import styled from 'styled-components'

import SearchRegular from './SearchRegular'
import FilterRegular from './FilterRegular'

interface Props {}

export const Search:FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <div>
        <SearchRegular/>
        <span>Search</span>
      </div>
      <FilterButton>
        <FilterRegular />
      </FilterButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 350px;
  height: 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #424242;
  background: #ffffff;
  box-shadow: inset 0 -1px #808080, inset 0 0 0 1px #D1D1D1;
  border-radius: 4px;
  padding: 6px 0 6px 6px;
  cursor: text;

  > div {
    display: flex;
    align-items: center;
    
    > span {
      font-size: 14px;
      font-weight: 400;
      padding-left: 6px; 
      padding-bottom: 1px;
    } 
  }

  &:hover {
    > div {
      visibility: visible; 
    }
  }
`

const FilterButton = styled.div`
  cursor: pointer;
  justify-content: center;
  visibility: hidden;
  height: 24px;
  width: 24px;  
  border-radius: 4px;
  margin-right: 4px;

  &:hover {
    background-color: #E5E5E5;
  }
`

//hover
//background-color: #E5E5E5;
//color: #242424;