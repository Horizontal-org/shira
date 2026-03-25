import{j as t,l as i}from"./iframe-5Ndfg9Cb.js";import{W as a}from"./index-Rmvgb4za.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CdkTU3Dc.js";/* empty css              */import"./index-BOfF0s4b.js";import"./index-BgUawfai.js";import"./index-VIjOM9gh.js";const u={title:"Apps/Whatsapp",component:a,parameters:{layout:"padded"},decorators:[o=>t.jsx("div",{style:{height:"800px"},children:t.jsx(o,{})})]},n={args:{phone:{textContent:"+5491131312222",explanationPosition:null},content:new DOMParser().parseFromString("<div id='content'><div data-position=1 id=component-text-1 ><p>11111</p></div><img data-position=2 id=component-image-2 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=3 id=component-text-3 ><p>2222</p></div><img data-position=4 id=component-image-4 alt=INCIDENT1.png src=https://placehold.co/200x400 /></div>","text/html").getElementById("content"),explanationNumber:0,explanations:[]}},p=i.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  height: 800px;
  width: 100%;
  background: rgba(0,0,0,0.5);
`,s=i.div`
  position: relative;
  z-index:1;
  background: white;
  padding: 24px;
  width: 1024px;
  height: 800px;
  box-sizing: border-box;
`,d=o=>t.jsxs(s,{children:[t.jsx(a,{...o}),o.showExplanations&&t.jsx(p,{})]}),e={render:d,args:{phone:{textContent:"+5491131312222",explanationPosition:"1"},content:new DOMParser().parseFromString("<div id='content'><div data-position=1 id=component-text-1 ><p>11111</p></div><img data-position=2 id=component-image-2 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=3 id=component-text-3 ><p>2222</p></div><img data-position=4 id=component-image-4 alt=INCIDENT1.png src=https://placehold.co/200x400 /></div>","text/html").getElementById("content"),explanationNumber:1,showExplanations:!0,explanations:[{index:"1",position:"1",text:"qsdqsdqsdqsd"}]}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    phone: {
      textContent: '+5491131312222',
      explanationPosition: null
    },
    content: new DOMParser().parseFromString(\`<div id='content'><div data-position=1 id=component-text-1 ><p>11111</p></div><img data-position=2 id=component-image-2 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=3 id=component-text-3 ><p>2222</p></div><img data-position=4 id=component-image-4 alt=INCIDENT1.png src=https://placehold.co/200x400 /></div>\`, 'text/html').getElementById('content'),
    explanationNumber: 0,
    explanations: []
  }
}`,...n.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: WithExplanationsTemplate,
  args: {
    phone: {
      textContent: '+5491131312222',
      explanationPosition: '1'
    },
    content: new DOMParser().parseFromString(\`<div id='content'><div data-position=1 id=component-text-1 ><p>11111</p></div><img data-position=2 id=component-image-2 alt=INCIDENT1.png src=https://placehold.co/600x400 /><div data-position=3 id=component-text-3 ><p>2222</p></div><img data-position=4 id=component-image-4 alt=INCIDENT1.png src=https://placehold.co/200x400 /></div>\`, 'text/html').getElementById('content'),
    explanationNumber: 1,
    showExplanations: true,
    explanations: [{
      index: "1",
      position: "1",
      text: "qsdqsdqsdqsd"
    }]
  }
}`,...e.parameters?.docs?.source}}};const E=["Default","WithPhoneExplanation"];export{n as Default,e as WithPhoneExplanation,E as __namedExportsOrder,u as default};
