import{j as o,l as s}from"./iframe-5Ndfg9Cb.js";import{T as t}from"./Tab-D7zJ_rTP.js";import"./preload-helper-PPVm8Dsz.js";const g={title:"Components/Tab",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{text:{control:"text",description:"Text content of the tab"},onClick:{description:"Function called when tab is clicked"}}},c=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,i=s.span`
  color: ${n=>n.theme.colors.dark.black};
  font-weight: 500;
`,e={args:{text:"Dashboard",onClick:()=>console.log("Dashboard clicked")}},a={args:{text:"New staff onboarding",onClick:()=>console.log("New staff onboarding clicked")}},r={render:()=>o.jsxs(c,{children:[o.jsx(t,{text:"Dashboard",onClick:()=>console.log("Dashboard clicked")}),o.jsx(i,{children:">"}),o.jsx(t,{text:"New staff onboarding",onClick:()=>console.log("New staff onboarding clicked")})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Dashboard',
    onClick: () => console.log('Dashboard clicked')
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'New staff onboarding',
    onClick: () => console.log('New staff onboarding clicked')
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Container>
      <Tab text="Dashboard" onClick={() => console.log('Dashboard clicked')} />
      <Separator>{'>'}</Separator>
      <Tab text="New staff onboarding" onClick={() => console.log('New staff onboarding clicked')} />
    </Container>
}`,...r.parameters?.docs?.source}}};const b=["Dashboard","NewStaffOnboarding","TabGroup"];export{e as Dashboard,a as NewStaffOnboarding,r as TabGroup,b as __namedExportsOrder,g as default};
