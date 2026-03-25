import{r as b,j as c}from"./iframe-5Ndfg9Cb.js";import{T as g}from"./Toggle-LmBBwW_J.js";import"./preload-helper-PPVm8Dsz.js";import"./Typography-BqYQ0w-p.js";const T={title:"Components/Toggle",component:g,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{isEnabled:{control:"boolean",description:"Current state of the toggle"},onToggle:{description:"Callback function triggered when toggle is clicked"},rightLabel:{control:"text",description:"Optional label text displayed next to toggle"},disabled:{control:"boolean",description:"Disable toggle interactions"}}},a={args:{isEnabled:!1,rightLabel:"Toggle me",onToggle:()=>{}}},s={args:{isEnabled:!1,leftLabel:"Unpublished",rightLabel:"Published",onToggle:()=>{}},render:function(i){const[e,d]=b.useState(!1);return c.jsx(g,{...i,isEnabled:e,onToggle:()=>d(!e)})}},n={args:{isEnabled:!1,leftLabel:"Unpublished",rightLabel:"Published",onToggle:()=>{},size:"big"},render:function(i){const[e,d]=b.useState(!1);return c.jsx(g,{...i,isEnabled:e,onToggle:()=>d(!e)})}},r={args:{isEnabled:!0,rightLabel:"Enabled state",onToggle:()=>{}}},t={args:{isEnabled:!1,onToggle:()=>{}}},o={args:{isEnabled:!1,rightLabel:"Disabled toggle",disabled:!0,onToggle:()=>{}}},l={args:{isEnabled:!0,rightLabel:"Disabled and enabled",disabled:!0,onToggle:()=>{}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isEnabled: false,
    rightLabel: 'Toggle me',
    onToggle: () => {}
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isEnabled: false,
    leftLabel: 'Unpublished',
    rightLabel: 'Published',
    onToggle: () => {}
  },
  render: function Render(args) {
    const [isEnabled, setIsEnabled] = useState(false);
    return <Toggle {...args} isEnabled={isEnabled} onToggle={() => setIsEnabled(!isEnabled)} />;
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    isEnabled: false,
    leftLabel: 'Unpublished',
    rightLabel: 'Published',
    onToggle: () => {},
    size: 'big'
  },
  render: function Render(args) {
    const [isEnabled, setIsEnabled] = useState(false);
    return <Toggle {...args} isEnabled={isEnabled} onToggle={() => setIsEnabled(!isEnabled)} />;
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isEnabled: true,
    rightLabel: 'Enabled state',
    onToggle: () => {}
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isEnabled: false,
    onToggle: () => {}
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isEnabled: false,
    rightLabel: 'Disabled toggle',
    disabled: true,
    onToggle: () => {}
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    isEnabled: true,
    rightLabel: 'Disabled and enabled',
    disabled: true,
    onToggle: () => {}
  }
}`,...l.parameters?.docs?.source}}};const h=["Default","Interactive","InteractiveBig","Enabled","WithoutLabel","Disabled","DisabledAndEnabled"];export{a as Default,o as Disabled,l as DisabledAndEnabled,r as Enabled,s as Interactive,n as InteractiveBig,t as WithoutLabel,h as __namedExportsOrder,T as default};
