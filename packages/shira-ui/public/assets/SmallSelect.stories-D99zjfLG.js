import{j as e,r as u,l as h}from"./iframe-5Ndfg9Cb.js";import{S as p}from"./SmallSelect-ym30f6Wz.js";import{L as n}from"./LanguageIcon-C0TLKsca.js";import"./preload-helper-PPVm8Dsz.js";import"./index-v16uExsc.js";import"./iconBase-sYgM02tz.js";import"./Button-WWwhC_Vt.js";import"./polished.esm-D73pw9Ka.js";const j={title:"Components/SmallSelect",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:"text",description:"Currently selected value."},options:{control:"object",description:"List of available options."},onChange:{action:"changed",description:"Callback triggered with the selected value."},placeholder:{control:"text",description:"Placeholder text when no option is selected."},placeholderLeftIcon:{control:!1,description:"Optional icon displayed when showing the placeholder."},fixedLeftIcon:{control:!1,description:"Icon always displayed at the left, regardless of selection."}},decorators:[i=>e.jsx(m,{children:e.jsx(i,{})})]},m=h.div`
  width: 400px;
`,a={args:{options:[{label:"Español",labelEnglish:"Spanish",value:"es",leftIcon:e.jsx(n,{})},{label:"English",labelEnglish:"English",value:"en",leftIcon:e.jsx(n,{})},{label:"Français",labelEnglish:"French",value:"fr",leftIcon:e.jsx(n,{})}],value:null,onChange:()=>{},initialPlaceholder:"Language",placeholderLeftIcon:e.jsx(n,{})}},l={args:{...a.args,value:"en"}},s={args:{...a.args,options:[{label:"Español",labelEnglish:"Spanish",value:"es",leftIcon:e.jsx(n,{})},{label:"English",labelEnglish:"English",value:"en",leftIcon:e.jsx(n,{})},{label:"Français",labelEnglish:"French",value:"fr",leftIcon:e.jsx(n,{})}].slice(0,2)}},o={args:{...a.args,initialPlaceholder:"Language"}},r={args:{...a.args,fixedLeftIcon:e.jsx(n,{})}},t={args:{...a.args,options:[]}},c={render:i=>{const[g,d]=u.useState(void 0);return e.jsxs("div",{style:{display:"grid",gap:12},children:[e.jsx(p,{...i,options:[{label:"Español",labelEnglish:"Spanish",value:"es",leftIcon:e.jsx(n,{})},{label:"English",labelEnglish:"English",value:"en",leftIcon:e.jsx(n,{})},{label:"Français",labelEnglish:"French",value:"fr",leftIcon:e.jsx(n,{})}],value:g,onChange:d}),e.jsxs("small",{children:["Selected: ",e.jsx("b",{children:g??"— (nothing selected yet)"})]})]})},args:{...a.args}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    options: [{
      label: 'Español',
      labelEnglish: 'Spanish',
      value: 'es',
      leftIcon: <LanguageIcon />
    }, {
      label: 'English',
      labelEnglish: 'English',
      value: 'en',
      leftIcon: <LanguageIcon />
    }, {
      label: 'Français',
      labelEnglish: 'French',
      value: 'fr',
      leftIcon: <LanguageIcon />
    }],
    value: null,
    onChange: () => {},
    initialPlaceholder: 'Language',
    placeholderLeftIcon: <LanguageIcon />
  }
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    value: 'en'
  }
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    options: [{
      label: 'Español',
      labelEnglish: 'Spanish',
      value: 'es',
      leftIcon: <LanguageIcon />
    }, {
      label: 'English',
      labelEnglish: 'English',
      value: 'en',
      leftIcon: <LanguageIcon />
    }, {
      label: 'Français',
      labelEnglish: 'French',
      value: 'fr',
      leftIcon: <LanguageIcon />
    }].slice(0, 2)
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    initialPlaceholder: 'Language'
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    fixedLeftIcon: <LanguageIcon />
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    options: []
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    return <div style={{
      display: 'grid',
      gap: 12
    }}>
        <SmallSelect {...args} options={[{
        label: 'Español',
        labelEnglish: 'Spanish',
        value: 'es',
        leftIcon: <LanguageIcon />
      }, {
        label: 'English',
        labelEnglish: 'English',
        value: 'en',
        leftIcon: <LanguageIcon />
      }, {
        label: 'Français',
        labelEnglish: 'French',
        value: 'fr',
        leftIcon: <LanguageIcon />
      }]} value={selected} onChange={setSelected} />
        <small>
          Selected: <b>{selected ?? '— (nothing selected yet)'}</b>
        </small>
      </div>;
  },
  args: {
    ...Default.args
  }
}`,...c.parameters?.docs?.source}}};const y=["Default","WithValue","OnlyTwoOptions","CustomPlaceholder","WithFixedLeftIcon","EmptyOptions","Interactive"];export{o as CustomPlaceholder,a as Default,t as EmptyOptions,c as Interactive,s as OnlyTwoOptions,r as WithFixedLeftIcon,l as WithValue,y as __namedExportsOrder,j as default};
