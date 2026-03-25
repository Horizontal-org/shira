import{j as r,r as s}from"./iframe-5Ndfg9Cb.js";import{A as p}from"./AddAttachmentModal-MCZvuq5T.js";import{A as e}from"./Attachment-BiRjylqd.js";import"./preload-helper-PPVm8Dsz.js";import"./TextInput-BPcQvO6d.js";import"./index-v16uExsc.js";import"./iconBase-sYgM02tz.js";import"./index-BgUawfai.js";import"./index-VIjOM9gh.js";import"./Modal-jfz5TfTY.js";import"./Button-WWwhC_Vt.js";import"./polished.esm-D73pw9Ka.js";import"./Typography-BqYQ0w-p.js";import"./LanguageIcon-C0TLKsca.js";const j={title:"Components/AddAttachmentModal",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{fileName:{control:"text",description:"The name of the file"},handleFileName:{action:"fileName changed",description:"Handler for when the file name changes"},fileType:{control:"select",options:["Image","Video","Audio","Document","Other"],description:"The type of the file"},handleFileType:{action:"fileType changed",description:"Handler for when the file type changes"},isOpen:{control:"boolean",description:"Whether the attachment modal is open"},onClose:{action:"modal closed",description:"Handler for when the modal is closed"},onSave:{action:"attachment saved",description:"Handler for when the attachment is saved"}}},n={args:{fileName:"Document.pdf",handleFileName:()=>{},fileType:e.document,handleFileType:()=>{},isOpen:!0,onClose:()=>{},onSave:()=>{}}},f=()=>{const[c,i]=s.useState(!1),[l,d]=s.useState("My Attachment"),[m,h]=s.useState(e.document);return r.jsxs("div",{children:[r.jsx("button",{onClick:()=>i(!0),style:{marginBottom:"20px"},children:"Open Attachment Modal"}),r.jsx(p,{fileName:l,handleFileName:d,fileType:m,handleFileType:h,isOpen:c,onClose:()=>i(!1),onSave:()=>console.log("Saved:",{fileName:l,fileType:m})})]})},t={args:{fileName:"My Attachment",handleFileName:()=>{},fileType:e.document,handleFileType:()=>{},isOpen:!0,onClose:()=>{},onSave:()=>{}},render:()=>r.jsx(f,{})},a={args:{fileName:"",handleFileName:()=>{},fileType:e.document,handleFileType:()=>{},isOpen:!0,onClose:()=>{},onSave:()=>{}}},o={args:{fileName:"Example",handleFileName:()=>{},fileType:e.image,handleFileType:()=>{},isOpen:!0,onClose:()=>{},onSave:()=>{}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    fileName: 'Document.pdf',
    handleFileName: () => {},
    fileType: AttachmentType.document,
    handleFileType: () => {},
    isOpen: true,
    onClose: () => {},
    onSave: () => {}
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    fileName: 'My Attachment',
    handleFileName: () => {},
    fileType: AttachmentType.document,
    handleFileType: () => {},
    isOpen: true,
    onClose: () => {},
    onSave: () => {}
  },
  render: () => <InteractiveAttachment />
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    fileName: '',
    handleFileName: () => {},
    fileType: AttachmentType.document,
    handleFileType: () => {},
    isOpen: true,
    onClose: () => {},
    onSave: () => {}
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    fileName: 'Example',
    handleFileName: () => {},
    fileType: AttachmentType.image,
    handleFileType: () => {},
    isOpen: true,
    onClose: () => {},
    onSave: () => {}
  }
}`,...o.parameters?.docs?.source}}};const I=["Default","Interactive","EmptyFileName","DifferentFileTypes"];export{n as Default,o as DifferentFileTypes,a as EmptyFileName,t as Interactive,I as __namedExportsOrder,j as default};
