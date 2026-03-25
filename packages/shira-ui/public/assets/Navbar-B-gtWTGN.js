import{r as p,j as n,l as i}from"./iframe-5Ndfg9Cb.js";import{B as l}from"./Button-WWwhC_Vt.js";import{b as c,M as m}from"./LanguageIcon-C0TLKsca.js";import{M as u}from"./MobileMenu-bBnI4ZGY.js";const g=({color:e,onNavigate:r,translatedTexts:t})=>{const[o,s]=p.useState(!1);return n.jsx(h,{color:e,children:n.jsxs("div",{children:[n.jsxs(x,{children:[n.jsx(c,{}),n.jsxs(y,{children:[n.jsx(a,{onClick:()=>r("/"),children:t.home}),n.jsx(a,{onClick:()=>r("/about"),children:t.about})]})]}),n.jsxs(v,{children:[n.jsx(b,{children:n.jsx(l,{type:"outline",onClick:()=>r("/login"),text:t.logIn})}),n.jsxs(f,{onClick:()=>s(!0),children:[n.jsx("span",{children:t.menu}),n.jsx(m,{})]})]}),o&&n.jsx(u,{onNavigate:d=>{r(d),s(!1)},onClose:()=>s(!1),translatedTexts:t})]})})},h=i.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  z-index: 3;

  > div {
    width: 1300px;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: ${e=>e.theme.breakpoints.lg}) {
    width: 100%;
  }
`,x=i.div`
  display: flex;
  align-items: center;
  padding: ${e=>e.theme.spacing.md};
  position: relative;
  background: ${e=>e.color?e.color:"transparent"};
`,f=i.div`
  @media (max-width: ${e=>e.theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
  }

  display: none;
  padding: ${e=>e.theme.spacing.md};
  font-weight: 600;
  color: #3f6a3a;
  cursor: pointer;

  > span {
    padding-right: 10px;
  }

  > svg {
    width: 22px;
    height: 22px;
  }
`,y=i.nav`
  padding-left: 5px;

  @media (max-width: ${e=>e.theme.breakpoints.sm}) {
    display: none;
  }
`,a=i.span`
  padding-left: 40px;
  color: #333030;
  cursor: pointer;
  font-weight: 600;
`,v=i.div`
  display: flex;
  align-items: center;
`,b=i.div`
  display: flex;
  gap: 16px;
  margin-right: 16px;

  @media (max-width: ${e=>e.theme.breakpoints.sm}) {
    display: none;
  }
`;g.__docgenInfo={description:"",methods:[],displayName:"Navbar",props:{color:{required:!1,tsType:{name:"string"},description:""},onNavigate:{required:!0,tsType:{name:"signature",type:"function",raw:"(route: string) => void",signature:{arguments:[{type:{name:"string"},name:"route"}],return:{name:"void"}}},description:""},translatedTexts:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  home: string;
  about: string;
  menu: string;
  logIn: string;
  createSpace: string;
}`,signature:{properties:[{key:"home",value:{name:"string",required:!0}},{key:"about",value:{name:"string",required:!0}},{key:"menu",value:{name:"string",required:!0}},{key:"logIn",value:{name:"string",required:!0}},{key:"createSpace",value:{name:"string",required:!0}}]}},description:""}}};export{g as N};
