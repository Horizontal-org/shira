import{j as e}from"./iframe-5Ndfg9Cb.js";import{S as t}from"./Sidebar-BxvR03dK.js";import{d as c,e as i,f as p}from"./index-v16uExsc.js";import{I as m}from"./index-DJqNt9_X.js";import"./preload-helper-PPVm8Dsz.js";import"./LanguageIcon-C0TLKsca.js";import"./iconBase-sYgM02tz.js";const I={title:"Components/Sidebar",component:t,parameters:{layout:"fullscreen"},tags:["autodocs"],decorators:[r=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{})})]},a=[{icon:e.jsx(c,{size:24,color:"white"}),label:"Dashboard",onClick:()=>console.log("Dashboard clicked")},{icon:e.jsx(m,{size:24,color:"white"}),label:"Learners",onClick:()=>console.log("Learners clicked")},{icon:e.jsx(i,{size:24,color:"white"}),label:"Support",onClick:()=>console.log("Support clicked")},{icon:e.jsx(p,{size:24,color:"white"}),label:"Log out",onClick:()=>console.log("Log out clicked")}],o={args:{menuItems:a,onClose:()=>console.log("Sidebar closed"),onCollapse:()=>console.log("collapsing")}},s={args:{menuItems:a,onClose:()=>console.log("Sidebar closed"),onCollapse:()=>console.log("collapsing"),selectedItemLabel:"Support"}},l={parameters:{viewport:{defaultViewport:"mobile1"}},args:{menuItems:a,onClose:()=>console.log("Sidebar closed"),onCollapse:()=>console.log("collapsing")}},n={parameters:{viewport:{defaultViewport:"tablet"}},args:{menuItems:a,onClose:()=>console.log("Sidebar closed"),onCollapse:()=>console.log("collapsing")}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    menuItems: defaultMenuItems,
    onClose: () => console.log('Sidebar closed'),
    onCollapse: () => console.log('collapsing')
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    menuItems: defaultMenuItems,
    onClose: () => console.log('Sidebar closed'),
    onCollapse: () => console.log('collapsing'),
    selectedItemLabel: 'Support'
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  args: {
    menuItems: defaultMenuItems,
    onClose: () => console.log('Sidebar closed'),
    onCollapse: () => console.log('collapsing')
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  args: {
    menuItems: defaultMenuItems,
    onClose: () => console.log('Sidebar closed'),
    onCollapse: () => console.log('collapsing')
  }
}`,...n.parameters?.docs?.source}}};const w=["Default","Selected","Mobile","Tablet"];export{o as Default,l as Mobile,s as Selected,n as Tablet,w as __namedExportsOrder,I as default};
