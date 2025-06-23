import { createGlobalStyle } from "@shira/ui";

export const EditorStyles = createGlobalStyle`
.ProseMirror {
  background: white;
  border-radius: 16px;
  border: 2px solid ${props => props.theme.secondary.dark};
  padding: 8px 20px;
  min-height: 150px;

  /* Focus state */
  &:focus:not(:disabled) {
      box-shadow: 0 0 0 2px ${props => `${props.theme.secondary.dark}33`};
      outline: none;
  }

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 300px;
    max-height: 200px;
    width: auto;
    height: auto;
    cursor: pointer;
    transition: all 0.2s ease;
    object-fit: contain;
    border-radius: 4px;
    
    &.has-explanation {
      border: 2px solid #F3F9CF !important;
    }
    
    &.mark-active {
      border: 2px solid #FCC934 !important;
    }
    
    &:hover {
      opacity: 0.9;
      transform: scale(1.02);
    }
  }

  .image-container {
    margin: 0.5rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgb(13,13,13, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgb(13,13,13, 0.1);
    margin: 2rem 0;
  }

  p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  mark[data-explanation] {
    background: #F3F9CF;
    padding: 1px 2px;
    border-radius: 2px;
    position: relative;
    
    &.mark-active {
      background: #FCC934;
    }
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

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }


  .ProseMirror-gapcursor {
    display: block;
    pointer-events: none;
    position: relative;
  }

  .ProseMirror-gapcursor:after {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid black;
    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
  }
}

.is-active {
  background: black;
  color: #fff;
}

button {
  font-size: inherit;
  font-family: inherit;
  color: #000;
  margin: 0.1rem;
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.1rem 0.4rem;
  background: white;
  accent-color: black;
}

@keyframes ProseMirror-cursor-blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
`