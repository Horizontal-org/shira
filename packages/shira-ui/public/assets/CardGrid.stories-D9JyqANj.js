import{j as t,l as s}from"./iframe-5Ndfg9Cb.js";import{C as l}from"./Card-CUSePxQ6.js";import"./preload-helper-PPVm8Dsz.js";import"./Typography-BqYQ0w-p.js";import"./index-v16uExsc.js";import"./iconBase-sYgM02tz.js";import"./index-BgUawfai.js";import"./index-VIjOM9gh.js";import"./LanguageIcon-C0TLKsca.js";import"./Button-WWwhC_Vt.js";import"./polished.esm-D73pw9Ka.js";import"./Breadcrumbs-D11mMiWT.js";import"./TextInput-BPcQvO6d.js";import"./Form-B9DLbO4-.js";import"./Box-BAceP9LP.js";import"./Navbar-B-gtWTGN.js";import"./MobileMenu-bBnI4ZGY.js";import"./Sidebar-BxvR03dK.js";import"./BaseFloatingMenu-BseG65a2.js";import"./Toggle-LmBBwW_J.js";import"./FilterButton--l6UcuRg.js";import"./Tab-D7zJ_rTP.js";import"./Modal-jfz5TfTY.js";import"./AddAttachmentModal-MCZvuq5T.js";import"./Attachment-BiRjylqd.js";import"./index-CLYLccxg.js";import"./useGetWidth-FmW8dlw1.js";/* empty css              */import"./index-QZLQZRwj.js";import"./floating-ui.react-CujXx6nl.js";import"./index-BOfF0s4b.js";import"./index-BjCKpARz.js";import"./index-Ca4D0agR.js";import"./index-Bcu8knSm.js";import"./index-CdkTU3Dc.js";/* empty css              */import"./index-D-RoNVKw.js";import"./index-Rmvgb4za.js";import"./index-828e-ipe.js";import"./BetaBanner-Cfdn9bRV.js";import"./SmallSelect-ym30f6Wz.js";import"./FlowHeader-CNjvJ-KW.js";import"./index-DJqNt9_X.js";const Z={title:"Components/Card",component:l,parameters:{layout:"padded"},tags:["autodocs"]},d=s.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
`,r=[{title:"Short Title",lastModified:"2 days ago",isPublished:!0},{title:"Medium Length Title That Fits Well",lastModified:"5 days ago",isPublished:!1},{title:"Very Long Title That Should Truncate Because It Exceeds The Maximum Width Available",lastModified:"1 week ago",isPublished:!0},{title:"Another Short One",lastModified:"2 weeks ago",isPublished:!1},{title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",lastModified:"3 weeks ago",isPublished:!0},{title:"Card Title 6",lastModified:"1 month ago",isPublished:!1},{title:"This is a test of a longer title that might need to wrap to multiple lines",lastModified:"2 months ago",isPublished:!0},{title:"Card Title 8",lastModified:"3 months ago",isPublished:!1},{title:"Final Card With A Rather Long Title To Test Truncation",lastModified:"4 months ago",isPublished:!0}],o={args:{title:"Default Title",lastModified:"2 days ago",isPublished:!0,onTogglePublished:()=>console.log("Toggle published"),onCopyUrl:()=>console.log("Copy URL"),onEdit:()=>console.log("edit"),onDuplicate:()=>console.log("duplicate"),onDelete:()=>console.log("delete"),onCardClick:()=>console.log("card click"),publishedText:"Published"},render:function(){return t.jsx(d,{children:r.map((e,i)=>t.jsx(l,{title:e.title,lastModified:e.lastModified,isPublished:e.isPublished,onTogglePublished:()=>console.log("Toggle published for card",i),onCopyUrl:()=>console.log("Copy URL for card",i),onEdit:()=>console.log("on edit"),onDuplicate:()=>console.log("on duplicate"),onDelete:()=>console.log("on delete"),onCardClick:()=>console.log("card clicked"),publishedText:"Published"},i))})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Default Title",
    lastModified: "2 days ago",
    isPublished: true,
    onTogglePublished: () => console.log('Toggle published'),
    onCopyUrl: () => console.log('Copy URL'),
    onEdit: () => console.log('edit'),
    onDuplicate: () => console.log('duplicate'),
    onDelete: () => console.log('delete'),
    onCardClick: () => console.log('card click'),
    publishedText: 'Published'
  },
  render: function Story() {
    return <Grid>
          {cardData.map((card, index) => <Card key={index} title={card.title} lastModified={card.lastModified} isPublished={card.isPublished} onTogglePublished={() => console.log('Toggle published for card', index)} onCopyUrl={() => console.log('Copy URL for card', index)} onEdit={() => console.log('on edit')} onDuplicate={() => console.log('on duplicate')} onDelete={() => console.log('on delete')} onCardClick={() => console.log('card clicked')} publishedText={'Published'} />)}
        </Grid>;
  }
}`,...o.parameters?.docs?.source}}};const $=["GridLayout"];export{o as GridLayout,$ as __namedExportsOrder,Z as default};
