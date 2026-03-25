import{j as t,d,l as o,r as l}from"./iframe-5Ndfg9Cb.js";import{k as O,l as S}from"./index-v16uExsc.js";import{B as v}from"./Button-WWwhC_Vt.js";const g=({option:e,index:s,submit:n})=>{const r=e.value===e.value;return t.jsxs(T,{role:"option","aria-selected":r,onClick:n,tabIndex:0,onKeyDown:i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),n())},children:[s>0&&t.jsx(C,{}),t.jsxs($,{"data-placeholder":r?"false":"true",children:[e.leftIcon&&t.jsx(q,{children:e.leftIcon}),e.label]})]})},T=o.div`
  width: 100%;
  padding: 12px 16px;
  cursor: pointer;
  line-height: 1;
  background: transparent;

  &:not(:last-child) {
    border-bottom: 1px solid ${d.colors.dark.lightGrey};
  }

  &:hover { background: ${d.colors.light.paleGrey}; }

  &:focus-visible {
    outline: 2px solid ${d.colors.dark.lightGrey};
    outline-offset: -2px;
  }
`,$=o.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 6px;
`,q=o.span`
  display: inline-flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  flex: 0 0 22px;
`,C=o.span`
  color: ${e=>e.theme.colors.dark.black};
  font-weight: 400;
  font-size: 16px;
`;g.__docgenInfo={description:"",methods:[],displayName:"Option",props:{option:{required:!0,tsType:{name:"OptionInterface"},description:""},index:{required:!0,tsType:{name:"number"},description:""},submit:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const E=(e,s)=>{l.useEffect(()=>{const n=r=>{const i=e?.current;!i||i.contains(r?.target||null)||s(r)};return document.addEventListener("mousedown",n),document.addEventListener("touchstart",n),()=>{document.removeEventListener("mousedown",n),document.removeEventListener("touchstart",n)}},[e,s])},w=({cancel:e,options:s,submit:n})=>{const[r,i]=l.useState(null);return t.jsxs(L,{children:[t.jsxs("div",{children:[t.jsx(z,{children:"Select language"}),t.jsx(R,{children:s.map((c,f)=>t.jsx(D,{option:c,isSelected:r&&c.value===r.value,index:f,submit:()=>{n(c)}}))})]}),t.jsxs(N,{children:[t.jsx(v,{onClick:()=>{i(null),e()},text:"Cancel",type:"outline"}),t.jsx(v,{onClick:()=>{n(r),i(null)},text:"OK"})]})]})},L=o.div`
  display: none;

  @media (max-width: ${e=>e.theme.breakpoints.xs}) {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;

    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }
`,R=o.div`
  text-align: left;
`,z=o.div`
  font-weight: 700;
  font-size: 24px;
  padding: 16px 0;
  border-bottom: 1px solid #ACADAE;
  text-align: center;
  color: ${e=>e.theme.primary.dark};
`,D=o(g)`

  ${e=>e.isSelected&&`
    background: #eee;
  `}
`,N=o.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0;
  text-align: center;


  > button {
    padding: 16px 0;
    width: 156px;
    display: flex;
    justify-content: center;
  }
`;w.__docgenInfo={description:"",methods:[],displayName:"MobileOptions",props:{cancel:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"OptionInterface"}],raw:"OptionInterface[]"},description:""},submit:{required:!0,tsType:{name:"signature",type:"function",raw:"(OptionInterface) => void",signature:{arguments:[{name:"OptionInterface"}],return:{name:"void"}}},description:""}}};function _({onToggle:e,onClose:s,openKeys:n=["Enter"," "],closeKeys:r=["Escape"]}){return l.useCallback(i=>{if(n.includes(i.key)){i.preventDefault(),e();return}s&&r.includes(i.key)&&(i.preventDefault(),s())},[e,s,n,r])}const A=({options:e,value:s,onChange:n,initialPlaceholder:r,placeholderLeftIcon:i,fixedLeftIcon:c})=>{const f=l.useRef(null),[m,h]=l.useState(!1),y=l.useId(),b=l.useCallback(()=>h(a=>!a),[]),p=l.useCallback(()=>h(!1),[]),u=l.useMemo(()=>e.find(a=>a.value===s),[e,s]);E(f,()=>{m&&p()});const k=_({onToggle:b,onClose:p}),x=!!u,j=c??(x?u?.leftIcon:i);return t.jsxs(B,{ref:f,children:[t.jsxs(G,{role:"combobox","aria-expanded":m,"aria-label":x?`Language: ${u.label}`:"Select language","aria-controls":y,"aria-haspopup":"listbox",tabIndex:0,onClick:b,onKeyDown:k,children:[t.jsxs("div",{children:[t.jsx(F,{children:j}),t.jsx(K,{"aria-label":x?u.label:r??"","data-placeholder":x?"false":"true",children:x?u.label:r})]}),m?t.jsx(O,{size:16}):t.jsx(S,{size:16})]}),m&&t.jsxs(t.Fragment,{children:[t.jsx(W,{role:"listbox",id:y,children:e.map((a,I)=>t.jsx(g,{option:a,index:I,submit:()=>{p(),n(a.value)}},a.value))}),t.jsx(w,{cancel:p,options:e,submit:a=>{p(),n(a.value)}})]})]})},B=o.div`
  position: relative;
  min-width: 100px;
`,G=o.div`
  background: ${d.colors.light.white};
  color: ${d.colors.dark.darkGrey};
  border-radius: 100px;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${d.colors.dark.lightGrey};
  position: relative;
  z-index: 1;

  > div {
    display: flex;
    align-items: center;
    > span {
      color: ${d.colors.dark.black};
      font-weight: 400;
      padding-left: 18px;
    }
  }
`,W=o.div`
  display: grid;
  background: ${d.colors.light.white};
  position: absolute;
  top: 45px;
  min-width: 170px;
  cursor: pointer;
  border-radius: 12px;
  z-index: 9999;
  box-shadow:
    0 -3px 8px 1px rgba(0, 0, 0, 0.05),
    0 -4px 8px 0   rgba(0, 0, 0, 0.03),

    0 3px 8px 1px rgba(0, 0, 0, 0.05),
    0 4px 8px 0   rgba(0, 0, 0, 0.03);
  overflow: hidden;
`,F=o.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 4px;
`,K=o.span`
  font-weight: 400;
  color: ${d.colors.dark.black};
`;A.__docgenInfo={description:"",methods:[],displayName:"SmallSelect",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"OptionInterface"}],raw:"OptionInterface[]"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},initialPlaceholder:{required:!1,tsType:{name:"string"},description:""},placeholderLeftIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},fixedLeftIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};export{A as S};
