import{j as m}from"./iframe-5Ndfg9Cb.js";import{A as e,a as p}from"./Attachment-BiRjylqd.js";import"./preload-helper-PPVm8Dsz.js";import"./LanguageIcon-C0TLKsca.js";const g={title:"Components/Attachment",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{name:{control:"text",description:"Name of the attachment file"},type:{control:"select",options:[e.image,e.video,e.audio,e.document,e.other],description:"Type of the attachment"}},args:{}},a={args:{name:"document.pdf",type:e.document}},n={args:{name:"screenshot.png",type:e.image}},r={args:{name:"presentation.mp4",type:e.video}},o={args:{name:"Android music file.a...",type:e.other}},s={args:{name:"recording.mp3",type:e.audio}},c={args:{name:"very-long-filename-that-might-need-truncation-in-the-ui-component.pdf",type:e.document}},t=()=>m.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"},children:m.jsx(p,{name:"interactive-example.pdf",type:e.document})});t.parameters={docs:{description:{story:"This example demonstrates interactive menu functionality with the delete option."}}};t.__docgenInfo={description:"",methods:[],displayName:"InteractiveMenu"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'document.pdf',
    type: AttachmentType.document
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'screenshot.png',
    type: AttachmentType.image
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'presentation.mp4',
    type: AttachmentType.video
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'Android music file.a...',
    type: AttachmentType.other
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'recording.mp3',
    type: AttachmentType.audio
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'very-long-filename-that-might-need-truncation-in-the-ui-component.pdf',
    type: AttachmentType.document
  }
}`,...c.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  }}>
      <Attachment name="interactive-example.pdf" type={AttachmentType.document} />
    </div>;
}`,...t.parameters?.docs?.source}}};const h=["Default","ImageAttachment","VideoAttachment","OtherAttachment","AudioAttachment","LongFilename","InteractiveMenu"];export{s as AudioAttachment,a as Default,n as ImageAttachment,t as InteractiveMenu,c as LongFilename,o as OtherAttachment,r as VideoAttachment,h as __namedExportsOrder,g as default};
