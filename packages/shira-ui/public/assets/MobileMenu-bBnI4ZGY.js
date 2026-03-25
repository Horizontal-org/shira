import{j as e,l as n}from"./iframe-5Ndfg9Cb.js";import{c as a,H as p,d as s}from"./LanguageIcon-C0TLKsca.js";const u=({onClose:d,onNavigate:r,translatedTexts:i})=>e.jsxs(c,{children:[e.jsx(l,{children:e.jsx(g,{onClick:d,children:e.jsx(a,{})})}),e.jsxs(t,{onClick:()=>{r("/")},children:[e.jsx(o,{children:e.jsx(p,{})}),e.jsx("p",{children:i.home})]}),e.jsxs(t,{onClick:()=>{r("/about")},children:[e.jsx(o,{children:e.jsx(s,{})}),e.jsx("p",{children:i.about})]}),e.jsxs(t,{onClick:()=>{r("/login")},children:[e.jsx(o,{children:e.jsx(s,{})}),e.jsx("p",{children:i.logIn})]})]}),c=n.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index:3;
  box-sizing: border-box;

  height: 100vh;
  width: 100vw;
  background: #52752C;
  padding: 20px;
`,l=n.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`,g=n.div`
  cursor: pointer;
  background: white;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
`,t=n.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  > p {
    font-weight: 700;
    font-size: 24px;
    color: white;
  }
`,o=n.div`
  margin-right: 20px;

  > svg {
    width: 32px;
    height: 32px;
  }
`;u.__docgenInfo={description:"",methods:[],displayName:"MobileMenu",props:{onNavigate:{required:!0,tsType:{name:"signature",type:"function",raw:"(route: string) => void",signature:{arguments:[{type:{name:"string"},name:"route"}],return:{name:"void"}}},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},translatedTexts:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  home: string;
  about: string;
  logIn: string;
  createSpace: string;
}`,signature:{properties:[{key:"home",value:{name:"string",required:!0}},{key:"about",value:{name:"string",required:!0}},{key:"logIn",value:{name:"string",required:!0}},{key:"createSpace",value:{name:"string",required:!0}}]}},description:""}}};export{u as M};
