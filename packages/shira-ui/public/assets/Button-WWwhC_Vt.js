import{r as f,j as n,l as s}from"./iframe-5Ndfg9Cb.js";import{c as a}from"./polished.esm-D73pw9Ka.js";const g=f.forwardRef(({text:e,onClick:r,type:t="primary",leftIcon:i,rightIcon:o,disabled:d=!1,size:u="default",color:p,className:c},m=null)=>n.jsxs(b,{onClick:r,className:c,$type:t,disabled:d,$size:u,$color:p,ref:m,children:[i&&n.jsx(y,{children:i}),n.jsx("span",{children:e}),o&&n.jsx(x,{children:o})]})),b=s.button`
  all: unset;
  -webkit-tap-highlight-color: transparent;
  border-radius: 100px;
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  ${({theme:e,$type:r,$color:t})=>r==="primary"&&`
    color: ${e.colors.light.white};
    background: ${t||e.colors.blue7};
    border: 2px solid ${t||e.colors.blue7};
    &:hover {
      background: ${t?a(.1,t):e.colors.blue8};
      border-color: ${t?a(.1,t):e.colors.blue8};
    }
    &:focus {
      background: ${t?a(.1,t):e.colors.blue8};
      border-color: ${t?a(.2,t):e.colors.blue4};
    }
  `}

  ${({theme:e,$type:r})=>r==="outline"&&`
    background: ${e.colors.light.white};
    border: 1px solid ${e.colors.dark.mediumGrey};
    color: ${e.colors.dark.black};
    margin: 1px;

    &:focus {
      border: 2px solid ${e.colors.dark.mediumGrey};
      margin: 0;
    }
  `}

  ${({disabled:e})=>e&&`
    opacity: 0.5;
    cursor: not-allowed;    
  `}

  ${({$size:e})=>e==="lg"&&`
    width: 80%;
    justify-content: center;
  `}

  ${({$size:e})=>e==="sm"&&`
    font-size: 12px;
    padding: 8px 16px;
  `}
`,l=s.div`
  display: flex;
  align-items: center;
  padding-top: 2px;
`,y=s(l)`
  margin-right: 12px;
`,x=s(l)`  
  margin-left: 12px;
`;g.__docgenInfo={description:"",methods:[],displayName:"Button",props:{id:{required:!1,tsType:{name:"string"},description:""},text:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},name:"event"}],return:{name:"void"}}},description:""},type:{required:!1,tsType:{name:"union",raw:"'primary' | 'outline'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'outline'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},leftIcon:{required:!1,tsType:{name:"ReactNode"},description:""},rightIcon:{required:!1,tsType:{name:"ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'default'",computed:!1}},color:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},ref:{required:!1,tsType:{name:"ReactMutableRefObject",raw:"React.MutableRefObject<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},description:""}}};export{g as B};
