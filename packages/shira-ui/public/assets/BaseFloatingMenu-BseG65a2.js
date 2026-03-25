import{r as n,j as s,l}from"./iframe-5Ndfg9Cb.js";import{r as x}from"./index-BgUawfai.js";const y=({isOpen:t,elements:p,onClose:c,anchorEl:r})=>{const i=n.useRef(null),[a,g]=n.useState({top:0,left:0}),[u,m]=n.useState(null);return n.useEffect(()=>{if(document.getElementById("floating-menu-portal"))m(document.getElementById("floating-menu-portal"));else{const e=document.createElement("div");e.id="floating-menu-portal",document.body.appendChild(e),m(e)}return()=>{const e=document.getElementById("floating-menu-portal");e&&e.childNodes.length===0&&document.body.removeChild(e)}},[]),n.useLayoutEffect(()=>{if(t&&r){const e=()=>{const o=r.getBoundingClientRect();let w=o.bottom+window.scrollY+8,d=o.left+window.scrollX;const f=120;d+f>window.innerWidth&&(d=o.right-f+window.scrollX),g({top:w,left:d})};return e(),window.addEventListener("scroll",e,!0),window.addEventListener("resize",e),()=>{window.removeEventListener("scroll",e,!0),window.removeEventListener("resize",e)}}},[t,r]),n.useEffect(()=>{function e(o){i.current&&o.target instanceof Node&&!i.current.contains(o.target)&&r&&!r.contains(o.target)&&c()}return t&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[t,c,r]),!t||!u?null:x.createPortal(s.jsx(h,{ref:i,style:{top:`${a.top}px`,left:`${a.left}px`},children:s.jsx(b,{children:p.map((e,o)=>s.jsxs(v,{onClick:e.onClick,children:[e.icon&&n.cloneElement(e.icon,{size:16}),e.text]},o))})}),u)},h=l.div`
  position: absolute;
  z-index: 999999;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`,b=l.div`
  border-radius: 8px;
  overflow: hidden;
`,v=l.button`
  width: 100%;
  margin: 0;
  padding: 8px 16px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${t=>t.theme.colors.dark.darkGrey};
  font-size: 14px;
  font-weight: 400;

  &:hover {
    background: ${t=>t.theme.colors.light.paleGrey};
    color: ${t=>t.theme.colors.dark.black};
  }
`;export{y as B};
