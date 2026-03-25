import{j as i,l as t}from"./iframe-5Ndfg9Cb.js";import{e as u}from"./Typography-BqYQ0w-p.js";const c=({isEnabled:e,onToggle:n,rightLabel:r,leftLabel:o,className:d,disabled:l=!1,size:s="medium"})=>i.jsxs(x,{className:d,children:[o&&i.jsx(a,{children:o}),i.jsx(g,{role:"switch","aria-checked":e,$size:s,$isEnabled:e,onClick:p=>{p.stopPropagation(),n()},disabled:l,type:"button",children:i.jsx(m,{$isEnabled:e,$size:s})}),r&&i.jsx(a,{children:r})]}),x=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,a=t(u)`
  color: ${e=>e.theme.colors.dark.black};
`,g=t.button`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${e=>e.$isEnabled?e.theme.secondary.dark:e.theme.colors.dark.mediumGrey};
  border-radius: 12px;
  padding: 2px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${e=>e.$size==="big"&&`
    width: 70px;
    height: 32px;
    border-radius: 18px;
  `}
`,m=t.span`
  position: absolute;
  left: ${e=>e.$isEnabled?"28px":"2px"};
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: left 0.2s;
  top: 2px;
  

  ${e=>e.$size==="big"&&`
    top: 4px;
    width: 24px;
    height: 24px;
    left: ${e.$isEnabled?"42px":"4px"};
    box-shadow: 0px -0.97px 2.92px 0.97px #00000026;
    box-shadow: 0px -0.97px 1.95px 0px #0000004D;

  `}
`;c.__docgenInfo={description:"",methods:[],displayName:"Toggle",props:{isEnabled:{required:!0,tsType:{name:"boolean"},description:""},onToggle:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},rightLabel:{required:!1,tsType:{name:"string"},description:""},leftLabel:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'medium' | 'big'",elements:[{name:"literal",value:"'medium'"},{name:"literal",value:"'big'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}}}};export{c as T};
