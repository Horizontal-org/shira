import{j as e,r as u,l as c}from"./iframe-5Ndfg9Cb.js";import{M as y,a as p}from"./Modal-jfz5TfTY.js";import{B as x}from"./Button-WWwhC_Vt.js";import{B as s}from"./Typography-BqYQ0w-p.js";import{T as h}from"./TextInput-BPcQvO6d.js";import{E as k}from"./LanguageIcon-C0TLKsca.js";import"./preload-helper-PPVm8Dsz.js";import"./polished.esm-D73pw9Ka.js";import"./index-v16uExsc.js";import"./iconBase-sYgM02tz.js";const O={title:"Components/Modal",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{isOpen:{control:"boolean",description:"Controls if the modal is visible"},title:{control:"text",description:"Modal title text"},type:{control:"text",description:"Type of modal [Danger, Primary]"},primaryButtonText:{control:"text",description:"Text for the primary button"},secondaryButtonText:{control:"text",description:"Text for the secondary button"},onPrimaryClick:{action:"primary clicked",description:"Handler for primary button click"},onSecondaryClick:{action:"secondary clicked",description:"Handler for secondary button click"}}},C=c.div`
  padding: 16px;
  // Ensures modal trigger button doesn't take too much space in Storybook
  width: 200px;
`,n=d=>{const[m,l]=u.useState(!1);return e.jsxs(C,{children:[e.jsx(x,{text:"Open Modal",type:"primary",onClick:()=>l(!0)}),e.jsx(p,{...d,isOpen:m,onPrimaryClick:()=>l(!1),onSecondaryClick:()=>l(!1)})]})},t={render:n,args:{isOpen:!0,title:"Are you sure you want to delete “Email quiz for activists?” ",primaryButtonText:"Delete",secondaryButtonText:"Cancel",type:y.Danger,children:e.jsx(s,{children:"Deleting this quiz is permanent and cannot be undone."}),onPrimaryClick:()=>{},onSecondaryClick:()=>{}}},f=c.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,r={render:n,args:{isOpen:!0,title:"Give a name to your new quiz",primaryButtonText:"Create new quiz",secondaryButtonText:"Cancel",children:e.jsx(f,{children:e.jsx(h,{label:"Quiz name",value:"",onChange:()=>{}})}),onPrimaryClick:()=>{},onSecondaryClick:()=>{}}},o={render:n,args:{isOpen:!0,title:"Edit link",primaryButtonText:"Save",secondaryButtonText:"Cancel",leftButtonText:"Delete",children:e.jsx(s,{children:"In the quiz, this link will appear clickable, but for safety reasons, clicking on it will not open the URL."}),onPrimaryClick:()=>{},onSecondaryClick:()=>{},onLeftClick:()=>{}}},g=c.div`
  height: 22px;
  width: 22px; 
  > svg {
    height: 22px;
    width: 22px; 
  }
`,a={render:n,args:{isOpen:!0,title:"Explanations",titleIcon:e.jsx(g,{children:e.jsx(k,{})}),primaryButtonText:"Save",secondaryButtonText:"Cancel",children:e.jsx(s,{children:"In the quiz, this link will appear clickable, but for safety reasons, clicking on it will not open the URL."}),onPrimaryClick:()=>{},onSecondaryClick:()=>{}}},i={render:n,args:{...t.args},parameters:{viewport:{defaultViewport:"mobile1"}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: InteractiveModalTemplate,
  args: {
    isOpen: true,
    title: 'Are you sure you want to delete “Email quiz for activists?” ',
    primaryButtonText: 'Delete',
    secondaryButtonText: 'Cancel',
    type: ModalType.Danger,
    children: <Body1>
        Deleting this quiz is permanent and cannot be undone.
      </Body1>,
    onPrimaryClick: () => {},
    onSecondaryClick: () => {}
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: InteractiveModalTemplate,
  args: {
    isOpen: true,
    title: 'Give a name to your new quiz',
    primaryButtonText: 'Create new quiz',
    secondaryButtonText: 'Cancel',
    children: <FormContent>
        <TextInput label="Quiz name" value="" onChange={() => {}} />
      </FormContent>,
    onPrimaryClick: () => {},
    onSecondaryClick: () => {}
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: InteractiveModalTemplate,
  args: {
    isOpen: true,
    title: 'Edit link',
    primaryButtonText: 'Save',
    secondaryButtonText: 'Cancel',
    leftButtonText: 'Delete',
    children: <Body1>
        In the quiz, this link will appear clickable, but for safety reasons, clicking on it will not open the URL.
      </Body1>,
    onPrimaryClick: () => {},
    onSecondaryClick: () => {},
    onLeftClick: () => {}
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: InteractiveModalTemplate,
  args: {
    isOpen: true,
    title: 'Explanations',
    titleIcon: <IconWrapper><ExplanationIcon /></IconWrapper>,
    primaryButtonText: 'Save',
    secondaryButtonText: 'Cancel',
    children: <Body1>
        In the quiz, this link will appear clickable, but for safety reasons, clicking on it will not open the URL.
      </Body1>,
    onPrimaryClick: () => {},
    onSecondaryClick: () => {}
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: InteractiveModalTemplate,
  args: {
    ...DeleteConfirmation.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...i.parameters?.docs?.source}}};const j=["DeleteConfirmation","FormModal","WithLeftButton","WithTitleIcon","MobileView"];export{t as DeleteConfirmation,r as FormModal,i as MobileView,o as WithLeftButton,a as WithTitleIcon,j as __namedExportsOrder,O as default};
