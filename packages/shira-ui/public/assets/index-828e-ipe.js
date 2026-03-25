import{j as e,l as a,r as R,h as yt}from"./iframe-5Ndfg9Cb.js";import{E as _t}from"./index-BOfF0s4b.js";/* empty css              */import{u as bt,f as Mt,s as St,d as kt,F as It}from"./floating-ui.react-CujXx6nl.js";import"./AddAttachmentModal-MCZvuq5T.js";import{A as I}from"./Attachment-BiRjylqd.js";const oe=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"white",stroke:"white",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M4 5a1 1 0 1 0 2 0 1 1 0 1 0-2 0M11 5a1 1 0 1 0 2 0 1 1 0 1 0-2 0M18 5a1 1 0 1 0 2 0 1 1 0 1 0-2 0M4 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M18 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M4 19a1 1 0 1 0 2 0 1 1 0 1 0-2 0M11 19a1 1 0 1 0 2 0 1 1 0 1 0-2 0M18 19a1 1 0 1 0 2 0 1 1 0 1 0-2 0"})});oe.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const se=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#424242","aria-label":"SearchRegular",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M12.73 13.44a6.5 6.5 0 1 1 .7-.7l3.42 3.4a.5.5 0 0 1-.63.77l-.07-.06zm-.71-.71A5.54 5.54 0 0 0 14 8.5a5.5 5.5 0 1 0-1.98 4.23"})});se.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const ae=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#424242","aria-label":"FilterRegular",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M7.5 13h5a.5.5 0 0 1 .09 1H7.5a.5.5 0 0 1-.09-1h5.09zm-2-4h9a.5.5 0 0 1 .09 1H5.5a.5.5 0 0 1-.09-1h9.09zm-2-4h13a.5.5 0 0 1 .09 1H3.5a.5.5 0 0 1-.09-1H16.5z"})});ae.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Ct=()=>e.jsxs(zt,{children:[e.jsxs("div",{children:[e.jsx(se,{}),e.jsx("span",{children:"Search"})]}),e.jsx(Bt,{children:e.jsx(ae,{})})]}),zt=a.div`
  width: 350px;
  height: 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #424242;
  background: #ffffff;
  box-shadow: inset 0 -1px #808080, inset 0 0 0 1px #D1D1D1;
  border-radius: 4px;
  padding: 6px 0 6px 6px;
  cursor: text;

  > div {
    display: flex;
    align-items: center;
    
    > span {
      font-size: 14px;
      font-weight: 400;
      padding-left: 6px; 
      padding-bottom: 1px;
    } 
  }

  &:hover {
    > div {
      visibility: visible; 
    }
  }
`,Bt=a.div`
  cursor: pointer;
  justify-content: center;
  visibility: hidden;
  height: 24px;
  width: 24px;  
  border-radius: 4px;
  margin-right: 4px;

  &:hover {
    background-color: #E5E5E5;
  }
`,v=({children:t,hide:n})=>e.jsx(Ft,{hide:n,children:t}),Ft=a.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  cursor: pointer;
  gap: 12px;
  padding: 0 14px;

  > span {
    color: white;
    font-size: 14px;
    font-weight: 300; 
    padding-bottom: 1px;
  }

  &:hover {
    background: #0C3B5E;
  }

  ${t=>t.hide==="desktop"&&`
    display: none;    
    @media (max-width: 915px) {
      display: flex;
    }
  `}




  ${t=>t.hide==="first"&&`
    @media (max-width: 915px) {
      display: none;    
    }
  `}


  ${t=>t.hide==="second"&&`
    @media (max-width: ${t.theme.breakpoints.sm}) {
      display: none;
    }
  `}
`;v.__docgenInfo={description:"",methods:[],displayName:"Button",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},hide:{required:!0,tsType:{name:"union",raw:"'first' | 'second' | 'never' | 'desktop'",elements:[{name:"literal",value:"'first'"},{name:"literal",value:"'second'"},{name:"literal",value:"'never'"},{name:"literal",value:"'desktop'"}]},description:""}}};const re=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"white","aria-label":"MeetNowRegular",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M5 5a2 2 0 0 0-2 2v6c0 1.1.9 2 2 2h6a2 2 0 0 0 2-2v-1.03l2.84 1.85a.75.75 0 0 0 1.16-.63V6.8c0-.6-.66-.95-1.16-.63L13 8.03V7a2 2 0 0 0-2-2zm8 4.22 3-1.95v5.46l-3-1.95zM12 7v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1M6.9 2.03a7 7 0 0 0-1.15.54h-.02v.01L6 3l-.28-.42a.5.5 0 0 0 .56.84 2 2 0 0 1 .22-.13A8.1 8.1 0 0 1 10 2.5a8.1 8.1 0 0 1 3.5.79 4 4 0 0 1 .22.12l.26-.39-.26.4a.5.5 0 1 0 .56-.84L14 3l.28-.42h-.01l-.02-.01a3 3 0 0 0-.3-.17A9.1 9.1 0 0 0 10 1.5a9.1 9.1 0 0 0-3.1.53m0 15.94c.73.27 1.8.53 3.11.53a9.1 9.1 0 0 0 3.96-.9 5 5 0 0 0 .29-.17h.02v-.01L14 17l.28.42a.5.5 0 0 0-.56-.84l.26.4-.26-.4a2 2 0 0 1-.22.13 8.1 8.1 0 0 1-3.5.79 8.1 8.1 0 0 1-3.5-.79 4 4 0 0 1-.22-.12.5.5 0 0 0-.56.83L6 17l-.28.42h.01l.02.01a3 3 0 0 0 .3.17c.19.1.48.24.84.37Zm6.83-1.39"})});re.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const de=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"white",stroke:"white",strokeWidth:"0",viewBox:"0 0 256 256",children:e.jsx("path",{stroke:"none",d:"M108 104a4 4 0 0 1-4 4H92v44a4 4 0 0 1-8 0v-44H72a4 4 0 0 1 0-8h32a4 4 0 0 1 4 4m120-11.26V152a36 36 0 0 1-35.44 36 60 60 0 0 1-113.13 0H40a12 12 0 0 1-12-12V80a12 12 0 0 1 12-12h62.07a36 36 0 0 1 66.48-27.36 28 28 0 0 1 35 43.36h15.69a8.75 8.75 0 0 1 8.76 8.74m-56.77-44.13A36 36 0 0 1 158.64 84H184a20 20 0 1 0-12.77-35.39M110.71 68H136a12 12 0 0 1 12 12v1.29A28 28 0 1 0 110.71 68M40 180h96a4 4 0 0 0 4-4V80a4 4 0 0 0-4-4H40a4 4 0 0 0-4 4v96a4 4 0 0 0 4 4m148-12V96a4 4 0 0 0-4-4h-36v84a12 12 0 0 1-12 12H88a52 52 0 0 0 100-20m32-75.26a.74.74 0 0 0-.74-.74h-24a11.8 11.8 0 0 1 .7 4v72a60.2 60.2 0 0 1-1.18 11.86A28 28 0 0 0 220 152Z"})});de.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const ce=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"white","aria-label":"CalendarCheckmarkRegular",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M14.5 3A2.5 2.5 0 0 1 17 5.5v4.1c-.32-.16-.65-.3-1-.4V7H4v7.5c0 .83.67 1.5 1.5 1.5h3.7c.1.35.24.68.4 1H5.5A2.5 2.5 0 0 1 3 14.5v-9A2.5 2.5 0 0 1 5.5 3zm0 1h-9C4.67 4 4 4.67 4 5.5V6h12v-.5c0-.83-.67-1.5-1.5-1.5M19 14.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0m-2.15-1.85a.5.5 0 0 0-.7 0l-2.65 2.64-.65-.64a.5.5 0 0 0-.7.7l1 1c.2.2.5.2.7 0l3-3a.5.5 0 0 0 0-.7"})});ce.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const le=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"white",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 2a5.92 5.92 0 0 1 5.98 5.36l.02.22v3.82l.92 2.22a1 1 0 0 1 .06.17l.01.08.01.13a1 1 0 0 1-.75.97l-.11.02L16 15h-3.5v.17a2.5 2.5 0 0 1-5 0V15H4a1 1 0 0 1-.26-.03l-.13-.04a1 1 0 0 1-.6-1.05l.02-.13.05-.13L4 11.4V7.57A5.9 5.9 0 0 1 10 2m1.5 13h-3v.15a1.5 1.5 0 0 0 1.36 1.34l.14.01c.78 0 1.42-.6 1.5-1.36zM10 3a4.9 4.9 0 0 0-4.98 4.38L5 7.6v3.9l-.04.2L4 14h12l-.96-2.3-.04-.2V7.61A4.9 4.9 0 0 0 10 3"})});le.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const he=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"white",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M1.91 7.38A8.5 8.5 0 0 1 3.7 4.3a.5.5 0 0 1 .54-.13l1.92.68a1 1 0 0 0 1.32-.76l.36-2a.5.5 0 0 1 .4-.4 8.5 8.5 0 0 1 3.55 0c.2.04.35.2.38.4l.37 2a1 1 0 0 0 1.32.76l1.92-.68a.5.5 0 0 1 .54.13 8.5 8.5 0 0 1 1.78 3.08c.06.2 0 .4-.15.54l-1.56 1.32a1 1 0 0 0 0 1.52l1.56 1.32a.5.5 0 0 1 .15.54 8.5 8.5 0 0 1-1.78 3.08.5.5 0 0 1-.54.13l-1.92-.68a1 1 0 0 0-1.32.76l-.37 2a.5.5 0 0 1-.38.4 8.5 8.5 0 0 1-3.56 0 .5.5 0 0 1-.39-.4l-.36-2a1 1 0 0 0-1.32-.76l-1.92.68a.5.5 0 0 1-.54-.13 8.5 8.5 0 0 1-1.78-3.08.5.5 0 0 1 .15-.54l1.56-1.32a1 1 0 0 0 0-1.52L2.06 7.92a.5.5 0 0 1-.15-.54m1.06 0 1.3 1.1a2 2 0 0 1 0 3.04l-1.3 1.1c.3.79.72 1.51 1.25 2.16l1.6-.58a2 2 0 0 1 2.63 1.53l.3 1.67a7.6 7.6 0 0 0 2.5 0l.3-1.67a2 2 0 0 1 2.64-1.53l1.6.58a7.5 7.5 0 0 0 1.24-2.16l-1.3-1.1a2 2 0 0 1 0-3.04l1.3-1.1a7.5 7.5 0 0 0-1.25-2.16l-1.6.58a2 2 0 0 1-2.63-1.53l-.3-1.67a7.6 7.6 0 0 0-2.5 0l-.3 1.67A2 2 0 0 1 5.81 5.8l-1.6-.58a7.5 7.5 0 0 0-1.24 2.16M7.5 10a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0m1 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0"})});he.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};function pe(){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1300",height:"1300",fill:"none",viewBox:"0 0 1300 1300",children:[e.jsx("path",{fill:"#F4DA92",d:"M650 1300C290.71 1300 0 1008.86 0 650 0 290.71 291.141 0 650 0c359.29 0 650 291.141 650 650 .43 359.29-290.71 650-650 650z"}),e.jsx("mask",{id:"mask0_32_1442",style:{maskType:"alpha"},width:"1301",height:"1300",x:"0",y:"0",maskUnits:"userSpaceOnUse",children:e.jsx("path",{fill:"#F7C0B5",d:"M650 1300C290.71 1300 0 1008.86 0 650 0 290.71 291.141 0 650 0c359.29 0 650 291.141 650 650 .43 359.29-290.71 650-650 650z"})}),e.jsxs("g",{mask:"url(#mask0_32_1442)",children:[e.jsx("path",{fill:"#FEE4BF",d:"M1015.73 1197.33c-3.03 2.17-6.5 4.33-9.53 6.5-3.47 2.17-6.502 4.33-9.969 6.07-3.033 1.73-5.633 3.46-8.667 5.2-.433.43-.866.43-1.299.86-9.967 6.07-20.367 11.7-30.767 16.9a96.314 96.314 0 01-9.533 4.77s-.434.43-.867.43c-3.467 1.74-6.933 3.47-10.4 5.2-6.933 3.47-14.3 6.5-21.233 9.54-3.467 1.73-7.367 3.03-10.834 4.33-3.466 1.3-7.366 3.03-10.833 4.33-3.467 1.3-7.367 3.04-10.833 4.34h-.434c-3.467 1.3-7.366 2.6-10.833 3.9-7.8 2.6-16.033 5.2-23.834 7.8-2.599.86-5.633 1.73-8.233 2.6a261.519 261.519 0 01-24.7 6.5c-3.033.86-6.067 1.3-9.533 2.16-7.8 1.74-16.034 3.47-23.834 5.2-1.733.44-3.033.44-4.766.87-2.6.43-5.633.87-8.234 1.3-3.899.43-7.366 1.3-11.266 1.73-1.733.44-3.467.44-5.2.87-2.167.43-4.767.87-7.367.87-6.933.86-14.3 1.73-21.233 2.6-2.167.43-4.767.43-6.933.86h-.434c-3.033.44-6.067.44-9.1.87-3.033.43-6.066.43-9.1.43-1.733 0-3.9.44-5.633.44-3.467 0-6.5.43-9.533.43-4.334 0-8.234.43-12.567.43h-21.667c-182.433-2.6-347.1-80.16-464.1-203.23 0 0 0-.43-.433-.43 13.433-26.44 63.267-74.1 115.267-113.536 65.866-49.833 159.033-80.599 159.033-80.599s61.1-9.967 287.733 37.266c172.9 36.4 246.567 184.169 271.699 252.199z"}),e.jsx("path",{fill:"#FEE4BF",d:"M792.131 1065.16c-9.1 44.64-68.033 71.07-167.267 31.2-121.766-49.4-168.566-188.495-168.566-188.495-6.5-99.667-21.667-185.034-21.667-185.034 140.834-12.133 307.233 152.534 307.233 152.534l19.067 81.466c1.733 6.933 5.2 13 10.4 17.334 9.1 15.599 26.867 62.395 20.8 90.995z"}),e.jsx("path",{fill:"#EFBDA5",d:"M771.331 974.598c-82.767-4.333-143.867-16.467-209.3-133.9 55.467 48.967 120.9 67.6 189.8 76.267l9.1 39.866c1.733 7.367 5.2 13.434 10.4 17.767z"}),e.jsx("path",{fill:"#FEE4BF",d:"M942.498 452.431c7.8 36.4 11.7 65.867-9.534 162.934-21.233 97.066 19.5 194.133-82.766 282.966-68.9 59.8-189.367 71.067-285.567 5.634-32.5-22.1-62.4-52.867-86.667-93.167-19.066-31.633-41.166-61.533-65.866-88.833-34.234-37.267-75.4-112.234-55.033-244.834 32.933-215.8 246.566-240.5 372.666-216.666 126.1 23.833 191.533 95.766 212.767 191.966z"}),e.jsx("path",{fill:"#FEE4BF",d:"M527.798 621.865s-13.433-65-76.7-57.2c-54.6 6.933-73.667 137.8 50.266 174.2"}),e.jsx("path",{stroke:"#423232",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"13.479",d:"M497.464 679.498s-15.6-9.967-13.866-27.3c2.6-20.367 0-32.933-9.533-36.833-23.834-9.967-28.6 17.766-27.734 21.233"}),e.jsx("path",{fill:"#EFBDA5",d:"M828.098 721.531s16.466.867 32.066-17.766c8.667-10.4 16.034-23.4 11.267-27.3-4.767-4.334-83.2 7.8-88.4 18.2-5.2 10.4 25.133 26.866 45.067 26.866z"}),e.jsx("path",{stroke:"#423232",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"13.479",d:"M841.098 575.931s.866 41.167 27.3 87.1c11.7 20.367-6.067 53.734-44.633 59.367"}),e.jsx("path",{fill:"#F2A5B2",d:"M606.231 743.631c24.651 0 44.634-16.491 44.634-36.833 0-20.343-19.983-36.833-44.634-36.833-24.65 0-44.633 16.49-44.633 36.833 0 20.342 19.983 36.833 44.633 36.833zM926.031 670.831c-1.3 24.267-.866 48.1-2.6 71.934-19.066-4.334-32.933-18.634-32.933-35.534 0-18.2 15.166-32.933 35.533-36.4z",opacity:"0.42"}),e.jsx("path",{fill:"#BEE3EB",d:"M1158.93 1465.49H63.462s6.5-201.07 72.367-344.5c49.833-108.34 167.266-168.569 254.8-199.769 24.7-8.667 47.233-15.167 64.566-19.934 0 2.167.434 3.9.434 6.067 0 0 46.8 139.096 168.566 188.496 99.234 40.3 158.167 13.44 167.267-31.2 5.633-28.6-12.133-75.396-21.233-90.563-5.2-4.333-8.667-10.833-10.4-17.333l-3.467-14.3c8.233-1.733 16.033-3.9 23.833-6.5 2.6-.867 4.767-1.733 7.367-2.6 55.9 14.733 139.966 49.833 239.198 133.036 112.24 93.6 132.17 399.1 132.17 399.1z"}),e.jsx("path",{fill:"#fff",d:"M586.495 1140.92c-149.5-67.17-207.567-187.199-196.3-219.699 0 0 0-.434.433-.867 7.8-16.033 20.367-29.033 35.967-38.133 8.666-5.2 18.2-9.967 26-12.567.433 6.066 2.166 25.133 2.6 31.633 0 2.167.433 3.9.433 6.067 0 0 27.733 103.566 149.5 152.966 99.233 40.3 160.767 13.87 167.267-31.2 7.366-49.833-20.8-85.8-20.8-85.8 8.233-1.733 21.233-4.766 29.033-7.366 19.067 22.967 38.567 45.933 45.933 106.596 10.4 87.1-85.366 168.14-240.066 98.37z"}),e.jsx("path",{stroke:"#544D4D",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"13.479",d:"M277.962 1465.49l-19.5-160.77M1034.56 1250.12s-13 31.63-9.1 63.27c3.9 31.63 15.17 78-.86 152.1"}),e.jsx("path",{fill:"#423232",d:"M683.943 619.439c-10.4-.433-18.2-9.1-17.333-19.5l.433-12.133c.433-10.4 9.1-18.2 19.5-17.334 10.4.434 18.2 9.1 17.333 19.5l-.433 12.134c-.433 9.966-9.1 17.766-19.5 17.333zM866.376 625.939c-9.533-.434-16.9-8.667-16.467-18.2l.434-11.267c.433-9.533 8.666-16.9 18.2-16.467 9.533.434 16.9 8.667 16.466 18.2l-.433 11.267c-.433 9.533-8.667 16.9-18.2 16.467z"}),e.jsx("path",{stroke:"#423232",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"13.479",d:"M725.977 594.305s-11.267-16.033-30.767-19.066c-16.033-2.6-33.8 5.2-36.4 14.3M853.81 598.206s0-13.867 19.933-13.867c16.467 0 23.4 15.167 23.4 15.167"}),e.jsx("path",{fill:"#423232",d:"M743.743 524.539c9.1 3.033 18.2-5.2 16.466-15.167-.866-5.2-3.033-10.4-7.366-14.3-13-11.7-66.734-22.1-99.234-6.933-28.6 13.866 48.534 22.533 90.134 36.4zM873.308 531.472c-7.366 2.6-15.167-5.2-13.867-14.3.434-4.766 2.167-9.533 5.634-13 10.4-10.4 45.933-18.633 68.467-2.6 19.5 13.434-26.434 17.334-60.234 29.9z"}),e.jsx("path",{stroke:"#423232",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"13.479",d:"M816.925 774.866c-11.232 4.942-16.623-4.942-34.145 3.594-12.581 5.841-19.32 7.638-34.596-1.348-9.884-6.29-22.015 2.696-33.696-14.377"}),e.jsx("path",{fill:"#423232",d:"M766.187 939.663c31.633-8.233 59.8-22.533 82.767-42.466 102.266-88.4 61.533-185.901 82.766-282.967 6.934-31.2 10.834-55.467 13.434-74.967-3.467-.433-7.367-.867-11.267-1.733-15.6-2.167-26-16.467-24.267-32.067.867-6.5 1.3-13 1.734-19.933-1.734-.434-1.3-.433-3.034-.433-2.6 8.233-5.633 16.899-7.8 25.133-3.9 13-16.466 21.233-29.466 20.367h-.434c-15.167-1.3-26.433-13.867-26.433-29.034.433-10.833.433-21.667.867-32.5-1.734-.433-.867 0-2.6-.433-2.167 11.266-4.334 22.533-6.5 34.233-2.601 14.3-15.167 24.267-29.467 23.4-37.267-1.733-74.1-2.166-107.467-2.166-14.733 0-26.866-10.834-28.166-25.567-2.167-19.067-5.2-38.134-10.4-57.634-5.634 17.334-5.634 35.534-4.767 54.167.867 16.033-11.7 29.467-27.733 29.9-38.567.867-64.567 2.167-68.9 2.6 1.3 59.367-12.134 125.233-35.967 80.6-1.733-3.033-3.033-6.067-4.767-9.967-9.966-17.766-29.9-39-67.6-34.233-52.866 6.933-72.366 129.567 38.567 170.3.433 9.1 2.6 18.2 6.5 27.733 16.9 41.167 24.267 75.4 24.267 103.567 0 163.367-267.367 95.333-342.767-52.867-29.033-57.633-29.467-126.966 25.567-199.766 134.766-165.1 94.466-102.267 124.366-200.2 48.967-160.334 160.767-211.467 308.967-210.167 0 0 246.567 0 312 59.8 65.433 59.8 42.9 246.567 37.266 263.467-1.733 5.2-6.066 8.233-10.833 10.4-2.6 85.366 6.067 115.266 36.4 184.166 66.3 151.667-58.933 295.964-244.833 219.267z"}),e.jsx("path",{fill:"#FEE4BF",d:"M523.087 608.596c-1.734-3.034-3.034-6.067-4.767-9.967 1.733 3.467 3.467 6.933 4.767 9.967z"}),e.jsx("path",{fill:"#B7AEA9",d:"M865.083 677.253s5.2 29.467 39.433 44.2c8.667 3.467 17.767-2.167 17.767-11.7-.433 0-55.033-29.033-57.2-32.5zM782.75 606.187s27.733-27.734 41.6-30.767l-36.834 8.666-4.766 22.101zM597.717 677.254s16.033 36.399 64.133 45.066c48.1 9.1 91.867-25.566 112.233-83.633 0 0-16.466 53.733-82.333 63.7-65.433 10.833-94.033-25.133-94.033-25.133z",opacity:"0.6"}),e.jsx("path",{fill:"#DBC3ED",d:"M675.283 482.687c-61.1 0-110.933 51.133-111.367 113.533 0 29.467 10.834 56.334 28.6 75.834l157.3-159.034c-19.5-19.066-45.5-30.333-74.533-30.333z",opacity:"0.29"}),e.jsx("path",{fill:"#C4ADD8",d:"M749.817 513.02l-157.3 159.034c19.933 22.1 48.1 35.533 79.3 35.533 60.233 0 109.633-49.833 111.366-111.8.867-32.5-12.133-61.967-33.366-82.767z",opacity:"0.23"}),e.jsx("path",{fill:"#DBC3ED",d:"M928.783 482.687c-46.367 0-85.367 51.133-87.1 113.533-.867 25.134 4.767 48.1 14.3 66.734L993.35 526.887c-14.3-26.867-37.7-44.2-64.567-44.2z",opacity:"0.29"}),e.jsx("path",{fill:"#C4ADD8",d:"M993.349 526.453L855.983 662.52c14.3 27.3 37.7 45.066 65 45.066 45.5 0 84.497-49.833 87.097-111.8.87-25.566-4.76-49.833-14.731-69.333z",opacity:"0.23"}),e.jsx("path",{stroke:"#4EC2DD",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"13.479",d:"M783.183 596.22c-1.3 61.967-51.134 111.8-111.367 111.8-60.233 0-108.333-49.833-108.333-111.8.433-62.4 50.266-113.533 111.366-113.533S784.916 533.82 783.183 596.22zM1008.08 596.22c-2.6 61.967-41.597 111.8-87.097 111.8-45.5 0-81.033-49.833-79.3-111.8 1.733-62.4 40.733-113.533 87.1-113.533s81.897 51.133 79.297 113.533zM564.783 584.086H503.25M783.616 584.086s51.567-19.933 58.067 0"})]})]})}pe.__docgenInfo={description:"",methods:[],displayName:"Icon"};const xe=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"white",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M6.25 10a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0m5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0M15 11.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"})});xe.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const ue=()=>e.jsxs(Ot,{children:[e.jsxs(v,{hide:"second",children:[e.jsx(re,{}),e.jsx("span",{children:"Meet Now"})]}),e.jsx(v,{hide:"first",children:e.jsx(de,{})}),e.jsx(v,{hide:"first",children:e.jsx(ce,{})}),e.jsx(v,{hide:"first",children:e.jsx(le,{})}),e.jsx(v,{hide:"first",children:e.jsx(he,{})}),e.jsx(v,{hide:"desktop",children:e.jsx(xe,{})}),e.jsx(v,{hide:"never",children:e.jsx($t,{children:e.jsx(pe,{})})})]}),$t=a.div`
  width: 32px;
  height: 32px;
  
  > svg {
    width: 32px;
    height: 32px; 
  }
`,Ot=a.div`
  display: flex;
`;ue.__docgenInfo={description:"",methods:[],displayName:"Right"};const fe=({})=>e.jsxs(At,{children:[e.jsxs(Nt,{children:[e.jsx(Ht,{children:e.jsx(oe,{})}),e.jsx(Et,{children:"Outlook"})]}),e.jsx(Ct,{}),e.jsx(ue,{})]}),At=a.div`
  width: 100%;
  background: #0F6CBD;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media(max-width: ${t=>t.theme.breakpoints.xs}) {
    display: none;
  }
`,Nt=a.div`
  display: flex;
  align-items: center;
`,Ht=a.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  cursor: pointer;

  &:hover {
    background: #0C3B5E;
  }
`,Et=a.div`
  font-weight: 600;
  color: white;
  font-size: 16px;
  line-height: 48px;
  padding: 0 12px 0 8px;
`;fe.__docgenInfo={description:"",methods:[],displayName:"BlueHeader"};const _=({children:t,selected:n})=>e.jsx(Dt,{$selected:n,children:t}),Dt=a.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
  gap: 9px;
  border-radius: 4px;

  &:hover {
    background: #f5f5f5;
  }
    
  ${t=>t.$selected&&`
    background: #f5f5f5;
    &:before {
      content: ' ';
      height: 22px;
      width: 1.4px;
      margin-left: -1px;
      background: #0F6CBD;
      border-radius: 4px;
      margin-left: -10px;
    }
  `}
`;_.__docgenInfo={description:"",methods:[],displayName:"Button",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},selected:{required:!0,tsType:{name:"boolean"},description:""}}};const ge=()=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg","aria-label":"MailColor",viewBox:"0 0 20 20",children:[e.jsx("path",{fill:"#367AF2",d:"M2.76 6.07A.5.5 0 0 0 2 6.5v8A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-8a.5.5 0 0 0-.76-.43L10 10.42z"}),e.jsx("path",{fill:"url(#ic_fluent_mail_20_color__a)",d:"M2.76 6.07A.5.5 0 0 0 2 6.5v8A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-8a.5.5 0 0 0-.76-.43L10 10.42z"}),e.jsx("path",{fill:"url(#ic_fluent_mail_20_color__b)",d:"M2.76 6.07A.5.5 0 0 0 2 6.5v8A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-8a.5.5 0 0 0-.76-.43L10 10.42z"}),e.jsx("path",{fill:"url(#ic_fluent_mail_20_color__c)",fillOpacity:"0.75",d:"M2.76 6.07A.5.5 0 0 0 2 6.5v8A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-8a.5.5 0 0 0-.76-.43L10 10.42z"}),e.jsx("path",{fill:"url(#ic_fluent_mail_20_color__d)",fillOpacity:"0.7",d:"M2.76 6.07A.5.5 0 0 0 2 6.5v8A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-8a.5.5 0 0 0-.76-.43L10 10.42z"}),e.jsx("path",{fill:"url(#ic_fluent_mail_20_color__e)",d:"M4.5 4A2.5 2.5 0 0 0 2 6.5v.6c0 .18.1.34.25.43l7.5 4.4c.15.1.35.1.5 0l7.5-4.4A.5.5 0 0 0 18 7.1v-.6A2.5 2.5 0 0 0 15.5 4z"}),e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"ic_fluent_mail_20_color__a",x1:"12.03",x2:"16.92",y1:"8.16",y2:"16.62",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{offset:"0.23",stopColor:"#0094F0",stopOpacity:"0"}),e.jsx("stop",{offset:"0.43",stopColor:"#0094F0"})]}),e.jsxs("linearGradient",{id:"ic_fluent_mail_20_color__b",x1:"7.71",x2:"2.27",y1:"7.16",y2:"17.13",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{offset:"0.23",stopColor:"#0094F0",stopOpacity:"0"}),e.jsx("stop",{offset:"0.43",stopColor:"#0094F0"})]}),e.jsxs("linearGradient",{id:"ic_fluent_mail_20_color__c",x1:"14.22",x2:"15.06",y1:"12.56",y2:"17.99",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#2764E7",stopOpacity:"0"}),e.jsx("stop",{offset:"1",stopColor:"#2764E7"})]}),e.jsxs("linearGradient",{id:"ic_fluent_mail_20_color__d",x1:"12.48",x2:"14.01",y1:"7.35",y2:"18.41",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{offset:"0.53",stopColor:"#FF6CE8",stopOpacity:"0"}),e.jsx("stop",{offset:"1",stopColor:"#FF6CE8"})]}),e.jsxs("linearGradient",{id:"ic_fluent_mail_20_color__e",x1:"6.75",x2:"12.39",y1:"1.51",y2:"15.12",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#6CE0FF"}),e.jsx("stop",{offset:"0.46",stopColor:"#29C3FF"}),e.jsx("stop",{offset:"1",stopColor:"#4894FE"})]})]})]});ge.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const me=()=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"___1okpztj f1w7gpdv fez10in fg4l7m0 f16hsg94 fwpfdsa f88nxoq f1e2fz10",viewBox:"0 0 20 20",children:[e.jsx("path",{fill:"url(#ic_fluent_calendar_20_color__a)",d:"M17 6H3v8.5A2.5 2.5 0 0 0 5.5 17h9a2.5 2.5 0 0 0 2.5-2.5z"}),e.jsx("path",{fill:"url(#ic_fluent_calendar_20_color__b)",d:"M17 6H3v8.5A2.5 2.5 0 0 0 5.5 17h9a2.5 2.5 0 0 0 2.5-2.5z"}),e.jsxs("g",{filter:"url(#ic_fluent_calendar_20_color__c)",children:[e.jsx("path",{fill:"url(#ic_fluent_calendar_20_color__d)",d:"M8 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0"}),e.jsx("path",{fill:"url(#ic_fluent_calendar_20_color__e)",d:"M8 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0"}),e.jsx("path",{fill:"url(#ic_fluent_calendar_20_color__f)",d:"M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0"}),e.jsx("path",{fill:"url(#ic_fluent_calendar_20_color__g)",d:"M10 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2"}),e.jsx("path",{fill:"url(#ic_fluent_calendar_20_color__h)",d:"M14 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0"})]}),e.jsx("path",{fill:"url(#ic_fluent_calendar_20_color__i)",d:"M17 5.5A2.5 2.5 0 0 0 14.5 3h-9A2.5 2.5 0 0 0 3 5.5V7h14z"}),e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"ic_fluent_calendar_20_color__a",x1:"12.53",x2:"8.5",y1:"18.35",y2:"6.56",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#B3E0FF"}),e.jsx("stop",{offset:"1",stopColor:"#B3E0FF"})]}),e.jsxs("linearGradient",{id:"ic_fluent_calendar_20_color__b",x1:"11.5",x2:"13.5",y1:"10.5",y2:"19.5",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#DCF8FF",stopOpacity:"0"}),e.jsx("stop",{offset:"1",stopColor:"#FF6CE8",stopOpacity:"0.7"})]}),e.jsxs("linearGradient",{id:"ic_fluent_calendar_20_color__d",x1:"9.27",x2:"10.91",y1:"8.42",y2:"18.39",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#0078D4"}),e.jsx("stop",{offset:"1",stopColor:"#0067BF"})]}),e.jsxs("linearGradient",{id:"ic_fluent_calendar_20_color__e",x1:"9.27",x2:"10.91",y1:"8.42",y2:"18.39",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#0078D4"}),e.jsx("stop",{offset:"1",stopColor:"#0067BF"})]}),e.jsxs("linearGradient",{id:"ic_fluent_calendar_20_color__f",x1:"9.27",x2:"10.91",y1:"8.42",y2:"18.39",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#0078D4"}),e.jsx("stop",{offset:"1",stopColor:"#0067BF"})]}),e.jsxs("linearGradient",{id:"ic_fluent_calendar_20_color__g",x1:"9.27",x2:"10.91",y1:"8.42",y2:"18.39",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#0078D4"}),e.jsx("stop",{offset:"1",stopColor:"#0067BF"})]}),e.jsxs("linearGradient",{id:"ic_fluent_calendar_20_color__h",x1:"9.27",x2:"10.91",y1:"8.42",y2:"18.39",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#0078D4"}),e.jsx("stop",{offset:"1",stopColor:"#0067BF"})]}),e.jsxs("linearGradient",{id:"ic_fluent_calendar_20_color__i",x1:"3",x2:"15.02",y1:"3",y2:"-0.77",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#0094F0"}),e.jsx("stop",{offset:"1",stopColor:"#2764E7"})]}),e.jsxs("filter",{id:"ic_fluent_calendar_20_color__c",width:"10.67",height:"7.67",x:"4.67",y:"8.33",colorInterpolationFilters:"sRGB",filterUnits:"userSpaceOnUse",children:[e.jsx("feFlood",{floodOpacity:"0",result:"BackgroundImageFix"}),e.jsx("feColorMatrix",{in:"SourceAlpha",result:"hardAlpha",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),e.jsx("feOffset",{dy:"0.67"}),e.jsx("feGaussianBlur",{stdDeviation:"0.67"}),e.jsx("feColorMatrix",{values:"0 0 0 0 0.1242 0 0 0 0 0.323337 0 0 0 0 0.7958 0 0 0 0.32 0"}),e.jsx("feBlend",{in2:"BackgroundImageFix",result:"effect1_dropShadow_378174_9787"}),e.jsx("feBlend",{in:"SourceGraphic",in2:"effect1_dropShadow_378174_9787",result:"shape"})]})]})]});me.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const we=()=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",viewBox:"0 0 20 20",children:[e.jsx("path",{fill:"url(#ic_fluent_people_community_20_color__a)",d:"M13.06 9.49a1.5 1.5 0 0 0-1.84 1.06l-.64 2.42a4 4 0 0 0 7.73 2.07l.64-2.42a1.5 1.5 0 0 0-1.06-1.84L13.06 9.5Z"}),e.jsx("path",{fill:"url(#ic_fluent_people_community_20_color__b)",d:"M6.94 9.49a1.5 1.5 0 0 1 1.84 1.06l.65 2.42a4 4 0 1 1-7.73 2.07l-.65-2.42a1.5 1.5 0 0 1 1.06-1.84L6.94 9.5Z"}),e.jsx("path",{fill:"url(#ic_fluent_people_community_20_color__c)",d:"M10 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6"}),e.jsx("path",{fill:"url(#ic_fluent_people_community_20_color__d)",d:"M16.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"}),e.jsx("path",{fill:"url(#ic_fluent_people_community_20_color__e)",d:"M3.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"}),e.jsx("path",{fill:"url(#ic_fluent_people_community_20_color__f)",d:"M7.5 9C6.67 9 6 9.67 6 10.5V14a4 4 0 0 0 8 0v-3.5c0-.83-.67-1.5-1.5-1.5z"}),e.jsxs("defs",{children:[e.jsxs("radialGradient",{id:"ic_fluent_people_community_20_color__a",cx:"0",cy:"0",r:"1",gradientTransform:"rotate(78.84 -.53 14.04)scale(6.28119)",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#0078D4"}),e.jsx("stop",{offset:"1",stopColor:"#004695"})]}),e.jsxs("radialGradient",{id:"ic_fluent_people_community_20_color__b",cx:"0",cy:"0",r:"1",gradientTransform:"rotate(61.06 -6.8 7.55)scale(9.32732 6.71383)",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#008CE2"}),e.jsx("stop",{offset:"1",stopColor:"#0068C6"})]}),e.jsxs("radialGradient",{id:"ic_fluent_people_community_20_color__c",cx:"0",cy:"0",r:"1",gradientTransform:"rotate(59.93 1.15 10.22)scale(3.74767)",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{offset:"0.34",stopColor:"#3DCBFF"}),e.jsx("stop",{offset:"1",stopColor:"#14B1FF"})]}),e.jsxs("radialGradient",{id:"ic_fluent_people_community_20_color__d",cx:"0",cy:"0",r:"1",gradientTransform:"rotate(78.84 4.56 12.25)scale(3.66754)",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#0078D4"}),e.jsx("stop",{offset:"1",stopColor:"#004695"})]}),e.jsxs("radialGradient",{id:"ic_fluent_people_community_20_color__e",cx:"0",cy:"0",r:"1",gradientTransform:"rotate(47.57 -5.03 5.53)scale(4.09974)",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#008CE2"}),e.jsx("stop",{offset:"1",stopColor:"#0068C6"})]}),e.jsxs("radialGradient",{id:"ic_fluent_people_community_20_color__f",cx:"0",cy:"0",r:"1",gradientTransform:"rotate(62.77 -5.35 13.64)scale(5.47141 5.13397)",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{offset:"0.34",stopColor:"#3DCBFF"}),e.jsx("stop",{offset:"1",stopColor:"#14B1FF"})]})]})]});we.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const ve=()=>e.jsx(e.Fragment,{children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:e.jsx("g",{id:"Word",children:e.jsxs("g",{id:"_24","data-name":"24",children:[e.jsx("path",{d:"M0 0h24v24H0z",style:{fill:"none"}}),e.jsx("path",{d:"M24 7V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5l9 2Z",style:{fill:"#41a5ee"}}),e.jsx("path",{d:"M24 7H6v5l9.5 2 8.5-2V7z",style:{fill:"#2b7cd3"}}),e.jsx("path",{d:"M24 12H6v5l9 1.5 9-1.5v-5z",style:{fill:"#185abd"}}),e.jsx("path",{d:"M6 17h18v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5Z",style:{fill:"#103f91"}}),e.jsx("path",{d:"M13.83 6H6v14h7.6a1.5 1.5 0 0 0 1.4-1.35V7.17A1.18 1.18 0 0 0 13.83 6Z",style:{opacity:".5"}}),e.jsx("rect",{id:"Back_Plate",width:"14",height:"14",y:"5",style:{fill:"#185abd"},"data-name":"Back Plate",rx:"1.17"}),e.jsx("path",{id:"Letter",d:"M10.16 16H8.72L7 10.48 5.28 16H3.84l-1.6-8h1.44l1.12 5.6 1.68-5.44h1.2l1.6 5.44L10.4 8h1.36Z",style:{fill:"#fff"}})]})})})});ve.__docgenInfo={description:"",methods:[],displayName:"WordColor"};const je=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:e.jsx("g",{id:"Excel",children:e.jsxs("g",{id:"_24","data-name":"24",children:[e.jsx("path",{d:"M16 1H7a1 1 0 0 0-1 1v5l10 5 4 1.5 4-1.5V7Z",style:{fill:"#21a366"}}),e.jsx("path",{d:"M0 0h24v24H0z",style:{fill:"none"}}),e.jsx("path",{d:"M6 7.02h10V12H6z",style:{fill:"#107c41"}}),e.jsx("path",{d:"M24 2v5h-8V1h7a1 1 0 0 1 1 1Z",style:{fill:"#33c481"}}),e.jsx("path",{d:"M16 12H6v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-5Z",style:{fill:"#185c37"}}),e.jsx("path",{d:"M13.83 6H6v14h7.6a1.5 1.5 0 0 0 1.4-1.35V7.17A1.18 1.18 0 0 0 13.83 6Z",style:{opacity:".5"}}),e.jsx("rect",{id:"Back_Plate",width:"14",height:"14",y:"5","data-name":"Back Plate",rx:"1.17",style:{fill:"#107c41"}}),e.jsx("path",{d:"M3.43 16 6 12 3.64 8h1.91l1.3 2.55a4.63 4.63 0 0 1 .24.54 5.77 5.77 0 0 1 .27-.56L8.76 8h1.75l-2.43 4 2.49 4H8.71l-1.5-2.8a2.14 2.14 0 0 1-.21-.37 1.54 1.54 0 0 1-.17.36L5.3 16Z",style:{fill:"#fff"}}),e.jsx("path",{d:"M16 12h8v5h-8z",style:{fill:"#107c41"}})]})})});je.__docgenInfo={description:"",methods:[],displayName:"ExcelColor"};const ye=()=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[e.jsx("path",{fill:"none",d:"M0 0h24v24H0z"}),e.jsx("path",{fill:"#ed6c47",d:"M13 1A11 11 0 0 0 2 12l14.84 3.84Z"}),e.jsx("path",{fill:"#ff8f6b",d:"M13 1a11 11 0 0 1 11 11l-5.5 3-5.5-3Z"}),e.jsx("path",{fill:"#d35230",d:"M2 12a11 11 0 0 0 22 0Z"}),e.jsx("path",{d:"M15 18.65V7.17A1.18 1.18 0 0 0 13.83 6H3.8a10.91 10.91 0 0 0 1.69 14h8.11a1.5 1.5 0 0 0 1.4-1.35",opacity:"0.5"}),e.jsx("path",{d:"M15 18.65V7.17A1.18 1.18 0 0 0 13.83 6H3.8a10.91 10.91 0 0 0 1.69 14h8.11a1.5 1.5 0 0 0 1.4-1.35",opacity:"0.1"}),e.jsx("rect",{width:"14",height:"14",y:"5",fill:"#c43e1c","data-name":"Back Plate",rx:"1.17"}),e.jsx("path",{fill:"#fff",d:"M7.4 8a3.32 3.32 0 0 1 2.2.64 2.32 2.32 0 0 1 .76 1.86 3.4 3.4 0 0 1-.36 1.61 2.54 2.54 0 0 1-1.07 1 3.7 3.7 0 0 1-1.61.34H5.78V16H4.22V8Zm-1.62 4h1.34a1.78 1.78 0 0 0 1.19-.35 1.46 1.46 0 0 0 .4-1.1c0-.88-.51-1.32-1.54-1.32H5.78Z"})]});ye.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const _e=({})=>e.jsxs(Wt,{children:[e.jsx(_,{selected:!0,children:e.jsx(M,{children:e.jsx(ge,{})})}),e.jsx(_,{selected:!1,children:e.jsx(M,{children:e.jsx(me,{})})}),e.jsx(_,{selected:!1,children:e.jsx(M,{children:e.jsx(we,{})})}),e.jsx(_,{selected:!1,children:e.jsx(M,{children:e.jsx(ve,{})})}),e.jsx(_,{selected:!1,children:e.jsx(M,{children:e.jsx(je,{})})}),e.jsx(_,{selected:!1,children:e.jsx(M,{children:e.jsx(ye,{})})})]}),Wt=a.div`
  padding-top: 4px;
  background: #F0F0F0;
  height: 100%;
  width: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-right: 4px;

  @media(max-width: ${t=>t.theme.breakpoints.md}) {
    display: none;
  }
`,M=a.div`
  width: 20px;
  height: 20px;
`;_e.__docgenInfo={description:"",methods:[],displayName:"Sidebar"};const be=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"21",height:"21",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M2 4.5c0-.28.22-.5.5-.5h15a.5.5 0 0 1 0 1h-15a.5.5 0 0 1-.5-.5m0 5c0-.28.22-.5.5-.5h15a.5.5 0 0 1 0 1h-15a.5.5 0 0 1-.5-.5m.5 4.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1z"})});be.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const O=({children:t,selected:n})=>e.jsx(Tt,{$selected:n,children:e.jsx(Lt,{children:t})}),Tt=a.div`  
  width: 69px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${t=>t.$selected&&`    
    &:after {
      transition: width 0.5s;
      content: ' ';  
      border-radius: 4px;
      width: 38px;
      height: 2px;
      background: #0F6CBD;
    }
    
    &:hover {
      &:after {
        width: 69px;
      }
    }
  `}

  &:hover {
    background: #F0F0F0;  
  }
`,Lt=a.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;

  > span {
    font-weight: 300;
    font-size: 14px;
  }

  &:hover {    
    > span {
     font-weight: 600;
    }
  }

`;O.__docgenInfo={description:"",methods:[],displayName:"NavigationButton",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},selected:{required:!0,tsType:{name:"boolean"},description:""}}};const Me=()=>e.jsxs(Pt,{children:[e.jsx(Vt,{children:e.jsx(be,{})}),e.jsx(O,{selected:!0,children:e.jsx("span",{children:"Home"})}),e.jsx(O,{selected:!1,children:e.jsx("span",{children:"View"})}),e.jsx(O,{selected:!1,children:e.jsx("span",{children:"Help"})})]}),Pt=a.div`
  width: 100%;
  height: 34px;
  
  display: flex;
  align-items: center;

  @media(max-width: ${t=>t.theme.breakpoints.xs}) {
    display: none;
  }
`,Vt=a.div`
  margin-left: 4px;
  cursor: pointer;
  height: 34px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F0F0F0
  }
`;Me.__docgenInfo={description:"",methods:[],displayName:"TopSectionBar"};const Se=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 20 20",fill:"white",children:e.jsx("path",{d:"M11.5 3a.5.5 0 0 1 0 1H6a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V8.5a.5.5 0 0 1 1 0V14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm5.65-.85a.5.5 0 1 1 .7.7l-8 8L9 11l.15-.85z"})});Se.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const $=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"white",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z"})});$.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const ke=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#616161",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M8.5 4h3a1.5 1.5 0 0 0-3 0m-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.05l-1.2 10.34A3 3 0 0 1 12.27 18H7.73a3 3 0 0 1-2.98-2.66L3.55 5H2.5a.5.5 0 0 1 0-1zM5.74 15.23A2 2 0 0 0 7.73 17h4.54a2 2 0 0 0 1.99-1.77L15.44 5H4.56zM8.5 7.5c.28 0 .5.22.5.5v6a.5.5 0 0 1-1 0V8c0-.28.22-.5.5-.5M12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"})});ke.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Ie=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#498205",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M8.5 10a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM2 4.75C2 3.78 2.78 3 3.75 3h12.5c.97 0 1.75.78 1.75 1.75v1.5c0 .7-.4 1.3-1 1.58V14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7.83c-.6-.28-1-.88-1-1.58zM3.75 4a.75.75 0 0 0-.75.75v1.5c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75v-1.5a.75.75 0 0 0-.75-.75zM4 8v6c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V8z"})});Ie.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Ce=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#a4262c",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 6c.28 0 .5.22.5.5v5a.5.5 0 0 1-1 0v-5c0-.28.22-.5.5-.5m0 8.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M9.72 2.08a.5.5 0 0 1 .56 0c1.94 1.3 4.03 2.1 6.3 2.43A.5.5 0 0 1 17 5v4.5c0 3.9-2.3 6.73-6.82 8.47a.5.5 0 0 1-.36 0C5.31 16.23 3 13.39 3 9.5V5a.5.5 0 0 1 .43-.5 15.05 15.05 0 0 0 6.3-2.42ZM9.6 3.35A16 16 0 0 1 4 5.43V9.5c0 3.4 1.97 5.86 6 7.46 4.03-1.6 6-4.07 6-7.46V5.43a16 16 0 0 1-5.6-2.08L10 3.1z"})});Ce.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const ze=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#0078d4",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M4.5 3A2.5 2.5 0 0 0 2 5.5v9A2.5 2.5 0 0 0 4.5 17h5.1c-.16-.32-.3-.65-.4-1H4.5A1.5 1.5 0 0 1 3 14.5V8h4.09c.4 0 .78-.16 1.06-.44L9.7 6h5.79c.83 0 1.5.67 1.5 1.5v2.1c.36.18.7.4 1 .66V7.5A2.5 2.5 0 0 0 15.5 5H9.7L8.23 3.51A1.75 1.75 0 0 0 6.98 3zM3 5.5C3 4.67 3.67 4 4.5 4h2.48c.2 0 .4.08.53.22L8.8 5.5 7.44 6.85a.5.5 0 0 1-.35.15H3zM14.5 10a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9m2.35 4.85a.5.5 0 0 0 .15-.35.5.5 0 0 0-.15-.35l-2-2a.5.5 0 0 0-.7.7L15.29 14H12.5a.5.5 0 0 0 0 1h2.8l-1.15 1.15a.5.5 0 0 0 .7.7z"})});ze.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Be=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M7.35 3.65c.2.2.2.5 0 .7L3.71 8h6.79a7.5 7.5 0 0 1 7.5 7.5.5.5 0 0 1-1 0A6.5 6.5 0 0 0 10.5 9H3.7l3.65 3.65a.5.5 0 0 1-.7.7l-4.5-4.5a.5.5 0 0 1 0-.7l4.5-4.5c.2-.2.5-.2.7 0"})});Be.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Fe=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#616161",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M9.74 2.07a.5.5 0 0 1 .52 0l6.77 4.06A2 2 0 0 1 18 7.85v6.65a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 14.5V7.85a2 2 0 0 1 .97-1.72zM10 3.08 3.49 7h-.02L10 10.92 16.53 7h-.02L10 3.07Zm7 4.8-6.74 4.05a.5.5 0 0 1-.52 0L3 7.88v6.62c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5z"})});Fe.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const $e=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#a4262c",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M5 13h11.5a.5.5 0 0 0 .42-.78L14.1 8l2.82-4.22A.5.5 0 0 0 16.5 3h-12a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 1 0zm0-1V4h10.57l-2.49 3.72a.5.5 0 0 0 0 .56L15.57 12z"})});$e.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Oe=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#e0e0e0",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M5 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm3 0H6v2h2zm-3 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm3 0H6v2h2zm4-7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm0 1h2v2h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v2h2zM5 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zM3 5c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"})});Oe.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Ae=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M5 2.5a.5.5 0 0 0-1 0v4.9c0 .33.27.6.6.6h4.9a.5.5 0 0 0 0-1H5.9l3.48-3.02a4 4 0 0 1 5.25 6.04l-8.17 7.1a.5.5 0 0 0 .65.76l8.17-7.1a5 5 0 0 0-6.56-7.55L5 6.46z"})});Ae.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Ne=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#616161",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4M7 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m-1.95 5c-.03.16-.05.33-.05.5v.54l-2.63.71a.5.5 0 0 0-.35.61l.64 2.42a3 3 0 0 0 3.32 2.2c.23.3.5.58.79.83l-.17.05a4 4 0 0 1-4.9-2.82l-.65-2.42a1.5 1.5 0 0 1 1.06-1.84zM15 11.04v-.54c0-.17-.02-.34-.05-.5l2.94.78a1.5 1.5 0 0 1 1.06 1.84l-.64 2.42a4 4 0 0 1-5.07 2.77q.435-.375.78-.84a3 3 0 0 0 3.32-2.2l.65-2.4a.5.5 0 0 0-.36-.62l-2.63-.7Zm0-4.54a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M16.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m-13 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M1 6.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0M7.5 9C6.67 9 6 9.67 6 10.5V14a4 4 0 0 0 8 0v-3.5c0-.83-.67-1.5-1.5-1.5zM7 10.5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5V14a3 3 0 1 1-6 0z"})});Ne.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const j=({children:t,chevron:n,icon:i,hide:o})=>e.jsxs(qt,{hide:o,children:[e.jsxs(Yt,{hide:o,hasChevron:n,children:[e.jsx(Rt,{children:i}),e.jsx("span",{children:t})]}),n&&e.jsx(Ut,{children:e.jsx($,{})})]}),qt=a.div`
  height: 32px;
  display: flex;
  
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;

  &:hover {
    border-color: #e5e5e5;
  }
`,Yt=a.div`
  box-sizing: border-box;
  border-right: 1px solid transparent;
  padding: 1px 9px;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;

  > span {
    color: #242424;
    margin-left: 6px;
    font-size: 14px;
    font-weight: 300;
    padding-bottom: 1px; 
  }

  &:hover {
    background-color: #fafafa;
  }

  ${t=>t.hasChevron&&`
    border-radius: 4px 0 0 4px;
    padding: 1px 6px 1px 9px;

    &:hover {
      border-color: #e5e5e5;  
    }
  `}

  @media(max-width: ${t=>t.theme.breakpoints.lg}) {
    ${t=>t.hide==="first"&&`
      > span {
        display: none; 
      }
    `}
  }

  @media(max-width: ${t=>t.theme.breakpoints.md}) {
    ${t=>t.hide==="second"&&`
      > span {
        display: none; 
      }
    `}
  }
  
`,Rt=a.div`
  width: 20px;
  height: 20px;
  
  > svg {
    width: 20px;
    height: 20px;
  }
`,Ut=a.div`
  box-sizing: border-box;
  border-radius: 0 4px 4px 0;
  border: 1px solid transparent;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 2px;

  > svg {
    width: 12px;
    height: 12px;
    fill: #242424;
  }

  &:hover {
    background-color: #f0f0f0;  
  }
`;j.__docgenInfo={description:"",methods:[],displayName:"ActionButton",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},chevron:{required:!0,tsType:{name:"boolean"},description:""},icon:{required:!0,tsType:{name:"ReactNode"},description:""},hide:{required:!1,tsType:{name:"string"},description:""}}};const He=a.div`
  width: 100%;
  height: 40px;
  background: #fff;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14);
  display: flex;
  align-items: center;
`,Ee=()=>e.jsxs(Gt,{children:[e.jsxs(Qt,{children:[e.jsxs(Xt,{children:[e.jsx(Se,{}),e.jsx("span",{children:"New mail"})]}),e.jsx(Jt,{children:e.jsx($,{})})]}),e.jsxs(y,{children:[e.jsx(j,{icon:e.jsx(ke,{}),chevron:!0,hide:"second",children:"Delete"}),e.jsx(j,{icon:e.jsx(Ie,{}),chevron:!1,hide:"second",children:"Archive"}),e.jsx(j,{icon:e.jsx(Ce,{}),chevron:!0,hide:"second",children:"Report"})]}),e.jsxs(y,{hide:"third",children:[e.jsx(j,{icon:e.jsx(ze,{}),chevron:!0,hide:"second",children:"Move to"}),e.jsx(C,{})]}),e.jsxs(y,{hide:"third",children:[e.jsxs(U,{children:[e.jsx(Be,{}),e.jsx("span",{children:"Reply"})]}),e.jsx(C,{})]}),e.jsxs(y,{hide:"second",children:[e.jsx(j,{icon:e.jsx(Fe,{}),chevron:!1,hide:"first",children:"Read / Unread"}),e.jsx(j,{hide:"first",icon:e.jsx($e,{}),chevron:!0,children:"Flag / Unflag"})]}),e.jsxs(y,{hide:"second",children:[e.jsx(C,{}),e.jsx(Zt,{children:e.jsx(Oe,{})}),e.jsx(C,{})]}),e.jsxs(y,{hide:"first",children:[e.jsx(j,{hide:"first",icon:e.jsx(Ne,{}),chevron:!1,children:"Discover groups"}),e.jsx(C,{})]}),e.jsx(y,{hide:"third",children:e.jsxs(U,{children:[e.jsx(Ae,{}),e.jsx("span",{children:"Undo"})]})})]}),Gt=a(He)`
  margin-top: 4px;
  @media(max-width: ${t=>t.theme.breakpoints.xs}) {
    display: none;
  }
`,y=a.div`
  display: flex;
  align-items: center;

  @media(max-width: ${t=>t.theme.breakpoints.lg}) {
    ${t=>t.hide==="first"&&`
      display: none;
    `}    
  }

  @media(max-width: ${t=>t.theme.breakpoints.md}) {
    ${t=>t.hide==="second"&&`
      display: none;
    `}    
  }

  @media(max-width: 620px) {
    ${t=>t.hide==="third"&&`
      display: none;
    `}    
  }
`,C=a.div`
  height: 32px;
  width: 1px;
  background-color: #E0E0E0;
  margin: 0 2px;
`,U=a.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 18px;

  > svg {
    opacity: 0.4;
    fill: rgb(136, 23, 152); 
  }

  > span {
    font-weight: 400;
    font-size: 14px;
    color: #e0e0e0; 
    padding-bottom: 1px;
  }

  @media(max-width: ${t=>t.theme.breakpoints.lg}) {
    > span {
      display: none; 
    }
  }

  @media(max-width: ${t=>t.theme.breakpoints.sm}) {
    }
`,Zt=a.div`
  display: flex;
  align-items: center;
  padding: 0 14px;
`,Qt=a.div`
  display: flex;
  height: 32px;
  cursor: pointer;
  padding-right: 4px;
`,Xt=a.div`
  display: flex;
  align-items: center;
  height: 32px;
  background: #0F6CBD;
  border-radius: 4px 0 0 4px;
  display: flex;
  align-items: center;
  border-right: 1px solid white;
  padding: 0 9px 0 9px;
  color: white;

  > span {
    padding-left: 10px; 
    padding-right: 2px;
    font-size: 14px;
    font-weight: 300;
    padding-bottom: 1px;
  }

  &:hover {
    background: #0F548C;
  }
`,Jt=a.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  background: #0F6CBD;
  border-radius: 0 4px 4px 0;

  &:hover {
    background: #0F548C;
  }
`;Ee.__docgenInfo={description:"",methods:[],displayName:"MainActionBar"};const De=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 20 20",children:e.jsx("path",{d:"m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07z"})});De.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const W=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M12.35 15.85a.5.5 0 0 1-.7 0L6.16 10.4a.55.55 0 0 1 0-.78l5.49-5.46a.5.5 0 1 1 .7.7L7.2 10l5.16 5.15c.2.2.2.5 0 .7Z"})});W.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const We=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M7.65 4.15c.2-.2.5-.2.7 0l5.49 5.46c.21.22.21.57 0 .78l-5.49 5.46a.5.5 0 0 1-.7-.7L12.8 10 7.65 4.85a.5.5 0 0 1 0-.7"})});We.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Kt=t=>t&&t.length>0?t:"(no subject)",Te=({subject:t})=>{if(t)return e.jsxs(e.Fragment,{children:[e.jsx(o0,{children:e.jsx(W,{})}),e.jsx(e0,{children:e.jsxs(i0,{children:[e.jsxs("div",{children:[e.jsx(t0,{children:e.jsx(De,{})}),e.jsx(n0,{"data-explanation":t.explanationPosition,children:Kt(t.textContent)})]}),e.jsxs("div",{children:[e.jsx(G,{children:e.jsx(W,{})}),e.jsx(G,{children:e.jsx(We,{})})]})]})})]})},e0=a.div`  
  margin-top: 8px;
  box-sizing: border-box;
`,t0=a.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f0f0f0;
  }

  @media(max-width: ${t=>t.theme.breakpoints.xs}) {
    display: none;
  }
`,n0=a.div`
  padding-left: 14px;
  font-size: 14px;
  color: #242424;
  font-weight: 600;
  padding-bottom: 1px;

  @media(max-width: ${t=>t.theme.breakpoints.xs}) {;
    font-size: 20px;
  }
`,i0=a(He)`
  justify-content: space-between;
  padding: 6px 12px;

  > div {
    display: flex;
    align-items: center; 
  }

  @media(max-width: ${t=>t.theme.breakpoints.xs}) {
    background: #f8f8f8;
    box-shadow: none;
    height:auto;
  }
`,G=a.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  border-radius: 4px;
  cursor: pointer;

  > svg {
    height: 16px;
    width; 16px;
    fill: #424242; 
  }

  &:hover {
    background-color: #f0f0f0;
    
    > svg {
      fill: #115EA3; 
    }
  }

  @media(max-width: ${t=>t.theme.breakpoints.xs}) {
    display: none;
  }
`,o0=a.div`
  @media(min-width: ${t=>t.theme.breakpoints.xs}) {
    display: none;
  }

  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 8px;
  background: white;
  width: 100%;

  > svg {
    height: 28px;
    width: 28px;
  }
`;Te.__docgenInfo={description:"",methods:[],displayName:"Subject",props:{subject:{required:!0,tsType:{name:"OutlookCustomElements"},description:""}}};const L=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#424242",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M6.75 10a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M15 11.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5"})});L.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Le=({receiverEmail:t})=>e.jsx(s0,{children:e.jsxs(Pe,{children:[e.jsx(a0,{children:e.jsx($,{})}),e.jsx("span",{children:t}),e.jsx(r0,{children:e.jsx(L,{})})]})}),s0=a.div`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 6px;
`,a0=a.div`
  display: flex;
  align-items: center;
  padding: 0 8px 0 4px;
  > svg {
    width: 14px;
    height: 14px; 
    fill: #424242;
  }

  &:hover {
    > svg {
      fill: #242424; 
    }
  }
`,Pe=a.div`
  display: flex;
  align-items: center;
  width: 200px;
  
  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #242424;
    font-weight: 600;
  }
`,r0=a.div`
  ${Pe}:hover & {
    display: flex;
  }

  display: none;
  justify-content: center;
  border-radius: 4px;
  padding: 2px 0;
  width: 36px;
  &:hover {
    background: #ebebeb;
  }
`;Le.__docgenInfo={description:"",methods:[],displayName:"EmailTitle",props:{receiverEmail:{required:!0,tsType:{name:"string"},description:""}}};const g=({text:t,icon:n,amount:i,selected:o=!1,type:s="normal"})=>e.jsxs(P,{$selected:o,children:[e.jsxs(d0,{$selected:o,$colorType:s,children:[n,e.jsx("span",{children:t})]}),e.jsx(l0,{children:e.jsx(L,{})}),i&&e.jsx(c0,{$selected:o,children:i})]}),P=a.div`
  height: 28px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;  
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  &:hover {
    background: #ebebeb;
  }

  ${t=>t.$selected&&`
    background: #cfe4fa;
  `}
`,d0=a.div`
  padding-left: 20px;
  display: flex;
  align-items: center;

  > span {
    padding-left: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: #242424;
    font-weight: 400;
  }

  ${t=>t.$selected&&`
    > span {
      font-weight: 600;
    }
  `}

  ${t=>t.$colorType==="blue"&&`
    > span {
      color: #0f548c;
    }
  `}

  
`,c0=a.span`
  ${P}:hover & {
    display: none;
  }

  color: #242424;
  font-size: 12px;
  padding-right: 8px;

  ${t=>t.$selected&&`
    color: #0f548c;
    font-weight: 600;
  `}
`,l0=a.div`
  ${P}:hover & {
    display: flex;
  }

  display: none;
  justify-content: center;
  border-radius: 4px;
  padding: 2px 0;
  width: 36px;
  &:hover {
    background: #ebebeb;
  }
`;g.__docgenInfo={description:"",methods:[],displayName:"Item",props:{text:{required:!0,tsType:{name:"string"},description:""},icon:{required:!0,tsType:{name:"ReactNode"},description:""},amount:{required:!1,tsType:{name:"number"},description:""},selected:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},type:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'normal'",computed:!1}}}};const Ve=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#424242",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm1 4h3.5c.28 0 .5.22.5.5v.01a1.6 1.6 0 0 0 .03.3c.04.2.1.46.23.72.13.25.3.49.57.66.26.18.63.31 1.17.31s.9-.13 1.17-.3c.26-.18.44-.42.57-.67A2.6 2.6 0 0 0 12 10.5v-.01c0-.28.22-.5.5-.5H16V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zm4 .5"})});Ve.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const qe=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#424242",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M4.5 3A2.5 2.5 0 0 0 2 5.5v9A2.5 2.5 0 0 0 4.5 17h5.1c-.16-.32-.3-.65-.4-1H4.5A1.5 1.5 0 0 1 3 14.5V8h4.09c.4 0 .78-.16 1.06-.44L9.7 6h5.79c.83 0 1.5.67 1.5 1.5v2.1c.36.18.7.4 1 .66V7.5A2.5 2.5 0 0 0 15.5 5H9.7L8.23 3.51A1.75 1.75 0 0 0 6.98 3zM3 5.5C3 4.67 3.67 4 4.5 4h2.48c.2 0 .4.08.53.22L8.8 5.5 7.44 6.85a.5.5 0 0 1-.35.15H3zm7 9a4.5 4.5 0 1 0 9 0 4.5 4.5 0 0 0-9 0m1 0a3.5 3.5 0 0 1 5.6-2.8l-4.9 4.9a3.48 3.48 0 0 1-.7-2.1m3.5 3.5c-.79 0-1.51-.26-2.1-.7l4.9-4.9a3.5 3.5 0 0 1-2.8 5.6"})});qe.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Ye=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#424242",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M8.5 10a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM2 4.75C2 3.78 2.78 3 3.75 3h12.5c.97 0 1.75.78 1.75 1.75v1.5c0 .7-.4 1.3-1 1.58V14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7.83c-.6-.28-1-.88-1-1.58zM3.75 4a.75.75 0 0 0-.75.75v1.5c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75v-1.5a.75.75 0 0 0-.75-.75zM4 8v6c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V8z"})});Ye.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Re=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#424242",viewBox:"0 0 20 20",children:e.jsx("path",{d:"m13.25 2.82-9.61 9.6-.12.13a2 2 0 0 0-.4.76l-1.1 4.06-.02.08a.5.5 0 0 0 .63.53l4.06-1.1.16-.06a2 2 0 0 0 .73-.46l9.6-9.6.13-.15a2.78 2.78 0 0 0-4.06-3.8Zm-8.9 10.31 8.04-8.04 2.52 2.52-8.04 8.04-.1.09-.1.07a1 1 0 0 1-.25.1l-3.2.87.87-3.2.04-.13a1 1 0 0 1 .22-.32m12.12-9.6.11.11c.59.7.55 1.75-.1 2.4l-.87.87-2.52-2.53.86-.86.12-.1c.7-.59 1.75-.55 2.4.1ZM11.65 3H2.5a.5.5 0 0 0 0 1h8.15zm-3 3H2.5a.5.5 0 0 0 0 1h5.15zm-4 4 1-1H2.5a.5.5 0 0 0 0 1z"})});Re.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Ue=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#424242",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M4.5 3A2.5 2.5 0 0 0 2 5.5v9A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 15.5 5H9.7L8.23 3.51A1.75 1.75 0 0 0 6.98 3zM3 5.5C3 4.67 3.67 4 4.5 4h2.48c.2 0 .4.08.53.22L8.8 5.5 7.44 6.85a.5.5 0 0 1-.35.15H3zM3 8h4.09c.4 0 .78-.16 1.06-.44L9.7 6h5.79c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5z"})});Ue.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Ge=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#424242",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M14 3a3 3 0 0 1 3 2.82v4.56a2 2 0 0 1-.47 1.28l-.12.13-4.62 4.62a2 2 0 0 1-1.24.58l-.17.01H6a3 3 0 0 1-3-2.82V6a3 3 0 0 1 2.82-3zm0 1H6a2 2 0 0 0-2 1.85V14a2 2 0 0 0 1.85 2H10v-3a3 3 0 0 1 2.82-3H16V6a2 2 0 0 0-1.85-2zm1.78 7H13a2 2 0 0 0-2 1.85v2.93l.09-.07 4.62-4.62a1 1 0 0 0 .07-.09"})});Ge.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Ze=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#424242",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M2.18 2.11a.5.5 0 0 1 .54-.06l15 7.5a.5.5 0 0 1 0 .9l-15 7.5a.5.5 0 0 1-.7-.58L3.98 10 2.02 2.63a.5.5 0 0 1 .16-.52m2.7 8.39-1.61 6.06L16.38 10 3.27 3.44 4.88 9.5h6.62a.5.5 0 1 1 0 1z"})});Ze.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Qe=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#424242",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M8.5 4h3a1.5 1.5 0 0 0-3 0m-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.05l-1.2 10.34A3 3 0 0 1 12.27 18H7.73a3 3 0 0 1-2.98-2.66L3.55 5H2.5a.5.5 0 0 1 0-1zM5.74 15.23A2 2 0 0 0 7.73 17h4.54a2 2 0 0 0 1.99-1.77L15.44 5H4.56zM8.5 7.5c.28 0 .5.22.5.5v6a.5.5 0 0 1-1 0V8c0-.28.22-.5.5-.5M12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"})});Qe.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Xe=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#0f548c",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4M7 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m-1.95 5c-.03.16-.05.33-.05.5v.54l-2.63.71a.5.5 0 0 0-.35.61l.64 2.42a3 3 0 0 0 3.32 2.2c.23.3.5.58.79.83l-.17.05a4 4 0 0 1-4.9-2.82l-.65-2.42a1.5 1.5 0 0 1 1.06-1.84zM15 11.04v-.54c0-.17-.02-.34-.05-.5l2.94.78a1.5 1.5 0 0 1 1.06 1.84l-.64 2.42a4 4 0 0 1-5.07 2.77q.435-.375.78-.84a3 3 0 0 0 3.32-2.2l.65-2.4a.5.5 0 0 0-.36-.62l-2.63-.7Zm0-4.54a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M16.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m-13 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M1 6.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0M7.5 9C6.67 9 6 9.67 6 10.5V14a4 4 0 0 0 8 0v-3.5c0-.83-.67-1.5-1.5-1.5zM7 10.5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5V14a3 3 0 1 1-6 0z"})});Xe.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const h0=Math.floor(Math.random()*100)+1,p0=Math.floor(Math.random()*10)+1,x0=Math.floor(Math.random()*7)+1,Je=({receiverEmail:t})=>e.jsxs(u0,{children:[e.jsx(Le,{receiverEmail:t}),e.jsx(g,{text:"Inbox",icon:e.jsx(Ve,{}),selected:!0,amount:h0}),e.jsx(g,{text:"Junk Email",icon:e.jsx(qe,{}),selected:!1,amount:p0}),e.jsx(g,{text:"Drafts",icon:e.jsx(Re,{}),selected:!1,amount:x0}),e.jsx(g,{text:"Sent items",icon:e.jsx(Ze,{}),selected:!1}),e.jsx(g,{text:"Deleted items",icon:e.jsx(Qe,{}),selected:!1}),e.jsx(g,{text:"Archive",icon:e.jsx(Ye,{}),selected:!1}),e.jsx(g,{text:"Conversation history",icon:e.jsx(Ue,{}),selected:!1}),e.jsx(g,{text:"Notes",icon:e.jsx(Ge,{}),selected:!1}),e.jsx(f0,{children:e.jsx(g,{text:"Go to groups",icon:e.jsx(Xe,{}),selected:!1,type:"blue"})})]}),u0=a.div`  
  margin-left: 4px;
  margin-top: 8px;
  box-sizing: border-box;
  width: 200px;
  
  @media(max-width: ${t=>t.theme.breakpoints.sm}) {
    display: none;
  }
`,f0=a.div`
  margin-top: 10px;
`;Je.__docgenInfo={description:"",methods:[],displayName:"LeftActions",props:{receiverEmail:{required:!0,tsType:{name:"string"},description:""}}};const g0=a.div`
  padding: 10px 0;
  color: #242424;
  font-size: 15px;
  font-weight: 400;
  margin: 34px 16px 0 50px;
  padding-bottom: 2px;

  mark {
    background-color: transparent;
    position: relative;
  }

  img {
    object-fit: contain;
  }

  
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td, th {
      border: 2px solid #ced4da;
      box-sizing: border-box;
      min-width: 1em;
      padding: 3px 5px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }

      &.has-explanation {
        background-color: #F3F9CF !important;
        border-color: #F3F9CF !important;
        
        &.mark-active {
          background-color: #FCC934 !important;
          border-color: #FCC934 !important;
        }
      }
    }

    th {
      background-color: #f1f3f4;
      font-weight: bold;
    }

    .selectedCell:after {
      background: rgba(200, 200, 255, 0.4);
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: #adf;
      bottom: -2px;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }

    p {
      margin: 0;
    }
  }

  .tableWrapper {
    padding: 1rem 0;
    overflow-x: auto;
  }



  @media(max-width: ${t=>t.theme.breakpoints.xs}) {
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;

    img {
      width: 100%;  
    }
  }

`,V=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#881798",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M7.35 3.65c.2.2.2.5 0 .7L3.71 8h6.79a7.5 7.5 0 0 1 7.5 7.5.5.5 0 0 1-1 0A6.5 6.5 0 0 0 10.5 9H3.7l3.65 3.65a.5.5 0 0 1-.7.7l-4.5-4.5a.5.5 0 0 1 0-.7l4.5-4.5c.2-.2.5-.2.7 0"})});V.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const q=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#0078d4",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M12.65 3.65a.5.5 0 0 0 0 .7L16.29 8H9.5A7.5 7.5 0 0 0 2 15.5a.5.5 0 0 0 1 0A6.5 6.5 0 0 1 9.5 9h6.8l-3.65 3.65a.5.5 0 0 0 .7.7l4.5-4.5a.5.5 0 0 0 0-.7l-4.5-4.5a.5.5 0 0 0-.7 0"})});q.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Ke=6048e5,m0=864e5,Z=Symbol.for("constructDateFrom");function m(t,n){return typeof t=="function"?t(n):t&&typeof t=="object"&&Z in t?t[Z](n):t instanceof Date?new t.constructor(n):new Date(n)}function f(t,n){return m(n||t,t)}function w0(t,n,i){const o=f(t,i?.in);return isNaN(n)?m(t,NaN):(o.setDate(o.getDate()+n),o)}let v0={};function N(){return v0}function F(t,n){const i=N(),o=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??i.weekStartsOn??i.locale?.options?.weekStartsOn??0,s=f(t,n?.in),r=s.getDay(),d=(r<o?7:0)+r-o;return s.setDate(s.getDate()-d),s.setHours(0,0,0,0),s}function A(t,n){return F(t,{...n,weekStartsOn:1})}function et(t,n){const i=f(t,n?.in),o=i.getFullYear(),s=m(i,0);s.setFullYear(o+1,0,4),s.setHours(0,0,0,0);const r=A(s),d=m(i,0);d.setFullYear(o,0,4),d.setHours(0,0,0,0);const l=A(d);return i.getTime()>=r.getTime()?o+1:i.getTime()>=l.getTime()?o:o-1}function Q(t){const n=f(t),i=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds()));return i.setUTCFullYear(n.getFullYear()),+t-+i}function j0(t,...n){const i=m.bind(null,n.find(o=>typeof o=="object"));return n.map(i)}function X(t,n){const i=f(t,n?.in);return i.setHours(0,0,0,0),i}function y0(t,n,i){const[o,s]=j0(i?.in,t,n),r=X(o),d=X(s),l=+r-Q(r),x=+d-Q(d);return Math.round((l-x)/m0)}function _0(t,n){const i=et(t,n),o=m(t,0);return o.setFullYear(i,0,4),o.setHours(0,0,0,0),A(o)}function b0(t){return t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]"}function M0(t){return!(!b0(t)&&typeof t!="number"||isNaN(+f(t)))}function S0(t,n){const i=f(t,n?.in);return i.setFullYear(i.getFullYear(),0,1),i.setHours(0,0,0,0),i}const k0={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},I0=(t,n,i)=>{let o;const s=k0[t];return typeof s=="string"?o=s:n===1?o=s.one:o=s.other.replace("{{count}}",n.toString()),i?.addSuffix?i.comparison&&i.comparison>0?"in "+o:o+" ago":o};function E(t){return(n={})=>{const i=n.width?String(n.width):t.defaultWidth;return t.formats[i]||t.formats[t.defaultWidth]}}const C0={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},z0={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},B0={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},F0={date:E({formats:C0,defaultWidth:"full"}),time:E({formats:z0,defaultWidth:"full"}),dateTime:E({formats:B0,defaultWidth:"full"})},$0={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},O0=(t,n,i,o)=>$0[t];function z(t){return(n,i)=>{const o=i?.context?String(i.context):"standalone";let s;if(o==="formatting"&&t.formattingValues){const d=t.defaultFormattingWidth||t.defaultWidth,l=i?.width?String(i.width):d;s=t.formattingValues[l]||t.formattingValues[d]}else{const d=t.defaultWidth,l=i?.width?String(i.width):t.defaultWidth;s=t.values[l]||t.values[d]}const r=t.argumentCallback?t.argumentCallback(n):n;return s[r]}}const A0={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},N0={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},H0={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},E0={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},D0={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},W0={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},T0=(t,n)=>{const i=Number(t),o=i%100;if(o>20||o<10)switch(o%10){case 1:return i+"st";case 2:return i+"nd";case 3:return i+"rd"}return i+"th"},L0={ordinalNumber:T0,era:z({values:A0,defaultWidth:"wide"}),quarter:z({values:N0,defaultWidth:"wide",argumentCallback:t=>t-1}),month:z({values:H0,defaultWidth:"wide"}),day:z({values:E0,defaultWidth:"wide"}),dayPeriod:z({values:D0,defaultWidth:"wide",formattingValues:W0,defaultFormattingWidth:"wide"})};function B(t){return(n,i={})=>{const o=i.width,s=o&&t.matchPatterns[o]||t.matchPatterns[t.defaultMatchWidth],r=n.match(s);if(!r)return null;const d=r[0],l=o&&t.parsePatterns[o]||t.parsePatterns[t.defaultParseWidth],x=Array.isArray(l)?V0(l,h=>h.test(d)):P0(l,h=>h.test(d));let u;u=t.valueCallback?t.valueCallback(x):x,u=i.valueCallback?i.valueCallback(u):u;const p=n.slice(d.length);return{value:u,rest:p}}}function P0(t,n){for(const i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&n(t[i]))return i}function V0(t,n){for(let i=0;i<t.length;i++)if(n(t[i]))return i}function q0(t){return(n,i={})=>{const o=n.match(t.matchPattern);if(!o)return null;const s=o[0],r=n.match(t.parsePattern);if(!r)return null;let d=t.valueCallback?t.valueCallback(r[0]):r[0];d=i.valueCallback?i.valueCallback(d):d;const l=n.slice(s.length);return{value:d,rest:l}}}const Y0=/^(\d+)(th|st|nd|rd)?/i,R0=/\d+/i,U0={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},G0={any:[/^b/i,/^(a|c)/i]},Z0={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Q0={any:[/1/i,/2/i,/3/i,/4/i]},X0={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},J0={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},K0={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},en={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},tn={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},nn={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},on={ordinalNumber:q0({matchPattern:Y0,parsePattern:R0,valueCallback:t=>parseInt(t,10)}),era:B({matchPatterns:U0,defaultMatchWidth:"wide",parsePatterns:G0,defaultParseWidth:"any"}),quarter:B({matchPatterns:Z0,defaultMatchWidth:"wide",parsePatterns:Q0,defaultParseWidth:"any",valueCallback:t=>t+1}),month:B({matchPatterns:X0,defaultMatchWidth:"wide",parsePatterns:J0,defaultParseWidth:"any"}),day:B({matchPatterns:K0,defaultMatchWidth:"wide",parsePatterns:en,defaultParseWidth:"any"}),dayPeriod:B({matchPatterns:tn,defaultMatchWidth:"any",parsePatterns:nn,defaultParseWidth:"any"})},sn={code:"en-US",formatDistance:I0,formatLong:F0,formatRelative:O0,localize:L0,match:on,options:{weekStartsOn:0,firstWeekContainsDate:1}};function an(t,n){const i=f(t,n?.in);return y0(i,S0(i))+1}function rn(t,n){const i=f(t,n?.in),o=+A(i)-+_0(i);return Math.round(o/Ke)+1}function tt(t,n){const i=f(t,n?.in),o=i.getFullYear(),s=N(),r=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??s.firstWeekContainsDate??s.locale?.options?.firstWeekContainsDate??1,d=m(n?.in||t,0);d.setFullYear(o+1,0,r),d.setHours(0,0,0,0);const l=F(d,n),x=m(n?.in||t,0);x.setFullYear(o,0,r),x.setHours(0,0,0,0);const u=F(x,n);return+i>=+l?o+1:+i>=+u?o:o-1}function dn(t,n){const i=N(),o=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??i.firstWeekContainsDate??i.locale?.options?.firstWeekContainsDate??1,s=tt(t,n),r=m(n?.in||t,0);return r.setFullYear(s,0,o),r.setHours(0,0,0,0),F(r,n)}function cn(t,n){const i=f(t,n?.in),o=+F(i,n)-+dn(i,n);return Math.round(o/Ke)+1}function c(t,n){const i=t<0?"-":"",o=Math.abs(t).toString().padStart(n,"0");return i+o}const w={y(t,n){const i=t.getFullYear(),o=i>0?i:1-i;return c(n==="yy"?o%100:o,n.length)},M(t,n){const i=t.getMonth();return n==="M"?String(i+1):c(i+1,2)},d(t,n){return c(t.getDate(),n.length)},a(t,n){const i=t.getHours()/12>=1?"pm":"am";switch(n){case"a":case"aa":return i.toUpperCase();case"aaa":return i;case"aaaaa":return i[0];default:return i==="am"?"a.m.":"p.m."}},h(t,n){return c(t.getHours()%12||12,n.length)},H(t,n){return c(t.getHours(),n.length)},m(t,n){return c(t.getMinutes(),n.length)},s(t,n){return c(t.getSeconds(),n.length)},S(t,n){const i=n.length,o=t.getMilliseconds(),s=Math.trunc(o*Math.pow(10,i-3));return c(s,n.length)}},S={midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},J={G:function(t,n,i){const o=t.getFullYear()>0?1:0;switch(n){case"G":case"GG":case"GGG":return i.era(o,{width:"abbreviated"});case"GGGGG":return i.era(o,{width:"narrow"});default:return i.era(o,{width:"wide"})}},y:function(t,n,i){if(n==="yo"){const o=t.getFullYear(),s=o>0?o:1-o;return i.ordinalNumber(s,{unit:"year"})}return w.y(t,n)},Y:function(t,n,i,o){const s=tt(t,o),r=s>0?s:1-s;if(n==="YY"){const d=r%100;return c(d,2)}return n==="Yo"?i.ordinalNumber(r,{unit:"year"}):c(r,n.length)},R:function(t,n){const i=et(t);return c(i,n.length)},u:function(t,n){const i=t.getFullYear();return c(i,n.length)},Q:function(t,n,i){const o=Math.ceil((t.getMonth()+1)/3);switch(n){case"Q":return String(o);case"QQ":return c(o,2);case"Qo":return i.ordinalNumber(o,{unit:"quarter"});case"QQQ":return i.quarter(o,{width:"abbreviated",context:"formatting"});case"QQQQQ":return i.quarter(o,{width:"narrow",context:"formatting"});default:return i.quarter(o,{width:"wide",context:"formatting"})}},q:function(t,n,i){const o=Math.ceil((t.getMonth()+1)/3);switch(n){case"q":return String(o);case"qq":return c(o,2);case"qo":return i.ordinalNumber(o,{unit:"quarter"});case"qqq":return i.quarter(o,{width:"abbreviated",context:"standalone"});case"qqqqq":return i.quarter(o,{width:"narrow",context:"standalone"});default:return i.quarter(o,{width:"wide",context:"standalone"})}},M:function(t,n,i){const o=t.getMonth();switch(n){case"M":case"MM":return w.M(t,n);case"Mo":return i.ordinalNumber(o+1,{unit:"month"});case"MMM":return i.month(o,{width:"abbreviated",context:"formatting"});case"MMMMM":return i.month(o,{width:"narrow",context:"formatting"});default:return i.month(o,{width:"wide",context:"formatting"})}},L:function(t,n,i){const o=t.getMonth();switch(n){case"L":return String(o+1);case"LL":return c(o+1,2);case"Lo":return i.ordinalNumber(o+1,{unit:"month"});case"LLL":return i.month(o,{width:"abbreviated",context:"standalone"});case"LLLLL":return i.month(o,{width:"narrow",context:"standalone"});default:return i.month(o,{width:"wide",context:"standalone"})}},w:function(t,n,i,o){const s=cn(t,o);return n==="wo"?i.ordinalNumber(s,{unit:"week"}):c(s,n.length)},I:function(t,n,i){const o=rn(t);return n==="Io"?i.ordinalNumber(o,{unit:"week"}):c(o,n.length)},d:function(t,n,i){return n==="do"?i.ordinalNumber(t.getDate(),{unit:"date"}):w.d(t,n)},D:function(t,n,i){const o=an(t);return n==="Do"?i.ordinalNumber(o,{unit:"dayOfYear"}):c(o,n.length)},E:function(t,n,i){const o=t.getDay();switch(n){case"E":case"EE":case"EEE":return i.day(o,{width:"abbreviated",context:"formatting"});case"EEEEE":return i.day(o,{width:"narrow",context:"formatting"});case"EEEEEE":return i.day(o,{width:"short",context:"formatting"});default:return i.day(o,{width:"wide",context:"formatting"})}},e:function(t,n,i,o){const s=t.getDay(),r=(s-o.weekStartsOn+8)%7||7;switch(n){case"e":return String(r);case"ee":return c(r,2);case"eo":return i.ordinalNumber(r,{unit:"day"});case"eee":return i.day(s,{width:"abbreviated",context:"formatting"});case"eeeee":return i.day(s,{width:"narrow",context:"formatting"});case"eeeeee":return i.day(s,{width:"short",context:"formatting"});default:return i.day(s,{width:"wide",context:"formatting"})}},c:function(t,n,i,o){const s=t.getDay(),r=(s-o.weekStartsOn+8)%7||7;switch(n){case"c":return String(r);case"cc":return c(r,n.length);case"co":return i.ordinalNumber(r,{unit:"day"});case"ccc":return i.day(s,{width:"abbreviated",context:"standalone"});case"ccccc":return i.day(s,{width:"narrow",context:"standalone"});case"cccccc":return i.day(s,{width:"short",context:"standalone"});default:return i.day(s,{width:"wide",context:"standalone"})}},i:function(t,n,i){const o=t.getDay(),s=o===0?7:o;switch(n){case"i":return String(s);case"ii":return c(s,n.length);case"io":return i.ordinalNumber(s,{unit:"day"});case"iii":return i.day(o,{width:"abbreviated",context:"formatting"});case"iiiii":return i.day(o,{width:"narrow",context:"formatting"});case"iiiiii":return i.day(o,{width:"short",context:"formatting"});default:return i.day(o,{width:"wide",context:"formatting"})}},a:function(t,n,i){const s=t.getHours()/12>=1?"pm":"am";switch(n){case"a":case"aa":return i.dayPeriod(s,{width:"abbreviated",context:"formatting"});case"aaa":return i.dayPeriod(s,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return i.dayPeriod(s,{width:"narrow",context:"formatting"});default:return i.dayPeriod(s,{width:"wide",context:"formatting"})}},b:function(t,n,i){const o=t.getHours();let s;switch(o===12?s=S.noon:o===0?s=S.midnight:s=o/12>=1?"pm":"am",n){case"b":case"bb":return i.dayPeriod(s,{width:"abbreviated",context:"formatting"});case"bbb":return i.dayPeriod(s,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return i.dayPeriod(s,{width:"narrow",context:"formatting"});default:return i.dayPeriod(s,{width:"wide",context:"formatting"})}},B:function(t,n,i){const o=t.getHours();let s;switch(o>=17?s=S.evening:o>=12?s=S.afternoon:o>=4?s=S.morning:s=S.night,n){case"B":case"BB":case"BBB":return i.dayPeriod(s,{width:"abbreviated",context:"formatting"});case"BBBBB":return i.dayPeriod(s,{width:"narrow",context:"formatting"});default:return i.dayPeriod(s,{width:"wide",context:"formatting"})}},h:function(t,n,i){if(n==="ho"){let o=t.getHours()%12;return o===0&&(o=12),i.ordinalNumber(o,{unit:"hour"})}return w.h(t,n)},H:function(t,n,i){return n==="Ho"?i.ordinalNumber(t.getHours(),{unit:"hour"}):w.H(t,n)},K:function(t,n,i){const o=t.getHours()%12;return n==="Ko"?i.ordinalNumber(o,{unit:"hour"}):c(o,n.length)},k:function(t,n,i){let o=t.getHours();return o===0&&(o=24),n==="ko"?i.ordinalNumber(o,{unit:"hour"}):c(o,n.length)},m:function(t,n,i){return n==="mo"?i.ordinalNumber(t.getMinutes(),{unit:"minute"}):w.m(t,n)},s:function(t,n,i){return n==="so"?i.ordinalNumber(t.getSeconds(),{unit:"second"}):w.s(t,n)},S:function(t,n){return w.S(t,n)},X:function(t,n,i){const o=t.getTimezoneOffset();if(o===0)return"Z";switch(n){case"X":return ee(o);case"XXXX":case"XX":return b(o);default:return b(o,":")}},x:function(t,n,i){const o=t.getTimezoneOffset();switch(n){case"x":return ee(o);case"xxxx":case"xx":return b(o);default:return b(o,":")}},O:function(t,n,i){const o=t.getTimezoneOffset();switch(n){case"O":case"OO":case"OOO":return"GMT"+K(o,":");default:return"GMT"+b(o,":")}},z:function(t,n,i){const o=t.getTimezoneOffset();switch(n){case"z":case"zz":case"zzz":return"GMT"+K(o,":");default:return"GMT"+b(o,":")}},t:function(t,n,i){const o=Math.trunc(+t/1e3);return c(o,n.length)},T:function(t,n,i){return c(+t,n.length)}};function K(t,n=""){const i=t>0?"-":"+",o=Math.abs(t),s=Math.trunc(o/60),r=o%60;return r===0?i+String(s):i+String(s)+n+c(r,2)}function ee(t,n){return t%60===0?(t>0?"-":"+")+c(Math.abs(t)/60,2):b(t,n)}function b(t,n=""){const i=t>0?"-":"+",o=Math.abs(t),s=c(Math.trunc(o/60),2),r=c(o%60,2);return i+s+n+r}const te=(t,n)=>{switch(t){case"P":return n.date({width:"short"});case"PP":return n.date({width:"medium"});case"PPP":return n.date({width:"long"});default:return n.date({width:"full"})}},nt=(t,n)=>{switch(t){case"p":return n.time({width:"short"});case"pp":return n.time({width:"medium"});case"ppp":return n.time({width:"long"});default:return n.time({width:"full"})}},ln=(t,n)=>{const i=t.match(/(P+)(p+)?/)||[],o=i[1],s=i[2];if(!s)return te(t,n);let r;switch(o){case"P":r=n.dateTime({width:"short"});break;case"PP":r=n.dateTime({width:"medium"});break;case"PPP":r=n.dateTime({width:"long"});break;default:r=n.dateTime({width:"full"});break}return r.replace("{{date}}",te(o,n)).replace("{{time}}",nt(s,n))},hn={p:nt,P:ln},pn=/^D+$/,xn=/^Y+$/,un=["D","DD","YY","YYYY"];function fn(t){return pn.test(t)}function gn(t){return xn.test(t)}function mn(t,n,i){const o=wn(t,n,i);if(console.warn(o),un.includes(t))throw new RangeError(o)}function wn(t,n,i){const o=t[0]==="Y"?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${n}\`) for formatting ${o} to the input \`${i}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const vn=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,jn=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,yn=/^'([^]*?)'?$/,_n=/''/g,bn=/[a-zA-Z]/;function Mn(t,n,i){const o=N(),s=o.locale??sn,r=o.firstWeekContainsDate??o.locale?.options?.firstWeekContainsDate??1,d=o.weekStartsOn??o.locale?.options?.weekStartsOn??0,l=f(t,i?.in);if(!M0(l))throw new RangeError("Invalid time value");let x=n.match(jn).map(p=>{const h=p[0];if(h==="p"||h==="P"){const H=hn[h];return H(p,s.formatLong)}return p}).join("").match(vn).map(p=>{if(p==="''")return{isToken:!1,value:"'"};const h=p[0];if(h==="'")return{isToken:!1,value:Sn(p)};if(J[h])return{isToken:!0,value:p};if(h.match(bn))throw new RangeError("Format string contains an unescaped latin alphabet character `"+h+"`");return{isToken:!1,value:p}});s.localize.preprocessor&&(x=s.localize.preprocessor(l,x));const u={firstWeekContainsDate:r,weekStartsOn:d,locale:s};return x.map(p=>{if(!p.isToken)return p.value;const h=p.value;(gn(h)||fn(h))&&mn(h,n,String(t));const H=J[h[0]];return H(l,h,s.localize,u)}).join("")}function Sn(t){const n=t.match(yn);return n?n[1].replace(_n,"'"):t}function kn(t,n,i){return w0(t,-3,i)}const it=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#881798",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M7.35 3.65c.2.2.2.5 0 .7L3.21 8.5l4.14 4.15a.5.5 0 0 1-.7.7l-4.5-4.5a.5.5 0 0 1 0-.7l4.5-4.5c.2-.2.5-.2.7 0m3 0c.2.2.2.5 0 .7L6.71 8h3.79a7.5 7.5 0 0 1 7.5 7.5.5.5 0 0 1-1 0A6.5 6.5 0 0 0 10.5 9H6.7l3.65 3.65a.5.5 0 0 1-.7.7l-4.5-4.5a.5.5 0 0 1 0-.7l4.5-4.5c.2-.2.5-.2.7 0"})});it.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const ot=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#0078d4",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M5 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm3 0H6v2h2zm-3 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm3 0H6v2h2zm4-7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm0 1h2v2h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v2h2zM5 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zM3 5c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"})});ot.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const st=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#242424",className:"___1okpztj f1w7gpdv fez10in fg4l7m0 f16hsg94 fwpfdsa f88nxoq f1e2fz10",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M6.25 10a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0m5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0M15 11.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"})});st.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const k=({icon:t,hasSeparator:n=!1})=>e.jsxs(In,{children:[n&&e.jsx(Cn,{}),e.jsx(zn,{children:t})]}),In=a.div`
  display: flex;
  align-items: center;
`,Cn=a.div`
  height: 24px;
  width: 1px;
  background: #e0e0e0;
`,zn=a.div`
  width: 32px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: rgb(235, 243, 252);
    > svg {
      fill: #115EA3; 
    }
  }
`;k.__docgenInfo={description:"",methods:[],displayName:"RightActionsButton",props:{icon:{required:!0,tsType:{name:"ReactNode"},description:""},hasSeparator:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const at=()=>e.jsxs(Bn,{children:[e.jsxs(Fn,{children:[e.jsx(k,{icon:e.jsx(V,{})}),e.jsx(k,{icon:e.jsx(it,{})}),e.jsx(k,{icon:e.jsx(q,{})}),e.jsx(k,{icon:e.jsx(ot,{}),hasSeparator:!0}),e.jsx(k,{icon:e.jsx(st,{}),hasSeparator:!0})]}),e.jsx($n,{children:Mn(kn(new Date),"E yyyy-MM-dd HH:mm")})]}),Bn=a.div`
  @media(max-width: ${t=>t.theme.breakpoints.sm}) {
    display: none;
  }
`,Fn=a.div`
  display: flex;
`,$n=a.p`
  text-align: right;
  margin: 4px 0 0 0;
  font-size: 11px;
  font-weight: 400;
  color: #424242;
  padding: 2px 6px;
`;at.__docgenInfo={description:"",methods:[],displayName:"RightActions"};const rt=a.div`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  margin-right: 10px;
  background: #ecdfa5;
  color: #6c5700;
  font-size: 14px;
  font-weight: 600;
`,dt=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#242424",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M6.25 10a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0m5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0M15 11.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"})});dt.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const ct=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"white",viewBox:"0 0 20 20",children:e.jsx("path",{d:"m6.99 2.07-.72.21a3.5 3.5 0 0 0-2.45 2.86c-.3 2.06.36 4.48 1.96 7.25s3.36 4.55 5.3 5.33a3.5 3.5 0 0 0 3.7-.7l.55-.52a2 2 0 0 0 .25-2.62L14.22 12a1.5 1.5 0 0 0-1.65-.56l-2.05.63-.06.01c-.22.04-.74-.45-1.4-1.58-.67-1.18-.82-1.87-.63-2.04l1.05-.98a2.5 2.5 0 0 0 .57-2.85l-.66-1.47a2 2 0 0 0-2.4-1.1Zm1.49 1.5.66 1.47a1.5 1.5 0 0 1-.35 1.71l-1.04.98c-.67.63-.45 1.71.45 3.27.85 1.47 1.62 2.19 2.45 2.06l.12-.02 2.09-.64a.5.5 0 0 1 .55.19l1.36 1.88a1 1 0 0 1-.13 1.3l-.54.52a2.5 2.5 0 0 1-2.65.5c-1.7-.68-3.3-2.3-4.8-4.9-1.5-2.59-2.1-4.8-1.84-6.61a2.5 2.5 0 0 1 1.75-2.04l.72-.22a1 1 0 0 1 1.2.55"})});ct.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Y=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#242424",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M15.5 4A2.5 2.5 0 0 1 18 6.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 14.5v-8A2.5 2.5 0 0 1 4.5 4zM17 7.96l-6.75 3.97a.5.5 0 0 1-.42.04l-.08-.04L3 7.96v6.54c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5zM15.5 5h-11C3.67 5 3 5.67 3 6.5v.3l7 4.12 7-4.12v-.3c0-.83-.67-1.5-1.5-1.5"})});Y.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const lt=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2M8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75M19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.7.7 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"})});lt.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const ht=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#0078d4",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M7.65 4.15c.2-.2.5-.2.7 0l5.49 5.46c.21.22.21.57 0 .78l-5.49 5.46a.5.5 0 0 1-.7-.7L12.8 10 7.65 4.85a.5.5 0 0 1 0-.7"})});ht.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const pt=({senderEmail:t})=>e.jsxs(On,{children:[e.jsxs(An,{children:[e.jsx("span",{children:"Contact"}),e.jsx(ht,{})]}),e.jsxs(Nn,{children:[e.jsx(Y,{}),e.jsx("span",{children:t})]}),e.jsx(Hn,{children:"Show more"})]}),On=a.div`
  padding: 16px 0;
`,An=a.div`
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  

  > span {
    color: #424242; 
    font-size: 14px;
    font-weight: 600;
  }

  &:hover {
    > span {
      color: #0078d4
    }
  }
`,Nn=a.div`
  width: 100%;
  margin: 10px 0;
  box-sizing: border-box;
  cursor: pointer;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  gap: 14px;

  > span {
    color: #0078d4;
    font-size: 11px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: normal;
    line-height: 20px;
  }

  &:hover {
    background: #e0e0e0;

    > span {
      color: #0F6CBD; 
    }
  }
`,Hn=a.div`
  color: #0078d4;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  padding: 0 16px;

  &:hover {
    text-decoration: underline;
  }
`;pt.__docgenInfo={description:"",methods:[],displayName:"Contact",props:{senderEmail:{required:!0,tsType:{name:"string"},description:""}}};const ne=({senderName:t,senderEmail:n,children:i})=>{const[o,s]=R.useState(!1),{refs:r,floatingStyles:d,context:l}=bt({open:o,onOpenChange:s,placement:"bottom-start"}),x=Mt(l,{delay:300,handleClose:St({requireIntent:!1})}),{getReferenceProps:u,getFloatingProps:p}=kt([x]);return e.jsxs(e.Fragment,{children:[R.cloneElement(i,{ref:r.setReference,...u}),o&&e.jsx(It,{context:l,modal:!1,returnFocus:!1,initialFocus:-1,restoreFocus:!1,children:e.jsx("div",{ref:r.setFloating,style:d,...p(),children:e.jsxs(En,{children:[e.jsxs(Dn,{children:[e.jsx(Wn,{children:t.charAt(0)}),e.jsx(Tn,{children:t})]}),e.jsxs(Ln,{children:[e.jsxs(Pn,{children:[e.jsxs(Vn,{children:[e.jsx(ct,{}),e.jsx("span",{children:"Call"})]}),e.jsx(qn,{children:e.jsx($,{})})]}),e.jsx(D,{children:e.jsx(Y,{})}),e.jsx(D,{children:e.jsx(lt,{})}),e.jsx(D,{children:e.jsx(dt,{})})]}),e.jsx(Yn,{}),e.jsx(pt,{senderEmail:n})]})})})]})},En=a.div`
  width: 340px;  
  z-index: 2;
  background: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
  border-radius: 4px;

  &:focus {
    outline: !important none;
  }
`,Dn=a.div`
  display: flex;
  align-items: center;
  padding: 16px 0 0 16px;
`,Wn=a(rt)`
  font-size: 28px;
  height: 72px;
  width: 72px;
  font-weight: 600;
  background: rgb(122, 117, 116);
  color: white;
`,Tn=a.div`
  padding-left: 8px;
  text-overflow: ellipsis;
  white-space: nowrap; 
  font-weight: 600;
  color: #242424;
  font-size: 20px;
  font-weight: 600;
  max-width: 176px;
  cursor: text;
`,Ln=a.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  padding: 0 0 16px 16px;
`,Pn=a.div`
  display: flex;
  height: 32px;
  cursor: pointer;
  padding-right: 4px;
`,Vn=a.div`
  display: flex;
  align-items: center;
  height: 32px;
  background: #0F6CBD;
  border-radius: 4px 0 0 4px;
  display: flex;
  align-items: center;
  border-right: 1px solid white;
  padding: 0 9px 0 9px;
  color: white;

  > span {
    padding-left: 6px; 
    padding-right: 2px;
    font-size: 14px;
    font-weight: 300;
    padding-bottom: 1px;
  }

  &:hover {
    background: #0F548C;
  }
`,qn=a.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  background: #0F6CBD;
  border-radius: 0 4px 4px 0;

  &:hover {
    background: #0F548C;
  }
`,D=a.div`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }

  > svg {
    fill: #424242; 
  }
`,Yn=a.div`
  width: 100%;
  height: 1px;
  background: #e0e0e0;
`,xt=({senderEmail:t,senderName:n})=>e.jsxs(Rn,{children:[e.jsx(ne,{senderEmail:t.textContent||"",senderName:n.textContent||"S",children:e.jsx(rt,{children:n.textContent?n.textContent.charAt(0):"S"})}),e.jsxs("div",{children:[e.jsx(ne,{senderEmail:t.textContent||"",senderName:n.textContent||"S",children:e.jsxs(Un,{children:[e.jsx("span",{"data-explanation":n.explanationPosition,children:n.textContent||""}),e.jsx("span",{"data-explanation":t.explanationPosition,children:`<${t.textContent||""}>`})]})}),e.jsxs(Gn,{children:[e.jsx("span",{children:"To:"}),e.jsx(Zn,{children:"You"})]})]})]}),Rn=a.div`
  padding-left: 4px;
  padding-top: 4px;
  display: flex;
  align-items: center;
`,Un=a.div`
  display: flex;
  color: #242424;
  font-size: 12px;
`,Gn=a.div`
  padding-top: 6px;
  display: flex;
  color: #242424;
  font-size: 12px;

  > span {
    padding-right: 4px; 
    color: #424242;
  }
`,Zn=a.div`
  cursor: pointer;
`;xt.__docgenInfo={description:"",methods:[],displayName:"Sender",props:{senderName:{required:!0,tsType:{name:"OutlookCustomElements"},description:""},senderEmail:{required:!0,tsType:{name:"OutlookCustomElements"},description:""}}};const ut=()=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 16 16",children:[e.jsx("path",{fill:"#fff",d:"M2.5 14h11c.275 0 .5-.225.5-.5v-11c0-.275-.225-.5-.5-.5h-11c-.275 0-.5.225-.5.5v11c0 .275.225.5.5.5"}),e.jsx("path",{fill:"#605E5C",fillRule:"evenodd",d:"M2.5 15h11c.827 0 1.5-.673 1.5-1.5v-11c0-.827-.673-1.5-1.5-1.5h-11C1.673 1 1 1.673 1 2.5v11c0 .827.673 1.5 1.5 1.5M2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5z",clipRule:"evenodd",opacity:"0.64"}),e.jsx("path",{stroke:"#E8467C",strokeLinecap:"round",strokeLinejoin:"round",d:"M5.5 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2m5-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2",clipRule:"evenodd"}),e.jsx("path",{fill:"#E8467C",d:"M11.5 4.5h.5a.5.5 0 0 0-.598-.49zm-5 1-.098-.49A.5.5 0 0 0 6 5.5zm5.5 4v-5h-1v5zm-.598-5.49-5 1 .196.98 5-1zM6 5.5v5h1v-5zm5.402.01-5 1 .196.98 5-1z"})]});ut.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const ft=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 20 20",fill:"#D65532",children:e.jsx("path",{d:"M14 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8c0 .37.1.72.28 1.02l4.67-4.59a1.5 1.5 0 0 1 2.1 0l4.67 4.59c.18-.3.28-.65.28-1.02V6a2 2 0 0 0-2-2zm0 12h8a2 2 0 0 0 1.01-.27l-4.66-4.58a.5.5 0 0 0-.7 0l-4.66 4.58A2 2 0 0 0 6 16"})});ft.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const gt=()=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 16 16",children:[e.jsx("path",{fill:"#fff",d:"M3.5 15h9c.275 0 .5-.225.5-.5V5h-1.5c-.827 0-1.5-.673-1.5-1.5V1H3.5c-.275 0-.5.225-.5.5v13c0 .275.225.5.5.5"}),e.jsx("path",{fill:"#fff",d:"M13 4v-.086a.5.5 0 0 0-.146-.353L11 1.707V3.5c0 .275.225.5.5.5z"}),e.jsx("path",{fill:"#605E5C",fillRule:"evenodd",d:"M13.56 2.853 11.146.44a1.5 1.5 0 0 0-1.06-.44H3.5C2.673 0 2 .673 2 1.5v13c0 .827.673 1.5 1.5 1.5h9c.827 0 1.5-.673 1.5-1.5V3.914c0-.4-.156-.777-.44-1.06zm-.707.708c.095.094.147.22.147.353V4h-1.5a.5.5 0 0 1-.5-.5V1.707zM3.5 15h9c.275 0 .5-.225.5-.5V5h-1.5c-.827 0-1.5-.673-1.5-1.5V1H3.5c-.275 0-.5.225-.5.5v13a.5.5 0 0 0 .5.5",clipRule:"evenodd",opacity:"0.64"}),e.jsx("path",{fill:"#C8C6C4",d:"M11.5 8h-7a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1"}),e.jsx("path",{fill:"#D65532",fillRule:"evenodd",d:"M5 13v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1m-3.5 0h2.3a.2.2 0 0 0 .2-.2v-2.6a.2.2 0 0 0-.2-.2H1.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5m10.7 0h2.3a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2.3a.2.2 0 0 0-.2.2v2.6c0 .11.09.2.2.2m-2.4 0H6.2a.2.2 0 0 1-.2-.2v-2.6c0-.11.09-.2.2-.2h3.6c.11 0 .2.084.2.194v2.612c0 .11-.09.194-.2.194",clipRule:"evenodd"})]});gt.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const mt=()=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 16 16",children:[e.jsx("path",{fill:"#fff",d:"M2.5 14h11c.275 0 .5-.225.5-.5v-11c0-.275-.225-.5-.5-.5h-11c-.275 0-.5.225-.5.5v11c0 .275.225.5.5.5"}),e.jsx("path",{fill:"#605E5C",fillRule:"evenodd",d:"M2.5 15h11c.827 0 1.5-.673 1.5-1.5v-11c0-.827-.673-1.5-1.5-1.5h-11C1.673 1 1 1.673 1 2.5v11c0 .827.673 1.5 1.5 1.5M2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5z",clipRule:"evenodd",opacity:"0.64"}),e.jsx("path",{fill:"#BC1948",d:"M11 8a.49.49 0 0 1-.24.42l-4 2.5a.5.5 0 0 1-.26.08.5.5 0 0 1-.24-.06.51.51 0 0 1-.26-.44V8z"}),e.jsx("path",{fill:"#E8467C",d:"M11 8a.49.49 0 0 0-.24-.421l-4-2.507a.47.47 0 0 0-.5 0 .51.51 0 0 0-.26.421V8z"})]});mt.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const T=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#D65532",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M6 2a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V7.41c0-.4-.16-.78-.44-1.06l-3.91-3.91A1.5 1.5 0 0 0 10.59 2zM5 4a1 1 0 0 1 1-1h4v3.5c0 .83.67 1.5 1.5 1.5H15v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm9.8 3h-3.3a.5.5 0 0 1-.5-.5V3.2z"})});T.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const wt=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#808080",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z"})});wt.__docgenInfo={description:"",methods:[],displayName:"SvgIcon"};const Qn=Math.floor(Math.random()*300)+1,vt=({name:t,explanationPosition:n,type:i})=>{const o=s=>{switch(s){case I.audio:return e.jsx(ut,{});case I.document:return e.jsx(gt,{});case I.image:return e.jsx(ft,{});case I.video:return e.jsx(mt,{});case I.other:return e.jsx(T,{});default:return e.jsx(T,{})}};return e.jsxs(Xn,{children:[e.jsxs(Jn,{children:[e.jsxs(e1,{children:[" ",o(i)," "]}),e.jsxs(i1,{children:[e.jsx(t1,{"data-explanation":n,title:t,children:t}),e.jsxs(n1,{children:[Qn," KB"]})]})]}),e.jsx(Kn,{children:e.jsx(wt,{})})]})},Xn=a.div`
  width: 280px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
`,Jn=a.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  &:hover {
    background: #f5f5f5;
  }
`,Kn=a.div`  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;

  &:hover {
    background: #f5f5f5;
  }

  > svg {
    height: 20px; 
    width: 20px;
  }
`,e1=a.div`
  height: 26px;
  padding: 0 8px;

  > svg {
    height: 26px;
    width: 26px; 
  }
`,t1=a.span`
  color: #424242;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 180px;
  display: inline-block;
`,n1=a.div`
  color: #707070;
  font-size: 10px;
  font-weight: 600;
`,i1=a.div`
  padding-left: 4px;
  min-width: 0;
  flex: 1;
`;vt.__docgenInfo={description:"",methods:[],displayName:"Attachment",props:{name:{required:!0,tsType:{name:"string"},description:""},explanationPosition:{required:!0,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},type:{required:!1,tsType:{name:"string"},description:""}}};const jt=({content:t,senderName:n,senderEmail:i,attachments:o})=>e.jsxs(o1,{children:[e.jsxs(a1,{children:[e.jsx(xt,{senderName:n,senderEmail:i}),e.jsx("div",{}),e.jsx(at,{})]}),e.jsx(s1,{children:o&&o.length>0&&o.sort((s,r)=>parseInt(s.position)-parseInt(r.position)).map((s,r)=>e.jsx(vt,{explanationPosition:s.explanationPosition,type:s.fileType,name:s.name},r))}),e.jsx(g0,{dangerouslySetInnerHTML:{__html:t?t.outerHTML:null}}),e.jsxs(r1,{children:[e.jsxs(ie,{children:[e.jsx(V,{}),e.jsx("span",{children:"Reply"})]}),e.jsxs(ie,{children:[e.jsx(q,{}),e.jsx("span",{children:"Forward"})]})]})]}),o1=a.div`
  padding: 10px 12px 12px 12px;
  margin: 8px 0;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14);  

  @media(max-width: ${t=>t.theme.breakpoints.xs}) {
    background: #fff;
    box-sizing: border-box;
    border-radius: none;
    box-shadow: none;  
  }
`,s1=a.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 34px 16px 0 50px;
`,a1=a.div`
  display: flex;
  justify-content: space-between;
`,r1=a.div`
  margin: 12px 16px 0 48px;
  display: flex;  
  font-weight: 400;
  gap: 4px;  
`,ie=a.div`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 0 12px;
  margin-top: 4px;
  height: 28px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  cursor: pointer;

  &:hover {
    color: #0C3B5E;
    background: #f5f5f5;
  }
`;jt.__docgenInfo={description:"",methods:[],displayName:"EmailContent",props:{content:{required:!0,tsType:{name:"HTMLElement"},description:""},senderName:{required:!0,tsType:{name:"OutlookCustomElements"},description:""},senderEmail:{required:!0,tsType:{name:"OutlookCustomElements"},description:""},attachments:{required:!0,tsType:{name:"Array",elements:[{name:"OutlookAttachmentElement"}],raw:"OutlookAttachmentElement[]"},description:""}}};const d1=({content:t,senderName:n,senderEmail:i,receiverEmail:o,subject:s,attachments:r,explanations:d,explanationNumber:l,showExplanations:x})=>e.jsxs(l1,{className:"outlook",children:[d&&d.map(u=>e.jsx(_t,{explanation:u,explanationNumber:l,showExplanations:x})),e.jsx(c1,{}),e.jsx(fe,{}),e.jsxs(h1,{children:[e.jsx(_e,{}),e.jsxs(p1,{children:[e.jsx(Me,{}),e.jsx(Ee,{}),e.jsxs(x1,{children:[e.jsx(Je,{receiverEmail:o||"youremail@hotmail.com"}),e.jsxs(u1,{children:[e.jsx(Te,{subject:s}),e.jsx(jt,{content:t,attachments:r,senderName:n,senderEmail:i})]})]})]})]})]}),c1=yt`
  .outlook {
    font-family: 'Segoe UI Regular';
  }
`,l1=a.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: #F5F5F5;
`,h1=a.div`
  height: 100%;
  width: 100%;
  display: flex;  
`,p1=a.div`
  width: 100%;
  box-sizing: border-box;
  padding-right: 18px;
  padding-left: 8px;
  
  @media(max-width: ${t=>t.theme.breakpoints.xs}) {
    padding: 0;
  }
`,x1=a.div`
  display: flex;
`,u1=a.div`
  width: 100%;
  padding-left: 30px;

  @media(max-width: ${t=>t.theme.breakpoints.sm}) {
    padding: 0;
  }
`;d1.__docgenInfo={description:"",methods:[],displayName:"Outlook",props:{content:{required:!0,tsType:{name:"HTMLElement"},description:""},senderName:{required:!0,tsType:{name:"OutlookCustomElements"},description:""},senderEmail:{required:!0,tsType:{name:"OutlookCustomElements"},description:""},receiverName:{required:!1,tsType:{name:"string"},description:""},receiverEmail:{required:!1,tsType:{name:"string"},description:""},subject:{required:!1,tsType:{name:"OutlookCustomElements"},description:""},attachments:{required:!1,tsType:{name:"Array",elements:[{name:"any"}],raw:"any[]"},description:""},explanations:{required:!1,tsType:{name:"Array",elements:[{name:"Explanation"}],raw:"Explanation[]"},description:""},explanationNumber:{required:!1,tsType:{name:"number"},description:""},showExplanations:{required:!1,tsType:{name:"boolean"},description:""}}};export{d1 as O};
