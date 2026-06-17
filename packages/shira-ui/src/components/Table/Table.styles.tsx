import styled from 'styled-components'
import { Body3 } from '../Typography'

export type TableSize = 'full' | 'compact';

export const Wrapper = styled.div`
  width: 100%;
`

export const TableHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 16px;
  background: ${(props) => props.theme.colors.light.paleGreen};
  border-radius: 20px 20px 0 0;
`

export const TableFooter = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 6px;
  background: white;
  border-radius: 0 0 20px 20px;
  border-left: 1px solid ${(props) => props.theme.colors.light.paleGreen};
  border-right: 1px solid ${(props) => props.theme.colors.light.paleGreen};
  border-bottom: 1px solid ${(props) => props.theme.colors.light.paleGreen};
`

export const StyledTable = styled.table`
  background: ${(props) => props.theme.colors.light.paleGrey};
  width: 100%;
  table-layout: fixed;
  font-size: 14px;
  border: none;
  border-spacing: 0;
  border-left: 1px solid ${(props) => props.theme.colors.light.paleGreen};
  border-right: 1px solid ${(props) => props.theme.colors.light.paleGreen};
`

export const THead = styled.thead`
  & th {
    background: ${(props) => props.theme.colors.light.paleGreen};
  }
`

export const Th = styled.th<{ $size: TableSize }>`
  text-align: left;
  padding: 0 16px 14px 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.black};
  vertical-align: middle;
  border: none;
  box-sizing: border-box;
  width: inherit;
  font-size: ${(props) => (props.$size === 'compact' ? '14px' : '16px')};
`

export const Td = styled.td`
  background: ${(props) => props.theme.colors.light.white};
  padding: 9px 16px;
  vertical-align: middle;
  box-sizing: border-box;
  width: inherit;
  font-size: inherit;
`

export const Tr = styled.tr<{ $selected?: boolean; $selectable?: boolean; $dragging?: boolean; $hoverable?: boolean }>`
  cursor: ${({ $selectable }) => ($selectable ? 'pointer' : 'default')};
  position: relative;

  & td {
    background-color: ${(props) =>
    props.$selected ? props.theme.colors.green1 : props.theme.colors.light.white};
    border-bottom: 1px solid ${(props) => props.theme.colors.light.paleGrey};
  }

  ${(props) =>
    props.$hoverable && `
      &:hover td {
        background-color: ${props.$selected ? props.theme.colors.green1 : props.theme.colors.light.paleGrey};
      }
    `}

  &:last-child td {
    border-bottom: none;
  }

  ${(props) =>
    props.$dragging && `
      position: relative;
      z-index: 2;

      & td {
        background-color: ${props.theme.colors.light.white};
      }
    `}

  ${(props) =>
    props.$selectable && `
      &:focus-visible,
      &:focus-within {
        outline: 2px solid ${props.theme.colors.green3};
        outline-offset: -2px;
        z-index: 1;
        position: relative;
      }

      &:focus {
        outline: none;
      }

      &:hover [data-row-checkbox],
      &:focus-within [data-row-checkbox],
      &:focus-visible [data-row-checkbox] {
        visibility: visible;
      }
    `}
`

export const CenteredBody = styled(Body3)`
  text-align: center;
  font-weight: 400;
`

export const CenteredCellContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 16px 0;
`
