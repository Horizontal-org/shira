import{j as l,l as c}from"./iframe-5Ndfg9Cb.js";import{B as s}from"./Button-WWwhC_Vt.js";const d=({id:e,text:o,handleFilter:r,isActive:t,color:i})=>{const n=()=>{t||r()};return l.jsx(a,{id:e,onClick:n,type:"outline",text:o,size:"sm",$isActive:t,color:i})},a=c(s)`
  ${e=>e.$isActive&&!e.color&&`
    background: ${e.theme.colors.dark.darkGrey};
    color: ${e.theme.colors.light.white};
    outline: none;
    border-color: ${e.theme.colors.light.white};

    &:focus {
      outline: none;
      border-color: ${e.theme.colors.light.white};
    }
  `}


  ${e=>e.$isActive&&e.color==="green"&&`
    background: ${e.theme.colors.green2};
    color: black;
    outline: none;
    border-color: ${e.theme.colors.dark.darkGrey};

    &:focus {
      outline: none;
      border-color: ${e.theme.colors.dark.darkGrey};
    }
  `}
`;d.__docgenInfo={description:"",methods:[],displayName:"FilterButton",props:{id:{required:!1,tsType:{name:"string"},description:""},text:{required:!0,tsType:{name:"string"},description:""},handleFilter:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},isActive:{required:!0,tsType:{name:"boolean"},description:""},color:{required:!1,tsType:{name:"string"},description:""}}};export{d as F};
