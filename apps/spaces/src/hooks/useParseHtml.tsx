import { TextEditor } from "../components/DynamicComponents/TextEditor"
import { Attachment } from "../components/DynamicComponents/Attachment"

const useParseHTML = (
    content: any
  ) => {
    const html = new DOMParser().parseFromString(content, 'text/html')
  
    const parseCustomElement = (customElement: string) => {
      const element = html.getElementById(customElement)
  
      return {
        textContent: element?.textContent || '',
        explanationPosition: element?.getAttribute('data-explanation') || null
      }
    }
  
    const parseContent = (): HTMLElement => html.querySelector('[id*="component-text"]')
  
    return {
      parseCustomElement,
      parseContent
    }
  }

 export const parseDynamicContent = (content) => {
    const html = new DOMParser().parseFromString(content, 'text/html')
    const dynamicContent = html.getElementById("dynamic-content")

    const childNodes = Array.from(dynamicContent.childNodes).map((node: Element) =>{
      const type = node.getAttribute('id').includes('component-text')
      ? 'text' 
      :  'attachment'
      
      return {
        position: parseInt(node.getAttribute('id').split('-')[2]),
        type,
        content: type === 'text' ? node.innerHTML: node.outerHTML,
        node: type === 'text' ? (<TextEditor />) : (<Attachment/>),
        dataPosition: +node.getAttribute('data-position')
      }
    });
    return childNodes.sort((a, b) => a.dataPosition -b.dataPosition)
    
  }
  
  export default useParseHTML