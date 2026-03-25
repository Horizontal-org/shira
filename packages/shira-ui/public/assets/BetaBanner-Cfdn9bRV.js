import{r,j as e,l as t}from"./iframe-5Ndfg9Cb.js";import{c}from"./index-QZLQZRwj.js";import{b as u}from"./Typography-BqYQ0w-p.js";const h=({url:a="/support",label:i="BETA",message:n="Shira is still in development and you may experience issues.",clickHereText:o="Click here",feedbackText:d="to share your feedback and read about what’s next for Shira!"})=>{const[l,s]=r.useState(!1);return r.useEffect(()=>{const p=localStorage.getItem("shira_hide_beta_banner");s(p!=="yes")},[]),l&&e.jsxs(f,{children:[e.jsx(m,{}),e.jsxs(u,{children:[e.jsx("strong",{children:i}),": ",n," "," ",e.jsx("a",{target:a.includes("https:")?"_blank":"_self",href:a,children:o})," "," ",d]}),e.jsx(x,{onClick:()=>{s(!1),localStorage.setItem("shira_hide_beta_banner","yes")},children:e.jsx(c,{color:"#5F6368",size:24})})]})},m=t.div`
  display: block;

  @media (max-width: ${a=>a.theme.breakpoints.md}) {
    display: none;
  }
`,f=t.div`
  z-index: 2;
  width: 100%;
  height: 48px;
  min-height: 48px;
  padding: 0 8px;
  background: #DBE3A3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  > p > a {
    color: black; 
  }

   @media (max-width: ${a=>a.theme.breakpoints.md}) {
    height: 80px;
    justify-content: space-between;
  }
`,x=t.div`
  cursor: pointer;
  height: 24px;
`;h.__docgenInfo={description:"",methods:[],displayName:"BetaBanner",props:{url:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'/support'",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'BETA'",computed:!1}},message:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Shira is still in development and you may experience issues.'",computed:!1}},clickHereText:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Click here'",computed:!1}},feedbackText:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'to share your feedback and read about what’s next for Shira!'",computed:!1}}}};export{h as B};
