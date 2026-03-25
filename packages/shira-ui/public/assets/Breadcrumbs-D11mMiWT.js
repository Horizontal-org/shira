import{e as d,j as r,l as t}from"./iframe-5Ndfg9Cb.js";import{c}from"./Typography-BqYQ0w-p.js";import{G as a}from"./iconBase-sYgM02tz.js";function l(e){return a({attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"},child:[]}]})(e)}const m=({items:e,active:i})=>{const n=d();return r.jsx(p,{children:e.map((s,o)=>r.jsxs(r.Fragment,{children:[r.jsxs(h,{$active:i===o,children:[r.jsx(x,{children:o+1}),r.jsx(c,{children:s.text})]}),o<e.length-1&&r.jsx(g,{children:r.jsx(l,{color:n.colors.green6})})]}))})},p=t.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
`,h=t.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 4px solid transparent;
  color: ${e=>e.theme.colors.dark.darkGrey};

  ${e=>e.$active&&`
    color: ${e.theme.colors.green7};
    border-bottom: 4px solid ${e.theme.colors.green7};

    > div {
      background: ${e.theme.colors.green7};
    }
  `}
`,x=t.div`
  background: ${e=>e.theme.colors.dark.darkGrey};
  height: 24px;
  min-height: 24px;
  width: 24px;
  border-radius: 50%;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  margin-right: 8px;
`,g=t.div`
  margin: 0 20px;
`;m.__docgenInfo={description:"",methods:[],displayName:"Breadcrumbs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"BreadcrumbProps"}],raw:"BreadcrumbProps[]"},description:""},active:{required:!0,tsType:{name:"number"},description:""}}};export{m as B};
