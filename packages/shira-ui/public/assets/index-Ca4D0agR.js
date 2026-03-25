import{j as e,l as t,h as a}from"./iframe-5Ndfg9Cb.js";import{a as c}from"./polished.esm-D73pw9Ka.js";const n=()=>e.jsxs("svg",{width:9,height:16,viewBox:"0 0 9 16",fill:"none",children:[e.jsx("path",{opacity:.3,d:"M6.19629 0.346191H3.19629V1.84619H1.69629C1.144 1.84619 0.696289 2.34987 0.696289 2.97119V14.2212C0.696289 14.8425 1.144 15.3462 1.69629 15.3462H7.69629C8.24857 15.3462 8.69629 14.8425 8.69629 14.2212V2.97119C8.69629 2.34987 8.24857 1.84619 7.69629 1.84619H6.19629V0.346191Z",fill:"#5F6368"}),e.jsx("path",{d:"M0.696295 8.34619C0.696288 8.92952 0.696289 13.7129 0.696289 14.2962C0.696289 14.8761 1.144 15.3462 1.69629 15.3462H7.69629C8.24857 15.3462 8.69629 14.8761 8.69629 14.2962C8.69629 13.7129 8.69629 8.92952 8.69629 8.34619H0.696295Z",fill:"#5F6368"})]});n.__docgenInfo={description:"",methods:[],displayName:"Battery"};const s=()=>e.jsx("svg",{width:15,height:15,viewBox:"0 0 15 15",fill:"none",children:e.jsx("path",{d:"M14.2796 0.762939L0.112915 14.9296H14.2796V0.762939Z",fill:"#5F6368"})});s.__docgenInfo={description:"",methods:[],displayName:"Signal"};const d=()=>e.jsx("svg",{width:18,height:15,viewBox:"0 0 18 15",fill:"none",children:e.jsx("path",{opacity:.4,d:"M9.19629 0.762939C5.79629 0.762939 2.82129 2.25044 0.696289 4.58794L9.19629 14.9296L17.6963 4.58794C15.5713 2.25044 12.5963 0.762939 9.19629 0.762939Z",fill:"#5F6368"})});d.__docgenInfo={description:"",methods:[],displayName:"Wifi"};const l=({children:i,className:o,background:r})=>e.jsxs(h,{children:[e.jsx(p,{}),e.jsxs(f,{background:r,className:o,children:[e.jsxs(x,{children:[e.jsx("div",{children:"9:30"}),e.jsxs(m,{children:[e.jsx(d,{}),e.jsx(s,{}),e.jsx(g,{children:e.jsx(n,{})})]})]}),i]})]}),p=a`
  .android {
    font-family: 'Product Sans Regular';
  }
`,h=t.div`
  width: 100%;
  height: 100%;
  background: ${i=>c("0.4",i.theme.secondary.base)};
  display: flex;
  justify-content: center;
  align-items: center;
`,x=t.div`
  padding: 8px 24px 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5F6368;
  font-weight: 500;
  font-size: 14px;
`,g=t.div`
  height: 15px;
  padding-left: 4px;
`,m=t.div`
  display: flex;
  align-items: center;
`,f=t("div")`
  box-sizing: border-box;
  height: 80vh;
  aspect-ratio: 1/2;
  background: ${i=>i.background};
  border-radius: 50px;
  border: 17px solid #F3F3F3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  @media (max-width: ${i=>i.theme.breakpoints.md}) and (max-height: 860px) {
    width: 90%;
  }

  @media (max-width: ${i=>i.theme.breakpoints.sm}) {
    border-radius: 0;
    border: none;
    height: 100%;
    width: 100%;
  }
`;l.__docgenInfo={description:"",methods:[],displayName:"Phone",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},background:{required:!0,tsType:{name:"string"},description:""}}};export{l as P};
