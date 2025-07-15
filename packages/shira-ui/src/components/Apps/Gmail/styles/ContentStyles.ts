import styled from 'styled-components'

export const DynamicContent = styled.div`
  padding: 10px 0;
  
  mark {
    background-color: transparent;
    position: relative;
  }

  img {
    object-fit: contain;
  }

  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td, th {
      border: 2px solid #ced4da;
      box-sizing: border-box;
      min-width: 1em;
      padding: 3px 5px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }

      &.has-explanation {
        background-color: #F3F9CF !important;
        border-color: #F3F9CF !important;
        
        &.mark-active {
          background-color: #FCC934 !important;
          border-color: #FCC934 !important;
        }
      }
    }

    th {
      background-color: #f1f3f4;
      font-weight: bold;
    }

    .selectedCell:after {
      background: rgba(200, 200, 255, 0.4);
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: #adf;
      bottom: -2px;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }

    p {
      margin: 0;
    }
  }

  .tableWrapper {
    padding: 1rem 0;
    overflow-x: auto;
  }
`