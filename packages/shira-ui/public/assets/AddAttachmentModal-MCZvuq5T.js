import{r as a,j as n,l as r}from"./iframe-5Ndfg9Cb.js";import{T as x}from"./TextInput-BPcQvO6d.js";import{r as b}from"./index-BgUawfai.js";import{k as T,l as w}from"./index-v16uExsc.js";import{a as q,M as C}from"./Modal-jfz5TfTY.js";import{A as p}from"./Attachment-BiRjylqd.js";const v=({label:t,options:l,onChange:f,value:u})=>{const[i,s]=a.useState(!1),[d,g]=a.useState({top:0,left:0,width:0}),o=a.useRef(null),c=a.useRef(null),y=()=>l.find(e=>e.value===u)||l[0];a.useEffect(()=>{if(!document.getElementById("select-portal-container")){const e=document.createElement("div");e.id="select-portal-container",document.body.appendChild(e)}return()=>{const e=document.getElementById("select-portal-container");e&&e.childNodes.length===0&&document.body.removeChild(e)}},[]),a.useEffect(()=>{if(i&&o.current){const e=o.current.getBoundingClientRect();g({top:e.bottom+window.scrollY,left:e.left+window.scrollX,width:e.width})}},[i]),a.useEffect(()=>{const e=m=>{o.current&&!o.current.contains(m.target)&&c.current&&!c.current.contains(m.target)&&s(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[]);const h=e=>{f(e.value),s(!1)};return n.jsxs(j,{ref:o,children:[n.jsx(S,{children:t&&n.jsx(k,{children:t})}),n.jsxs(A,{onClick:()=>s(!i),children:[n.jsx(E,{id:"selected-option",children:y()?.label||"Select an option"}),n.jsx(F,{children:i?n.jsx(T,{color:"#5F6368"}):n.jsx(w,{color:"#5F6368"})})]}),i&&b.createPortal(n.jsx(O,{ref:c,style:{top:`${d.top}px`,left:`${d.left}px`,width:`${d.width}px`},children:l.map(e=>n.jsx(L,{onClick:()=>h(e),isSelected:e.value===u,children:e.label},e.value.toString()))}),document.getElementById("select-portal-container")||document.body)]})},j=r.div`
  position: relative;
  width: 100%;
  margin: 16px 0;
`,S=r.div`
  margin-bottom: 4px;
`,k=r.label`
  font-size: 16px;
  color: #424242;
`,A=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 16px;
  border: 2px solid ${t=>t.theme.colors.green3};
  background: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #F0F5E0;
  }
`,E=r.div`
  font-size: 18px;
  color: ${t=>t.theme.colors.dark.darkGrey};
  font-weight: 300;
`,F=r.div`
  display: flex;
  align-items: center;
`,O=r.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  border: 2px solid ${t=>t.theme.colors.green3};
  color: ${t=>t.theme.colors.dark.darkGrey};
  border-radius: 8px;
  background: white;
  z-index: 99999999;
  max-height: 250px;
  overflow-y: auto;
  font-weight: 300;
`,L=r.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
  background: ${t=>t.isSelected?"#F0F5E0":"white"};
  
  &:hover {
    background: #F0F5E0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;v.__docgenInfo={description:"",methods:[],displayName:"SelectComponent",props:{label:{required:!0,tsType:{name:"string"},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: any) => void",signature:{arguments:[{type:{name:"any"},name:"value"}],return:{name:"void"}}},description:""},value:{required:!1,tsType:{name:"string"},description:""}}};const R=({fileName:t,handleFileName:l,fileType:f,handleFileType:u,isOpen:i,onClose:s,onSave:d,titleLabel:g,saveLabel:o,cancelLabel:c,fileNameLabel:y,fileTypeLabel:h})=>{const e=[{value:p.image,label:"Image"},{value:p.video,label:"Video"},{value:p.audio,label:"Audio"},{value:p.document,label:"Document"},{value:p.other,label:"Other"}];return n.jsx(q,{id:"add-attachment-modal",isOpen:i,title:g,primaryButtonText:o,secondaryButtonText:c,onPrimaryClick:()=>{d(),s()},onSecondaryClick:s,type:C.Primary,children:n.jsxs("div",{children:[n.jsx(x,{id:"file-name-input",label:y,value:t,onChange:m=>l(m.target.value)}),n.jsx(v,{label:h,options:e,onChange:u,value:f})]})})};R.__docgenInfo={description:"",methods:[],displayName:"AddAttachmentModal",props:{fileName:{required:!0,tsType:{name:"string"},description:""},handleFileName:{required:!0,tsType:{name:"signature",type:"function",raw:"(fileName: string) => void",signature:{arguments:[{type:{name:"string"},name:"fileName"}],return:{name:"void"}}},description:""},fileType:{required:!0,tsType:{name:"AttachmentType"},description:""},handleFileType:{required:!0,tsType:{name:"signature",type:"function",raw:"(fileType: AttachmentType) => void",signature:{arguments:[{type:{name:"AttachmentType"},name:"fileType"}],return:{name:"void"}}},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSave:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},titleLabel:{required:!1,tsType:{name:"string"},description:""},saveLabel:{required:!1,tsType:{name:"string"},description:""},cancelLabel:{required:!1,tsType:{name:"string"},description:""},fileNameLabel:{required:!1,tsType:{name:"string"},description:""},fileTypeLabel:{required:!1,tsType:{name:"string"},description:""},fileTypePlaceholder:{required:!1,tsType:{name:"string"},description:""},typeLabels:{required:!1,tsType:{name:"Partial",elements:[{name:"Record",elements:[{name:"AttachmentType"},{name:"string"}],raw:"Record<AttachmentType, string>"}],raw:"Partial<Record<AttachmentType, string>>"},description:""}}};export{R as A};
