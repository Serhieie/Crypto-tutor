import{j as t,S as g,d as c,u as h,e as f,f as b,P as j,s as y,h as E,a as u,L as k,l as D}from"./index-hgbd0DML.js";import{H as S}from"./index-bB3Pyd6O.js";const v=({text:a,isLoading:e})=>t.jsx("button",{id:"log-btn",type:"submit",disabled:e,className:`
  'shadow-none hover:bg-blue-700 text-buttonTextColorDark  bg-blue-900'
     text-center text-lg md:w-48 font-light w-40 h-11 rounded-md border-none outline-none 
      mx-auto cursor-pointer shadow-md mt-28 mb-8 flex items-center justify-around transition-all duration-300 
      ssm:w-40 ssm:h-10 md2:text-sm `,children:e?t.jsx(g,{size:"large"}):t.jsx(t.Fragment,{children:a})}),C=({windowSize:a})=>{const{showPassword:e}=c(),s=h(),r=f(b),n=()=>{s(y())},l=i=>{const o=i.target.value;s(E(o))},m=a.height>460?"md3:mt-9":"md3:mt-0";return t.jsxs(t.Fragment,{children:[t.jsxs("label",{className:`
        ${m}
        mt-9 text-xl flex items-center gap-2 md:ml-2 font-medium
      md2:text-sm  sm:mt-1 font-montserrat text-darkFontDark `,htmlFor:"userEmail",children:[" ","Email"," "]}),t.jsx("input",{onChange:l,className:`text-[#CBD5E1] bg-slate-500 placeholder:text-darkFontDark 
         mx-auto w-full py-1 rounded-lg px-5  h-12 
          border-0 outline-none font-montserrat
           placeholder:font-base
             md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:text-base  font-medium  transition-all  2xl2:text-2xl`,type:"email",name:"userEmail",id:"userEmail",placeholder:"Balambino@mail.com",value:r.email||"",required:!0}),t.jsxs("label",{className:` mt-2 text-xl flex items-center gap-2 md:ml-2 
       md2:text-sm text-darkFontDark font-medium sm:mt-1`,htmlFor:"userPassword",children:[" ","Password"," "]}),t.jsxs("div",{className:"flex",children:[t.jsx("input",{className:` text-[#CBD5E1] bg-slate-500 placeholder:text-darkFontDark 
             mx-auto  py-1 px-5 rounded-l-lg h-12 border-0 outline-none   
           placeholder:font-base font-montserrat
            md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:text-base w-full  font-medium  transition-all  2xl2:text-2xl`,type:`${e?"text":"password"}`,name:"userPassword",id:"userPassword",placeholder:"Enter your password",min:7,required:!0}),t.jsx("button",{id:"login-psw-btn",className:`text-[#CBD5E1]  font-montserrat
           placeholder:text-darkFontDark
           rounded-r-lg w-12 transition-all`,type:"button",onClick:n,children:e?t.jsx(S,{size:24}):t.jsx(j,{size:24})})]})]})},P=()=>{const a=h(),{isLoading:e}=c(),[s,r]=u.useState({width:window.innerWidth,height:window.innerHeight}),n=()=>{r({width:window.innerWidth,height:window.innerHeight})};u.useEffect(()=>(window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}),[]);const l=async o=>{o.preventDefault();const d=o.currentTarget,p=d.elements.namedItem("userEmail"),x=d.elements.namedItem("userPassword"),w={email:p.value.trim(),password:x.value.trim()};a(D(w)),x.value=""},m=s.height>460?"md3:w-5/12 pb-12":"md3:w-10/12   md2:mt-1 pb-1";return t.jsx(t.Fragment,{children:t.jsxs("form",{onSubmit:l,autoComplete:"off",className:`
        ${m} 
          shadow-shadowBoxDark from-smallWraperGradient1Dark to-smallWraperGradient2Dark   flex gap-2 flex-col   pt-20  px-10 rounded-xl
          shadow-lg bg-gradient-to-tr md2:mt-4  md2:pt-8  md:pb-14 md:px-5 md:min-h-0 md:w-[96%]
          transition-all  ssm2:-mt-4 ssm2:pt-28  mx-auto z-20 mt-2 `,children:[t.jsx("h1",{className:`text-center text-4xl m-0 md:text-2xl
         md2:text-2xl font-medium mt-2 text-darkFontDark font-montserrat`,children:"Login"}),t.jsx(C,{windowSize:s}),t.jsxs(k,{className:"text-blue-400 font-medium  mt-12 flex gap-4 font-montserrat ",to:"/registration",children:[t.jsx("p",{className:"text-slate-300 font-medium font-montserrat",children:"Have no account?"}),"Registrate now"]}),t.jsx(v,{text:"Sign in",isLoading:e})]})})};export{P as default};
