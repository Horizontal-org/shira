import{r as w,j as x}from"./iframe-5Ndfg9Cb.js";import{T as g}from"./TextInput-BPcQvO6d.js";import"./preload-helper-PPVm8Dsz.js";import"./index-v16uExsc.js";import"./iconBase-sYgM02tz.js";const T={title:"Components/TextInput",component:g,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{placeholder:{control:"text",description:"Placeholder text displayed when input is empty"},value:{control:"text",description:"Current value of the input"},onChange:{action:"changed",description:"Callback fired when the input value changes"},type:{control:"select",options:["text","password","email"],description:"Type of input (text, password, or email)"}}},e=h=>{const[b,v]=w.useState(h.value||"");return x.jsx(g,{...h,value:b,onChange:i=>{v(i.target.value),h.onChange?.(i)}})},a={render:e,args:{placeholder:"Enter text...",label:"Label",value:"",onChange:()=>{}}},r={render:e,args:{placeholder:"Enter text...",value:"Initial value",label:"Label",onChange:()=>{}}},o={render:e,args:{placeholder:"Enter text...",disabled:!0,label:"Label",onChange:()=>{},value:""}},s={render:e,args:{placeholder:"Enter your email address",label:"Email",value:"",onChange:()=>{}}},n={render:e,args:{placeholder:"Search...",label:"Search",value:"",onChange:()=>{}}},t={render:e,args:{placeholder:"@username",label:"Username",value:"",onChange:()=>{}}},l={render:e,args:{type:"password",placeholder:"Enter password...",label:"Password",value:"",onChange:()=>{}}},p={render:e,args:{type:"password",placeholder:"Enter password...",label:"Password",value:"mySecretPassword123",onChange:()=>{}}},d={render:e,args:{type:"password",placeholder:"Enter password...",label:"Password",value:"mySecretPassword123",disabled:!0,onChange:()=>{}}},c={render:e,args:{placeholder:"This is a very long placeholder text to demonstrate text overflow behavior",label:"Long Placeholder Example",value:"",onChange:()=>{}}},u={render:e,args:{placeholder:"Enter text...",value:"This is a very long input value to demonstrate how the component handles long content",label:"Long Value Example",onChange:()=>{}}},m={render:e,args:{placeholder:"Enter text without label...",value:"",onChange:()=>{}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    placeholder: 'Enter text...',
    label: 'Label',
    value: "",
    onChange: () => {}
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    placeholder: 'Enter text...',
    value: 'Initial value',
    label: 'Label',
    onChange: () => {}
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    placeholder: 'Enter text...',
    disabled: true,
    label: 'Label',
    onChange: () => {},
    value: ""
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    placeholder: 'Enter your email address',
    label: 'Email',
    value: "",
    onChange: () => {}
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    placeholder: 'Search...',
    label: 'Search',
    value: "",
    onChange: () => {}
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    placeholder: '@username',
    label: 'Username',
    value: "",
    onChange: () => {}
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    label: 'Password',
    value: '',
    onChange: () => {}
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    label: 'Password',
    value: 'mySecretPassword123',
    onChange: () => {}
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    label: 'Password',
    value: 'mySecretPassword123',
    disabled: true,
    onChange: () => {}
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    placeholder: 'This is a very long placeholder text to demonstrate text overflow behavior',
    label: 'Long Placeholder Example',
    value: "",
    onChange: () => {}
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    placeholder: 'Enter text...',
    value: 'This is a very long input value to demonstrate how the component handles long content',
    label: 'Long Value Example',
    onChange: () => {}
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: InputTemplate,
  args: {
    placeholder: 'Enter text without label...',
    value: "",
    onChange: () => {}
  }
}`,...m.parameters?.docs?.source}}};const P=["Default","WithValue","Disabled","EmailInput","SearchInput","UsernameInput","Password","PasswordWithValue","DisabledPassword","LongPlaceholder","LongValue","NoLabel"];export{a as Default,o as Disabled,d as DisabledPassword,s as EmailInput,c as LongPlaceholder,u as LongValue,m as NoLabel,l as Password,p as PasswordWithValue,n as SearchInput,t as UsernameInput,r as WithValue,P as __namedExportsOrder,T as default};
