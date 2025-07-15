import { styled } from '@shira/ui'

interface StyledIconWrapper {
  active?: boolean
  disabled?: boolean
}

export const MenuWrapper = styled.div`
  padding: 8px;
  background: white;
  border-radius: 6px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`


export const IconWrapper = styled.div<StyledIconWrapper>`
  margin-right: 8px;
  padding: 4px;
  transition: 0.2s all;
  border-radius: 4px;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${props => !props.disabled && `
    cursor: pointer;
    &:hover {
      background: #eee;
      > svg {
        stroke: #424242;
      }
    }
  `}

  > svg {
    stroke: #aaa;
  }

  ${props => props.active && `
    > svg {
      stroke: ${props.theme.secondary.dark};
    }

    &:hover {
      > svg {
        stroke: ${props.theme.secondary.dark};
      }
    }
  `}
`

export const FillIconWrapper = styled(IconWrapper)<StyledIconWrapper>`

  &:hover {
    background: #eee;
    > svg {
      fill: #424242;
    }
  }

  > svg {
    fill: #aaa;
  }

  ${props => props.active && `
    > svg {
      fill: ${props.theme.secondary.dark};
    }

    &:hover {
      > svg {
        fill: ${props.theme.secondary.dark};
      }
    }
  `}
`

export const InputColorWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const InputColor = styled.input`
  margin: 0 8px;
  display: inline-flex;
  vertical-align: bottom;
  border: none;
  border-radius: 50%;
  padding: 0; 
  height: 20px;
  width: 20px;
  cursor: pointer;

  ::-webkit-color-swatch {
    border: 0;
    border-radius: 50%;
  }

  ::-moz-color-swatch {
    border: 0;
    border-radius: 50%;
  }

`
export const ExplanationIconWrapper = styled.div<StyledIconWrapper>`
  margin-right: 8px;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s all;
  border-radius: 4px;
  height: 20px;
  display: flex;
  align-items: center;

  &:hover {
    background: ${props => props.disabled ? 'transparent' : '#eee'};
  }

  ${props => props.disabled && `
    cursor: not-allowed;
  `}

`

export const Heading = styled.div<StyledIconWrapper>`
  margin-right: 8px;
  font-size: 12;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s all;
  border-radius: 4px;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #eee;
    color: #424242;
  }

  color: #aaa;

  ${props => props.active && `
    color: ${props.theme.secondary.dark};

    &:hover {
      color: ${props.theme.secondary.dark};
    }
  `}
`

export const TableActionButton = styled.div`
  margin-right: 8px;
  padding: 4px 8px;
  cursor: pointer;
  transition: 0.2s all;
  border-radius: 4px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  background: #f5f5f5;
  border: 1px solid #ddd;

  &:hover {
    background: #eee;
    border-color: #999;
  }
`

export const Separate = styled.div`
  margin-right: 8px;
  width: 2px;
  height: 16px;
  border-radius: 2px;
  background: #ccc;
`
