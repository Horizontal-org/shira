import{j as t,l as g}from"./iframe-5Ndfg9Cb.js";import{B as l}from"./Button-WWwhC_Vt.js";import{F as u,a as d}from"./index-v16uExsc.js";import"./preload-helper-PPVm8Dsz.js";import"./polished.esm-D73pw9Ka.js";import"./iconBase-sYgM02tz.js";const I={title:"Components/Button",component:l,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{type:{control:"select",options:["primary","outline"],description:"The visual style of the button",defaultValue:"primary"},leftIcon:{control:"boolean",description:"Icon component to render on the left"},rightIcon:{control:"boolean",description:"Icon component to render on the right"},disabled:{control:"boolean",description:"Disable button interactions"},size:{control:"select",options:["default","lg"],description:"Button size variant"},onClick:{action:"clicked"}}},e={args:{text:"Primary Button",type:"primary"}},r={args:{text:"Outline Button",type:"outline"}},o={args:{text:"Back",leftIcon:t.jsx(u,{size:16}),type:"primary"}},a={args:{text:"Next",rightIcon:t.jsx(d,{size:16}),type:"primary"}},n={args:{text:"Disabled Button",disabled:!0,type:"primary"}},s={args:{text:"This is a button with longer text",type:"primary"}},i={args:{text:"Click me",type:"primary",onClick:()=>alert("Button clicked!")}},c={args:{text:"Click me",type:"primary",onClick:()=>alert("Button clicked!"),color:"#849D29"}},y=g.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,p={args:{text:"Button",type:"primary"},render:m=>t.jsxs(y,{children:[t.jsx(l,{...m,text:"Back",type:"outline",leftIcon:t.jsx(u,{size:16})}),t.jsx(l,{...m,text:"Next",type:"primary",rightIcon:t.jsx(d,{size:16})})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Primary Button',
    type: 'primary'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Outline Button',
    type: 'outline'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Back',
    leftIcon: <FiChevronLeft size={16} />,
    type: 'primary'
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Next',
    rightIcon: <FiChevronRight size={16} />,
    type: 'primary'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Disabled Button',
    disabled: true,
    type: 'primary'
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'This is a button with longer text',
    type: 'primary'
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Click me',
    type: 'primary',
    onClick: () => alert('Button clicked!')
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Click me',
    type: 'primary',
    onClick: () => alert('Button clicked!'),
    color: '#849D29'
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Button',
    type: 'primary'
  },
  render: args => <ButtonGroup>
      <Button {...args} text="Back" type="outline" leftIcon={<FiChevronLeft size={16} />} />
      <Button {...args} text="Next" type="primary" rightIcon={<FiChevronRight size={16} />} />
    </ButtonGroup>
}`,...p.parameters?.docs?.source}}};const b=["Primary","Outline","WithLeftIcon","WithRightIcon","Disabled","LongText","WithClickHandler","differentColor","NavigationButtons"];export{n as Disabled,s as LongText,p as NavigationButtons,r as Outline,e as Primary,i as WithClickHandler,o as WithLeftIcon,a as WithRightIcon,b as __namedExportsOrder,I as default,c as differentColor};
