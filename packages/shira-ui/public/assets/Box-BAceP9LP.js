import{j as d,l as i}from"./iframe-5Ndfg9Cb.js";const l=({children:e,padding:a="default",className:t})=>d.jsx(r,{$padding:a,className:t,children:e}),r=i.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border: 2px solid #F3F3F3;
  border-radius: 16px;
  background: white;

  /* Padding variants */
  padding: ${e=>{switch(e.$padding){case"large":return"48px";case"small":return"24px";default:return"32px"}}};

  /* Desktop (lg) */
  @media (min-width: ${e=>e.theme.breakpoints.lg}) {
    width: 800px;
  }

  /* Tablet (md) */
  @media (min-width: ${e=>e.theme.breakpoints.md}) and (max-width: ${e=>e.theme.breakpoints.lg}) {
    width: 712px;
  }

  /* Small tablet (sm) */
  @media (min-width: ${e=>e.theme.breakpoints.sm}) and (max-width: ${e=>e.theme.breakpoints.md}) {
    width: 696px;
  }

  /* Mobile */
  @media (max-width: ${e=>e.theme.breakpoints.sm}) {
    width: 100%;
    gap: 20px;
    padding: 8px;
    border: none;
  }
`;l.__docgenInfo={description:"",methods:[],displayName:"Box",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},padding:{required:!1,tsType:{name:"union",raw:"'large' | 'default' | 'small'",elements:[{name:"literal",value:"'large'"},{name:"literal",value:"'default'"},{name:"literal",value:"'small'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};export{l as B};
