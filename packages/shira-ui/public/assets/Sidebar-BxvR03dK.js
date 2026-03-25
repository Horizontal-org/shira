import{r as x,j as n,l as o}from"./iframe-5Ndfg9Cb.js";import{M as m,b as u}from"./LanguageIcon-C0TLKsca.js";import{a as k,F as b}from"./index-v16uExsc.js";const v=({menuItems:e,onClose:t,onCollapse:d,selectedItemLabel:c})=>{const[i,p]=x.useState(!1),h=()=>{p(!i),d(!i)};return n.jsxs(n.Fragment,{children:[n.jsx(y,{onClick:t,children:n.jsx(m,{})}),n.jsxs(f,{children:[n.jsxs(j,{$isCollapsed:i,children:[n.jsx(C,{children:n.jsx(u,{})}),n.jsxs(R,{children:[n.jsx(M,{children:e.slice(0,-1).map((r,g)=>n.jsxs(a,{onClick:r.onClick,isSelected:c===r.label,children:[n.jsx(s,{children:r.icon}),!i&&n.jsx(l,{children:r.label})]},g))}),n.jsx(S,{children:n.jsxs(a,{onClick:e[e.length-1].onClick,children:[n.jsx(s,{children:e[e.length-1].icon}),!i&&n.jsx(l,{children:e[e.length-1].label})]})})]})]}),n.jsx(w,{onClick:h,children:n.jsx($,{children:i?n.jsx(k,{color:"#333030",size:20}):n.jsx(b,{color:"#333030",size:20})})})]})]})},y=o.div`
  display: none;
  padding: 10px;
  cursor: pointer;

  @media (max-width: ${e=>e.theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
    color: ${e=>e.theme.secondary.veryDark};
  }
`,f=o.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
`,j=o.div`
  height: 100vh;
  width: ${e=>e.$isCollapsed?"80px":"228px"};
  background: ${e=>e.theme.colors.dark.black};
  transition: width 0.3s ease;
  color: ${e=>e.theme.colors.light.white};

  @media (max-width: ${e=>e.theme.breakpoints.sm}) {
    display: none;
  }

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    width: 80px;
  }
`,w=o.div`
    background-color: ${e=>e.theme.colors.green3};
    display: flex;
    align-items: center;
    cursor: pointer;
`,C=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`,$=o.button`
  background: none;
  border: none;
  color: ${e=>e.theme.colors.light.white};
  cursor: pointer;
  padding: 8px;

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    display: none;
  }
`,R=o.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px); // Subtract logo container height
`,M=o.div`
  padding: 20px 0;
  flex-grow: 1;
`,S=o.div`
  padding: 20px 0;
`,a=o.div`
  display: flex;
  align-items: center;
  padding: 12px 26px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${e=>e.theme.colors.dark.darkGrey};
  }

  ${e=>e.isSelected&&`
    background: ${e.theme.colors.green3};
    color: #12320F;

    > div {
      > svg {        
        stroke: ${e.theme.colors.dark.black};
      }
    }

    &:hover {
      background-color: ${t=>t.theme.colors.dark.darkGrey};
      color: white;
      > div {
        > svg {        
          stroke: white;
        }
      }
    }
  `}
`,s=o.div`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`,l=o.span`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${e=>e.theme.breakpoints.md}) {
    display: none;
  }
`;v.__docgenInfo={description:"",methods:[],displayName:"Sidebar",props:{menuItems:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}`,signature:{properties:[{key:"icon",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}],raw:`Array<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}>`},description:""},selectedItemLabel:{required:!1,tsType:{name:"string"},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCollapse:{required:!0,tsType:{name:"signature",type:"function",raw:"(collapsed: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"collapsed"}],return:{name:"void"}}},description:""}}};export{v as S};
