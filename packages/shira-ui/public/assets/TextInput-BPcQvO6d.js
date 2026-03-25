import{r as c,j as t,l as a}from"./iframe-5Ndfg9Cb.js";import{m as T,n as v}from"./index-v16uExsc.js";const E=c.forwardRef(({placeholder:e,onChange:p,value:s,label:o,onBlur:u,onFocus:m,name:f,id:x,disabled:n=!1,type:h="text",required:l=!1},b)=>{const[r,y]=c.useState(!1),i=!!o&&s!=="",g=!i&&o?o:e,d=h==="password",w=d&&!r?"password":"text";return t.jsxs(k,{children:[i&&t.jsx(H,{$disabled:n,$required:l,children:o}),t.jsxs(q,{children:[t.jsx(I,{id:x,name:f,type:w,onChange:p,placeholder:g,value:s,disabled:n,required:l,ref:b,onBlur:u,onFocus:m}),d&&t.jsx($,{type:"button",onClick:()=>y(!r),disabled:n,children:r?t.jsx(T,{size:20,color:n?"#aaa":"#666"}):t.jsx(v,{size:20,color:n?"#aaa":"#666"})})]})]})}),k=a.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
`,q=a.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
`,H=a.label`
    font-size: 16px;
    color: ${e=>e.$disabled?"#aaa":e.theme.colors.dark.black};

    ${e=>e.$required&&`
        &:before {
            content: "* ";
            color: red;
            margin-left: 4px;
        }
    `}
`,I=a.input`
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 16px;
    padding: 12px 16px;
    width: 100%;
    font-weight: 300;
    font-size: 18px;
    background: white;
    border: 2px solid ${e=>e.theme.colors.green3};
    color: ${e=>e.theme.colors.dark.darkGrey};
    transition: all 0.2s ease-in-out;

    &::placeholder {
        color: ${e=>e.theme.colors.dark.darkGrey};
    }

    /* Hover state */
    &:hover:not(:disabled) {
        background: ${e=>e.theme.colors.green1};
    }

    /* Focus state */
    &:focus:not(:disabled) {
        background: #f0fff9;
        box-shadow: 0 0 0 2px ${e=>e.theme.colors.green3};
    }

    /* Disabled state */
    &:disabled {
        background: #f5f5f5;
        border-color: #ddd;
        color: ${e=>e.theme.colors.dark.darkGrey};
        cursor: not-allowed;
    }
`,$=a.button`
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
        cursor: not-allowed;
    }

    &:focus {
        outline: none;
    }
`;E.__docgenInfo={description:"",methods:[],displayName:"TextInput",props:{placeholder:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"ChangeEventHandler",elements:[{name:"HTMLInputElement"}],raw:"ChangeEventHandler<HTMLInputElement>"},description:""},value:{required:!0,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'text' | 'password' | 'email'",elements:[{name:"literal",value:"'text'"},{name:"literal",value:"'password'"},{name:"literal",value:"'email'"}]},description:"",defaultValue:{value:"'text'",computed:!1}},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onBlur:{required:!1,tsType:{name:"ReactFocusEventHandler",raw:"React.FocusEventHandler<HTMLInputElement>",elements:[{name:"HTMLInputElement"}]},description:""},onFocus:{required:!1,tsType:{name:"ReactFocusEventHandler",raw:"React.FocusEventHandler<HTMLInputElement>",elements:[{name:"HTMLInputElement"}]},description:""},id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""}}};export{E as T};
