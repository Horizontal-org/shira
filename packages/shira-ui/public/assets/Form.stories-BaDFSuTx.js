import{j as e,l as d}from"./iframe-5Ndfg9Cb.js";import{F as u}from"./Form-B9DLbO4-.js";import{B as p}from"./Button-WWwhC_Vt.js";import{T as t}from"./TextInput-BPcQvO6d.js";import"./preload-helper-PPVm8Dsz.js";import"./Box-BAceP9LP.js";import"./Typography-BqYQ0w-p.js";import"./polished.esm-D73pw9Ka.js";import"./index-v16uExsc.js";import"./iconBase-sYgM02tz.js";const v={title:"Components/Form",component:u,parameters:{layout:"centered"},tags:["autodocs"]},g=d.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,m=d.div`
  display: flex;
  justify-content: center;
`,n=e.jsxs(e.Fragment,{children:[e.jsxs(g,{children:[e.jsx(t,{label:"Email",value:"",onChange:()=>{}}),e.jsx(t,{type:"password",label:"Password",value:"",onChange:()=>{}})]}),e.jsx(m,{children:e.jsx(p,{text:"Log in",type:"primary",onClick:()=>{}})})]}),r={args:{title:"Log in",description:"Log in to access your custom Shira space.",children:n}},o={args:{title:"Log in",children:n}},s={args:{description:"Please enter your login credentials below.",children:n}},a={args:{title:"Log in",titleSize:"large",description:"Please enter your login credentials below.",children:n}},i={args:{title:"Log in",titleSize:"large",header:"My company",description:"Please enter your login credentials below.",children:n}},c={args:{children:n}},h=e.jsxs(e.Fragment,{children:[e.jsxs(g,{children:[e.jsx(t,{label:"Name",value:"",onChange:()=>{}}),e.jsx(t,{label:"Email",value:"",onChange:()=>{}}),e.jsx(t,{label:"Message",value:"",onChange:()=>{}})]}),e.jsx(m,{children:e.jsx(p,{text:"Send Message",type:"primary",onClick:()=>{}})})]}),l={args:{title:"Contact Us",description:"Send us a message and we'll get back to you as soon as possible.",children:h}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Log in',
    description: 'Log in to access your custom Shira space.',
    children: LoginContent
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Log in',
    children: LoginContent
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    description: 'Please enter your login credentials below.',
    children: LoginContent
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Log in',
    titleSize: 'large',
    description: 'Please enter your login credentials below.',
    children: LoginContent
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Log in',
    titleSize: 'large',
    header: 'My company',
    description: 'Please enter your login credentials below.',
    children: LoginContent
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: LoginContent
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Contact Us',
    description: 'Send us a message and we\\'ll get back to you as soon as possible.',
    children: ContactContent
  }
}`,...l.parameters?.docs?.source}}};const B=["Default","WithoutDescription","WithoutTitle","BigTitle","BigTitleAndHeader","ContentOnly","ContactForm"];export{a as BigTitle,i as BigTitleAndHeader,l as ContactForm,c as ContentOnly,r as Default,o as WithoutDescription,s as WithoutTitle,B as __namedExportsOrder,v as default};
