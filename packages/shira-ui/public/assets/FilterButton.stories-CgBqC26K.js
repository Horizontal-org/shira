import{r as n,j as t}from"./iframe-5Ndfg9Cb.js";import{F as l}from"./FilterButton--l6UcuRg.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-WWwhC_Vt.js";import"./polished.esm-D73pw9Ka.js";const F={title:"Components/FilterButton",component:l,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{text:{control:"text",description:"Button text content"},handleFilter:{action:"filtered",description:"Filter handler function"},isActive:{control:"boolean",description:"Whether the filter is currently active"},color:{control:"text",description:"Wheter it needs a color scheme applied"}}},r={args:{text:"All quizzes",isActive:!1,handleFilter:()=>{}}},i={args:{text:"All quizzes",isActive:!0,handleFilter:()=>{}}},s={args:{text:"All quizzes",isActive:!0,color:"green",handleFilter:()=>{}}},e=()=>{const[a,o]=n.useState("all");return t.jsxs("div",{style:{display:"flex",gap:"8px"},children:[t.jsx(l,{text:"All quizzes",isActive:a==="all",handleFilter:()=>o("all")}),t.jsx(l,{text:"Published",isActive:a==="published",handleFilter:()=>o("published")}),t.jsx(l,{text:"Unpublished",isActive:a==="unpublished",handleFilter:()=>o("unpublished")})]})};e.__docgenInfo={description:"",methods:[],displayName:"FilterGroup"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'All quizzes',
    isActive: false,
    handleFilter: () => {}
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'All quizzes',
    isActive: true,
    handleFilter: () => {}
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'All quizzes',
    isActive: true,
    color: 'green',
    handleFilter: () => {}
  }
}`,...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'published' | 'unpublished'>('all');
  return <div style={{
    display: 'flex',
    gap: '8px'
  }}>
      <FilterButton text="All quizzes" isActive={activeFilter === 'all'} handleFilter={() => setActiveFilter('all')} />
      <FilterButton text="Published" isActive={activeFilter === 'published'} handleFilter={() => setActiveFilter('published')} />
      <FilterButton text="Unpublished" isActive={activeFilter === 'unpublished'} handleFilter={() => setActiveFilter('unpublished')} />
    </div>;
}`,...e.parameters?.docs?.source}}};const m=["Default","Active","ActiveColor","FilterGroup"];export{i as Active,s as ActiveColor,r as Default,e as FilterGroup,m as __namedExportsOrder,F as default};
