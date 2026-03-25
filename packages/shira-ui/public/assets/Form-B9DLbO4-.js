import{j as r,l as s}from"./iframe-5Ndfg9Cb.js";import{B as m}from"./Box-BAceP9LP.js";import{f as c,B as o,S as p,H as u}from"./Typography-BqYQ0w-p.js";const f=({title:e,titleSize:a="medium",description:i,children:t,className:l,onSubmit:d,header:n})=>r.jsx(m,{className:l,children:r.jsxs(x,{onSubmit:d,children:[e&&r.jsxs(g,{children:[n&&r.jsx(y,{children:r.jsx(c,{children:n})}),a==="small"&&r.jsx(o,{children:e}),a==="medium"&&r.jsx(p,{children:e}),a==="large"&&r.jsx(u,{children:e})]}),i&&r.jsx(h,{children:i}),t]})}),x=s.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`,g=s.section`
  color: ${e=>e.theme.colors.dark.black};
`,h=s(o)`
  color: ${e=>e.theme.colors.dark.black};
`,y=s.div`
  color: ${e=>e.theme.colors.green7};
  padding-bottom: 8px;
`;f.__docgenInfo={description:"",methods:[],displayName:"Form",props:{title:{required:!1,tsType:{name:"string"},description:""},titleSize:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}},header:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},onSubmit:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: FormEvent) => void",signature:{arguments:[{type:{name:"FormEvent"},name:"e"}],return:{name:"void"}}},description:""}}};export{f as F};
