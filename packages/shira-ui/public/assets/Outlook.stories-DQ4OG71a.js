import{j as e,l}from"./iframe-5Ndfg9Cb.js";import{O as p}from"./index-828e-ipe.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BOfF0s4b.js";import"./index-BgUawfai.js";import"./index-VIjOM9gh.js";/* empty css              */import"./floating-ui.react-CujXx6nl.js";import"./AddAttachmentModal-MCZvuq5T.js";import"./TextInput-BPcQvO6d.js";import"./index-v16uExsc.js";import"./iconBase-sYgM02tz.js";import"./Modal-jfz5TfTY.js";import"./Button-WWwhC_Vt.js";import"./polished.esm-D73pw9Ka.js";import"./Typography-BqYQ0w-p.js";import"./Attachment-BiRjylqd.js";import"./LanguageIcon-C0TLKsca.js";const G={title:"Apps/Outlook",component:p,parameters:{layout:"padded"},decorators:[a=>e.jsx("div",{style:{height:"800px"},children:e.jsx(a,{})})]},n={args:{senderName:{textContent:"Juan",explanationPosition:null},senderEmail:{textContent:"juan@wearehorizontal.org",explanationPosition:null},receiverEmail:"gus@wearehorizontal.org",receiverName:"Gus",subject:{textContent:"Im gonna phish you!",explanationPosition:null},content:new DOMParser().parseFromString(`
      <div id='text-editor'><img src='https://placehold.co/320x400' data-explanation=1 /><p>you have 24 hs.</p><img src='https://placehold.co/380x400' /></div>`,"text/html").getElementById("text-editor"),attachments:[{name:"ataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.txt",position:"1",fileType:"document"},{name:"at2.pdf",position:"2",fileType:"video"},{name:"at2.pdf",position:"3",fileType:"image"},{name:"at2.pdf",position:"4",fileType:"audio"},{name:"at2.pdf",position:"5",fileType:"other"}],explanationNumber:0,explanations:[]}},t={args:{senderName:{textContent:"Juan",explanationPosition:null},senderEmail:{textContent:"juan@wearehorizontal.org",explanationPosition:null},receiverEmail:"gus@wearehorizontal.org",receiverName:"Gus",subject:{textContent:"This is a long subject, a very long subject, a very very very long subject, a super very mega very super long subject.",explanationPosition:null},content:null,attachments:[{name:"at.txt",position:"1"},{name:"at2.pdf",position:"2"}],explanationNumber:0,explanations:[]}},o={args:{senderName:{textContent:"Juan",explanationPosition:null},senderEmail:{textContent:"juan@wearehorizontal.org",explanationPosition:null},receiverEmail:"gus@wearehorizontal.org",receiverName:"Gus",subject:{textContent:"",explanationPosition:null},content:null,attachments:[],explanationNumber:0,explanations:[]}},i={args:{senderName:{textContent:"Juan",explanationPosition:null},senderEmail:{textContent:"juan@wearehorizontal.org",explanationPosition:null},receiverEmail:"gus@wearehorizontal.org",receiverName:"Gus",subject:{textContent:"This is a subject",explanationPosition:null},content:null,attachments:[{name:"at.txt",position:"1",fileType:"image"},{name:"at2.pdf",position:"2",fileType:"video"},{name:"at2.pdf",position:"2",fileType:"audio"},{name:"at2.pdf",position:"2",fileType:"document"},{name:"at2.pdf",position:"2",fileType:"other"}],explanationNumber:0,explanations:[]}},u=l.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  height: 800px;
  width: 100%;
  background: rgba(0,0,0,0.5);
`,d=l.div`
  position: relative;
  z-index:1;
  background: white;
  padding: 24px;
  width: 1024px;
  height: 800px;
  box-sizing: border-box;
`,m=a=>e.jsxs(d,{children:[e.jsx(p,{...a}),a.showExplanations&&e.jsx(u,{})]}),r={render:m,args:{senderName:{textContent:"Juan",explanationPosition:null},senderEmail:{textContent:"juan@wearehorizontal.org",explanationPosition:null},receiverEmail:"gus@wearehorizontal.org",receiverName:"Gus",showExplanations:!0,explanationNumber:1,subject:{textContent:"",explanationPosition:null},content:new DOMParser().parseFromString("<div id='text-editor'><p data-explanation=1>We need to explain this</p></div>","text/html").getElementById("text-editor"),attachments:[],explanations:[{index:"1",position:"1",text:"qsdqsdqsdqsd"}]}},s={render:m,args:{senderName:{textContent:"Juan",explanationPosition:null},senderEmail:{textContent:"juan@wearehorizontal.org",explanationPosition:null},receiverEmail:"gus@wearehorizontal.org",receiverName:"Gus",subject:{textContent:"",explanationPosition:null},content:new DOMParser().parseFromString(`
      <div id='text-editor'><img src='https://placehold.co/320x400' data-explanation=1 /><p>you have 24 hs.</p><img src='https://placehold.co/380x400' /></div>`,"text/html").getElementById("text-editor"),attachments:[],showExplanations:!0,explanationNumber:1,explanations:[{index:"1",position:"1",text:"qsdqsdqsdqsd"}]}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    senderName: {
      textContent: 'Juan',
      explanationPosition: null
    },
    senderEmail: {
      textContent: 'juan@wearehorizontal.org',
      explanationPosition: null
    },
    receiverEmail: 'gus@wearehorizontal.org',
    receiverName: 'Gus',
    subject: {
      textContent: 'Im gonna phish you!',
      explanationPosition: null
    },
    content: new DOMParser().parseFromString(\`
      <div id='text-editor'><img src='https://placehold.co/320x400' data-explanation=1 /><p>you have 24 hs.</p><img src='https://placehold.co/380x400' /></div>\`, 'text/html').getElementById('text-editor'),
    attachments: [{
      name: 'ataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.txt',
      position: '1',
      fileType: 'document'
    }, {
      name: 'at2.pdf',
      position: '2',
      fileType: 'video'
    }, {
      name: 'at2.pdf',
      position: '3',
      fileType: 'image'
    }, {
      name: 'at2.pdf',
      position: '4',
      fileType: 'audio'
    }, {
      name: 'at2.pdf',
      position: '5',
      fileType: 'other'
    }],
    explanationNumber: 0,
    explanations: []
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    senderName: {
      textContent: 'Juan',
      explanationPosition: null
    },
    senderEmail: {
      textContent: 'juan@wearehorizontal.org',
      explanationPosition: null
    },
    receiverEmail: 'gus@wearehorizontal.org',
    receiverName: 'Gus',
    subject: {
      textContent: 'This is a long subject, a very long subject, a very very very long subject, a super very mega very super long subject.',
      explanationPosition: null
    },
    // content: document.createElement('div'),
    content: null,
    attachments: [{
      name: 'at.txt',
      position: '1'
    }, {
      name: 'at2.pdf',
      position: '2'
    }],
    explanationNumber: 0,
    explanations: []
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    senderName: {
      textContent: 'Juan',
      explanationPosition: null
    },
    senderEmail: {
      textContent: 'juan@wearehorizontal.org',
      explanationPosition: null
    },
    receiverEmail: 'gus@wearehorizontal.org',
    receiverName: 'Gus',
    subject: {
      textContent: '',
      explanationPosition: null
    },
    // content: document.createElement('div'),
    content: null,
    attachments: [],
    explanationNumber: 0,
    explanations: []
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    senderName: {
      textContent: 'Juan',
      explanationPosition: null
    },
    senderEmail: {
      textContent: 'juan@wearehorizontal.org',
      explanationPosition: null
    },
    receiverEmail: 'gus@wearehorizontal.org',
    receiverName: 'Gus',
    subject: {
      textContent: 'This is a subject',
      explanationPosition: null
    },
    // content: document.createElement('div'),
    content: null,
    attachments: [{
      name: 'at.txt',
      position: '1',
      fileType: 'image'
    }, {
      name: 'at2.pdf',
      position: '2',
      fileType: 'video'
    }, {
      name: 'at2.pdf',
      position: '2',
      fileType: 'audio'
    }, {
      name: 'at2.pdf',
      position: '2',
      fileType: 'document'
    }, {
      name: 'at2.pdf',
      position: '2',
      fileType: 'other'
    }],
    explanationNumber: 0,
    explanations: []
  }
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: WithExplanationsTemplate,
  args: {
    senderName: {
      textContent: 'Juan',
      explanationPosition: null
    },
    senderEmail: {
      textContent: 'juan@wearehorizontal.org',
      explanationPosition: null
    },
    receiverEmail: 'gus@wearehorizontal.org',
    receiverName: 'Gus',
    showExplanations: true,
    explanationNumber: 1,
    subject: {
      textContent: '',
      explanationPosition: null
    },
    content: new DOMParser().parseFromString(\`<div id='text-editor'><p data-explanation=1>We need to explain this</p></div>\`, 'text/html').getElementById('text-editor'),
    attachments: [],
    explanations: [{
      index: "1",
      position: "1",
      text: "qsdqsdqsdqsd"
    }]
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: WithExplanationsTemplate,
  args: {
    senderName: {
      textContent: 'Juan',
      explanationPosition: null
    },
    senderEmail: {
      textContent: 'juan@wearehorizontal.org',
      explanationPosition: null
    },
    receiverEmail: 'gus@wearehorizontal.org',
    receiverName: 'Gus',
    subject: {
      textContent: '',
      explanationPosition: null
    },
    content: new DOMParser().parseFromString(\`
      <div id='text-editor'><img src='https://placehold.co/320x400' data-explanation=1 /><p>you have 24 hs.</p><img src='https://placehold.co/380x400' /></div>\`, 'text/html').getElementById('text-editor'),
    attachments: [],
    showExplanations: true,
    explanationNumber: 1,
    explanations: [{
      index: "1",
      position: "1",
      text: "qsdqsdqsdqsd"
    }]
  }
}`,...s.parameters?.docs?.source}}};const J=["Default","LongSubject","NoSubject","AttachmentTypes","WithExplanationEditorText","WithExplanationImage"];export{i as AttachmentTypes,n as Default,t as LongSubject,o as NoSubject,r as WithExplanationEditorText,s as WithExplanationImage,J as __namedExportsOrder,G as default};
