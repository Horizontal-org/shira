import{r as y,j as t,l as c}from"./iframe-5Ndfg9Cb.js";import{B as f}from"./Button-WWwhC_Vt.js";import{g as T}from"./Typography-BqYQ0w-p.js";function h({when:e,onClose:n,target:s,stopPropagation:o=!0}){y.useEffect(()=>{if(!e)return;const i=s??(typeof document<"u"?document:null);if(!i)return;const d=a=>{(a.key==="Escape"||a.key==="Esc")&&(o&&a.stopPropagation(),n())};return i.addEventListener("keydown",d),()=>i.removeEventListener("keydown",d)},[e,n,s,o])}function j({when:e,onEnter:n,target:s,preventDefault:o=!0,stopPropagation:i=!1,ignoreWhenTextarea:d=!0,ignoreWithModifier:a=!0}){y.useEffect(()=>{if(!e)return;const u=s??(typeof window<"u"?window:typeof document<"u"?document:null);if(!u)return;const l=r=>{if(r.isComposing||a&&(r.altKey||r.ctrlKey||r.metaKey)||r.repeat||!(r.key==="Enter"||r.code==="Enter"||r.key==="NumpadEnter"))return;const m=document&&document.activeElement;d&&m&&m.tagName==="TEXTAREA"||(o&&r.preventDefault(),i&&r.stopPropagation(),n())};return u.addEventListener("keydown",l),()=>u.removeEventListener("keydown",l)},[e,n,s,o,i,d,a])}var b=(e=>(e.Danger="danger",e.Primary="primary",e))(b||{});const g={danger:"#BF2E1F",primary:"#849D29"},k=({id:e,isOpen:n,title:s,titleIcon:o=t.jsx(t.Fragment,{}),children:i,primaryButtonText:d,primaryButtonDisabled:a,secondaryButtonText:u,onPrimaryClick:l,onSecondaryClick:r,onLeftClick:p,leftButtonText:m,className:x,type:v="primary",size:w="small",onClose:E})=>(y.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[n]),h({when:n,onClose:E??r??(()=>{})}),j({when:n,onEnter:l}),n?t.jsx(t.Fragment,{children:t.jsx(q,{id:e,children:t.jsxs(R,{className:x,size:w,children:[t.jsxs(C,{children:[o,t.jsx(T,{children:s})]}),t.jsx(N,{children:i}),t.jsxs(B,{children:[t.jsx("div",{children:p&&t.jsx(f,{text:m,type:"primary",color:g.danger,onClick:p})}),t.jsxs("div",{children:[r&&t.jsx(f,{text:u,type:"outline",onClick:r}),t.jsx(f,{text:d,type:"primary",disabled:a,onClick:l,color:g[v]})]})]})]})})}):null),q=c.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${e=>e.theme.colors.dark.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,R=c.div`
  background: ${e=>e.theme.colors.light.white};
  border-radius: 16px;

  width: ${({size:e})=>({small:"480px",medium:"735px",large:"1119px"})[e]};

  display: flex;
  flex-direction: column;

  @media (max-width: ${e=>e.theme.breakpoints.sm}) {
    width: 90%;
    min-width: unset;
    margin: 20px;
  }
`,C=c.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 24px;
  padding-bottom: 0;
`,N=c.div`
  padding: 24px;
  overflow-y: auto;
  flex-grow: 1;
`,B=c.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    gap: 12px; 
  }
`;k.__docgenInfo={description:"",methods:[],displayName:"Modal",props:{id:{required:!1,tsType:{name:"string"},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},title:{required:!0,tsType:{name:"string"},description:""},titleIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",defaultValue:{value:"<></>",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},primaryButtonText:{required:!0,tsType:{name:"string"},description:""},primaryButtonDisabled:{required:!1,tsType:{name:"boolean"},description:""},onPrimaryClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},type:{required:!1,tsType:{name:"ModalType"},description:"",defaultValue:{value:"'primary'",computed:!1}},secondaryButtonText:{required:!0,tsType:{name:"string"},description:""},onSecondaryClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onLeftClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},leftButtonText:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'small'",computed:!1}},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{b as M,k as a};
