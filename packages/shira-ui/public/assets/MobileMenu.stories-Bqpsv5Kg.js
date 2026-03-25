import{j as n}from"./iframe-5Ndfg9Cb.js";import{M as r}from"./MobileMenu-bBnI4ZGY.js";import"./preload-helper-PPVm8Dsz.js";import"./LanguageIcon-C0TLKsca.js";const g={title:"Components/MobileMenu",component:r,parameters:{layout:"fullscreen",viewport:{defaultViewport:"mobile1"}},tags:["autodocs"],argTypes:{onNavigate:{description:"Callback function when menu items are clicked",action:"navigated"},onClose:{description:"Callback function when close button is clicked",action:"closed"},translatedTexts:{description:"Object containing translated text for menu items",control:"object"}},decorators:[t=>n.jsx("div",{style:{height:"100vh"},children:n.jsx(t,{})})]},e={args:{translatedTexts:{home:"Home",about:"About",logIn:"Log In",createSpace:"Create Space"},onNavigate:t=>console.log("Navigate to:",t),onClose:()=>console.log("Menu closed")}},o={args:{...e.args,translatedTexts:{home:"Inicio",about:"Acerca",logIn:"Iniciar Sesión",createSpace:"Crear Espacio"}}},a={args:{...e.args,translatedTexts:{home:"Home Page With Very Long Text That Might Wrap",about:"About Us And Our Very Long Company Name Section",logIn:"Log In To Your Account",createSpace:"Create A New Collaborative Space"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    translatedTexts: {
      home: 'Home',
      about: 'About',
      logIn: 'Log In',
      createSpace: 'Create Space'
    },
    onNavigate: (route: string) => console.log('Navigate to:', route),
    onClose: () => console.log('Menu closed')
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    translatedTexts: {
      home: 'Inicio',
      about: 'Acerca',
      logIn: 'Iniciar Sesión',
      createSpace: 'Crear Espacio'
    }
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    translatedTexts: {
      home: 'Home Page With Very Long Text That Might Wrap',
      about: 'About Us And Our Very Long Company Name Section',
      logIn: 'Log In To Your Account',
      createSpace: 'Create A New Collaborative Space'
    }
  }
}`,...a.parameters?.docs?.source}}};const p=["Default","SpanishTranslation","LongText"];export{e as Default,a as LongText,o as SpanishTranslation,p as __namedExportsOrder,g as default};
