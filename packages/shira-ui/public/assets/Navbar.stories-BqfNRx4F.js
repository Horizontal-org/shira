import{N as r}from"./Navbar-B-gtWTGN.js";import"./iframe-5Ndfg9Cb.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-WWwhC_Vt.js";import"./polished.esm-D73pw9Ka.js";import"./LanguageIcon-C0TLKsca.js";import"./MobileMenu-bBnI4ZGY.js";const p={title:"Components/Navbar",component:r,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{color:{control:"color",description:"Background color of the navbar"},onNavigate:{description:"Callback function when navigation links are clicked"},translatedTexts:{description:"Object containing translated text for the navbar items"}}},e={args:{onNavigate:t=>console.log("Navigate to:",t),translatedTexts:{home:"Home",about:"About",menu:"Menu",logIn:"Log in",createSpace:"Create space"}}},a={args:{...e.args,color:"#DBE3A3"}},o={args:{...e.args,translatedTexts:{home:"Home",about:"About",menu:"Menu",logIn:"Log in",createSpace:"Create space"}},parameters:{viewport:{defaultViewport:"mobile1"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    onNavigate: (route: string) => console.log("Navigate to:", route),
    translatedTexts: {
      home: "Home",
      about: "About",
      menu: "Menu",
      logIn: "Log in",
      createSpace: "Create space"
    }
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    color: "#DBE3A3"
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    translatedTexts: {
      home: "Home",
      about: "About",
      menu: "Menu",
      logIn: "Log in",
      createSpace: "Create space"
    }
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
}`,...o.parameters?.docs?.source}}};const g=["Default","CustomBackground","MobileView"];export{a as CustomBackground,e as Default,o as MobileView,g as __namedExportsOrder,p as default};
