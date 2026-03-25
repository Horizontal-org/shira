import{r as y,j as c,l as S}from"./iframe-5Ndfg9Cb.js";import{F as D}from"./Card-CUSePxQ6.js";import{b as T}from"./index-v16uExsc.js";import"./preload-helper-PPVm8Dsz.js";import"./Typography-BqYQ0w-p.js";import"./index-BgUawfai.js";import"./index-VIjOM9gh.js";import"./LanguageIcon-C0TLKsca.js";import"./Button-WWwhC_Vt.js";import"./polished.esm-D73pw9Ka.js";import"./Breadcrumbs-D11mMiWT.js";import"./iconBase-sYgM02tz.js";import"./TextInput-BPcQvO6d.js";import"./Form-B9DLbO4-.js";import"./Box-BAceP9LP.js";import"./Navbar-B-gtWTGN.js";import"./MobileMenu-bBnI4ZGY.js";import"./Sidebar-BxvR03dK.js";import"./BaseFloatingMenu-BseG65a2.js";import"./Toggle-LmBBwW_J.js";import"./FilterButton--l6UcuRg.js";import"./Tab-D7zJ_rTP.js";import"./Modal-jfz5TfTY.js";import"./AddAttachmentModal-MCZvuq5T.js";import"./Attachment-BiRjylqd.js";import"./index-CLYLccxg.js";import"./useGetWidth-FmW8dlw1.js";/* empty css              */import"./index-QZLQZRwj.js";import"./floating-ui.react-CujXx6nl.js";import"./index-BOfF0s4b.js";import"./index-BjCKpARz.js";import"./index-Ca4D0agR.js";import"./index-Bcu8knSm.js";import"./index-CdkTU3Dc.js";/* empty css              */import"./index-D-RoNVKw.js";import"./index-Rmvgb4za.js";import"./index-828e-ipe.js";import"./BetaBanner-Cfdn9bRV.js";import"./SmallSelect-ym30f6Wz.js";import"./FlowHeader-CNjvJ-KW.js";import"./index-DJqNt9_X.js";let O;const w=new Uint8Array(16);function B(){if(!O&&(O=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!O))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return O(w)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function L(e,t=0){return r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]}const F=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:F};function P(e,t,n){if(b.randomUUID&&!e)return b.randomUUID();e=e||{};const o=e.random||(e.rng||B)();return o[6]=o[6]&15|64,o[8]=o[8]&63|128,L(o)}const{addons:V}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:W}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:h}=__STORYBOOK_MODULE_GLOBAL__;var K=Object.defineProperty,k=(e,t)=>{for(var n in t)K(e,n,{get:t[n],enumerable:!0})},Y="storybook/actions",z=`${Y}/action-event`,N={depth:10,clearOnStoryChange:!0,limit:50},v=(e,t)=>{let n=Object.getPrototypeOf(e);return!n||t(n)?n:v(n,t)},H=e=>!!(typeof e=="object"&&e&&v(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),$=e=>{if(H(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let n=Object.getOwnPropertyDescriptor(t,"view"),o=n?.value;return typeof o=="object"&&o?.constructor.name==="Window"&&Object.defineProperty(t,"view",{...n,value:Object.create(o.constructor.prototype)}),t}return e},G=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?P():Date.now().toString(36)+Math.random().toString(36).substring(2);function i(e,t={}){let n={...N,...t},o=function(...a){if(t.implicit){let R=("__STORYBOOK_PREVIEW__"in h?h.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find(d=>d.phase==="playing"||d.phase==="rendering");if(R){let d=!globalThis?.FEATURES?.disallowImplicitActionsInRenderV8,E=new W({phase:R.phase,name:e,deprecated:d});if(d)console.warn(E);else throw E}}let s=V.getChannel(),p=G(),m=5,_=a.map($),U=a.length>1?_:_[0],j={id:p,count:0,data:{name:e,args:U},options:{...n,maxDepth:m+(n.depth||3),allowFunction:n.allowFunction||!1}};s.emit(z,j)};return o.isAction=!0,o.implicit=t.implicit,o}const{definePreview:Ne}=__STORYBOOK_MODULE_PREVIEW_API__,{global:f}=__STORYBOOK_MODULE_GLOBAL__;var J={};k(J,{argsEnhancers:()=>Q,loaders:()=>ee});var C=(e,t)=>typeof t[e]>"u"&&!(e in t),X=e=>{let{initialArgs:t,argTypes:n,id:o,parameters:{actions:a}}=e;if(!a||a.disable||!a.argTypesRegex||!n)return{};let s=new RegExp(a.argTypesRegex);return Object.entries(n).filter(([p])=>!!s.test(p)).reduce((p,[m,_])=>(C(m,t)&&(p[m]=i(m,{implicit:!0,id:o})),p),{})},q=e=>{let{initialArgs:t,argTypes:n,parameters:{actions:o}}=e;return o?.disable||!n?{}:Object.entries(n).filter(([a,s])=>!!s.action).reduce((a,[s,p])=>(C(s,t)&&(a[s]=i(typeof p.action=="string"?p.action:s)),a),{})},Q=[q,X],x=!1,Z=e=>{let{parameters:{actions:t}}=e;if(!t?.disable&&!x&&"__STORYBOOK_TEST_ON_MOCK_CALL__"in f&&typeof f.__STORYBOOK_TEST_ON_MOCK_CALL__=="function"){let n=f.__STORYBOOK_TEST_ON_MOCK_CALL__;n((o,a)=>{let s=o.getMockName();s!=="spy"&&(!/^next\/.*::/.test(s)||["next/router::useRouter()","next/navigation::useRouter()","next/navigation::redirect","next/cache::","next/headers::cookies().set","next/headers::cookies().delete","next/headers::headers().set","next/headers::headers().delete"].some(p=>s.startsWith(p)))&&i(s)(a)}),x=!0}},ee=[Z];const He={title:"Components/FloatingMenu",component:D,parameters:{layout:"centered"}},I=S.div`
  padding: 100px;
  position: relative;
`,M=S.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #5f6368;
  
  &:hover {
    color: #202124;
  }
`,te=()=>{const[e,t]=y.useState(!1),n=y.useRef(null);return c.jsxs(I,{children:[c.jsx(M,{ref:n,onClick:()=>t(!e),children:c.jsx(T,{size:20})}),c.jsx(D,{isOpen:e,onClose:()=>t(!1),onEdit:()=>{i("onEdit")(),t(!1)},onDuplicate:()=>{i("onDuplicate")(),t(!1)},onCopyUrl:()=>{i("onCopyUrl")(),t(!1)},onDelete:()=>{i("onDelete")(),t(!1)},anchorEl:n.current})]})},g=te.bind({});g.parameters={docs:{description:{story:"Click the three dots icon to open the menu. The menu will close when clicking outside or selecting an option."}}};const A=e=>{const t=y.useRef(null);return c.jsxs(I,{children:[c.jsx(M,{ref:t,children:c.jsx(T,{size:20})}),c.jsx(D,{...e,anchorEl:t.current})]})},l=A.bind({});l.args={isOpen:!0,onClose:i("onClose"),onEdit:i("onEdit"),onDuplicate:i("onDuplicate"),onCopyUrl:i("onCopyUrl"),onDelete:i("onDelete")};l.parameters={docs:{description:{story:"Menu in open state, showing all available options."}}};const u=A.bind({});u.args={isOpen:!1,onClose:i("onClose"),onEdit:i("onEdit"),onDuplicate:i("onDuplicate"),onCopyUrl:i("onCopyUrl"),onDelete:i("onDelete")};u.parameters={docs:{description:{story:"Menu in closed state."}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return <DemoWrapper>
      <DemoButton ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        <FiMoreVertical size={20} />
      </DemoButton>

      <FloatingMenu isOpen={isOpen} onClose={() => setIsOpen(false)} onEdit={() => {
      action('onEdit')();
      setIsOpen(false);
    }} onDuplicate={() => {
      action('onDuplicate')();
      setIsOpen(false);
    }} onCopyUrl={() => {
      action('onCopyUrl')();
      setIsOpen(false);
    }} onDelete={() => {
      action('onDelete')();
      setIsOpen(false);
    }} anchorEl={buttonRef.current} />
    </DemoWrapper>;
}`,...g.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`(args: JSX.IntrinsicAttributes & FloatingMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return <DemoWrapper>
      <DemoButton ref={buttonRef}>
        <FiMoreVertical size={20} />
      </DemoButton>

      <FloatingMenu {...args} anchorEl={buttonRef.current} />
    </DemoWrapper>;
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`(args: JSX.IntrinsicAttributes & FloatingMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return <DemoWrapper>
      <DemoButton ref={buttonRef}>
        <FiMoreVertical size={20} />
      </DemoButton>

      <FloatingMenu {...args} anchorEl={buttonRef.current} />
    </DemoWrapper>;
}`,...u.parameters?.docs?.source}}};const $e=["LiveDemo","OpenState","ClosedState"];export{u as ClosedState,g as LiveDemo,l as OpenState,$e as __namedExportsOrder,He as default};
