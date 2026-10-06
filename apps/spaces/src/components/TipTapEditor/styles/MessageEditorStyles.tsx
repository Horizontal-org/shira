import { createGlobalStyle } from "@horizontal-org/shira-ui";

export const MessageEditorStyles = createGlobalStyle`

.resize-nw { cursor: nw-resize; }
.resize-ne { cursor: ne-resize; }
.resize-sw { cursor: sw-resize; }
.resize-se { cursor: se-resize; }

.ProseMirror {
  overflow-wrap: break-word;
  word-break: break-word; 
  background: white;
  border-radius: 16px;
  border: 2px solid ${props => props.theme.secondary.dark};
  padding: 0 20px;

  /* Focus state */
  &:focus:not(:disabled) {
      box-shadow: 0 0 0 2px ${props => `${props.theme.secondary.dark}33`};
      outline: none;
  }

  > * + * {
    margin-top: 0.75em;
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

  blockquote {
    padding-inline-start: 1rem;
    border-inline-start: 2px solid rgb(13,13,13, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgb(13,13,13, 0.1);
    margin: 2rem 0;
  }

  p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    /* overlays placeholder text on an empty paragraph without adding height; not real text-wrap, so flexbox can't replace it */
    float: inline-start;
    height: 0;
    pointer-events: none;
  }

  mark[data-explanation] {
    background: #F3F9CF;
    padding: 1px 2px;
    border-radius: 2px;
    position: relative;
    color: inherit;
    text-decoration: inherit;
    
    &.mark-active {
      background: #FCC934;
    }
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