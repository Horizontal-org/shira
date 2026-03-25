import{r,j as e,l as i}from"./iframe-5Ndfg9Cb.js";import{b as c,c as l}from"./index-v16uExsc.js";import{B as a}from"./BaseFloatingMenu-BseG65a2.js";import"./preload-helper-PPVm8Dsz.js";import"./iconBase-sYgM02tz.js";import"./index-BgUawfai.js";import"./index-VIjOM9gh.js";const B={title:"Components/BaseFloatingMenu",component:a,parameters:{layout:"centered"}},p=i.div`
  padding: 100px;
  position: relative;
`,m=i.button`
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
`,u=()=>{const[n,t]=r.useState(!1),s=r.useRef(null);return e.jsxs(p,{children:[e.jsx(m,{ref:s,onClick:()=>t(!n),children:e.jsx(c,{size:20})}),e.jsx(a,{isOpen:n,onClose:()=>t(!1),elements:[{text:"Upload from computer",onClick:()=>{console.log("something")},icon:e.jsx(l,{})}],anchorEl:s.current})]})},o=u.bind({});o.parameters={docs:{description:{story:"Click the three dots icon to open the menu. The menu will close when clicking outside or selecting an option."}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return <DemoWrapper>
      <DemoButton ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        <FiMoreVertical size={20} />
      </DemoButton>

      <BaseFloatingMenu isOpen={isOpen} onClose={() => setIsOpen(false)} elements={[{
      text: 'Upload from computer',
      onClick: () => {
        console.log('something');
      },
      icon: <FiShare />
    }]} anchorEl={buttonRef.current} />
    </DemoWrapper>;
}`,...o.parameters?.docs?.source}}};const C=["LiveDemo"];export{o as LiveDemo,C as __namedExportsOrder,B as default};
