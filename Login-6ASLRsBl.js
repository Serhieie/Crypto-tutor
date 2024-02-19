import{q as v,u as y,t as F,v as R,j as e,H as I,w as L,x as M,o as z,g as N,b as h,s as a,y as E,z as B,L as k,A as W,m as q,n as V,B as $}from"./index-cl39Kmpm.js";import{M as P}from"./index-xnvHTYX1.js";const H=({windowSize:t})=>{const{showPassword:r}=v(),l=y(),i=F(R),m=()=>{l(M())},s=o=>{const d=o.target.value;l(z(d))},n=t.height>460?"md3:mt-9":"md3:mt-0";return e.jsxs(e.Fragment,{children:[e.jsxs("label",{className:`
        ${n}
        mt-9 text-xl flex items-center gap-2 md:ml-2 font-medium
      md2:text-sm  sm:mt-1 font-montserrat text-darkFontDark `,htmlFor:"userEmail",children:[" ","Email"," "]}),e.jsx("input",{onChange:s,className:`text-[#CBD5E1] bg-slate-500 placeholder:text-darkFontDark 
         mx-auto w-full py-1 rounded-lg px-5  h-12 
          border-0 outline-none font-montserrat
           placeholder:font-base
             md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:text-base  font-medium  transition-all  2xl2:text-2xl`,type:"email",name:"userEmail",id:"userEmail",placeholder:"Balambino@mail.com",value:i.email||"",required:!0}),e.jsxs("label",{className:` mt-2 text-xl flex items-center gap-2 md:ml-2 
       md2:text-sm text-darkFontDark font-medium sm:mt-1`,htmlFor:"userPassword",children:[" ","Password"," "]}),e.jsxs("div",{className:"flex",children:[e.jsx("input",{className:` text-[#CBD5E1] bg-slate-500 placeholder:text-darkFontDark 
             mx-auto  py-1 px-5 rounded-l-lg h-12 border-0 outline-none   
           placeholder:font-base font-montserrat
            md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:text-base w-full  font-medium  transition-all  2xl2:text-2xl`,type:`${r?"text":"password"}`,name:"userPassword",id:"userPassword",placeholder:"Enter your password",min:7,required:!0}),e.jsx("button",{id:"login-psw-btn",className:`text-[#CBD5E1]  font-montserrat
           placeholder:text-darkFontDark
           rounded-r-lg w-12 transition-all`,type:"button",onClick:m,children:r?e.jsx(I,{size:24}):e.jsx(L,{size:24})})]})]})},T=()=>{const t=y(),{isRefreshing:r,user:l,resended:i,isChangePasswordModalOpen:m}=N(),[s,n]=h.useState(30),[o,d]=h.useState(""),w=()=>{t(E(!1)),t(a(!1))},b=()=>{t(E(!0))},f=c=>{const x=c.target.value;d(x)},p=()=>{if(!o)return;t(a(!0)),t(B({email:o}));const c=setInterval(()=>{n(x=>x===0?(clearInterval(c),t(a(!1)),30):x-1)},1e3);console.log(s)};return s<30&&r&&t(a(!1)),e.jsxs(e.Fragment,{children:[e.jsxs(P,{onCancel:w,open:m,footer:null,children:[e.jsx("h1",{className:" text-3xl text-center  mb-6 mt-8 text-slate-700 font-montserrat ",children:"Forgot your Password?"}),e.jsx("p",{className:"text-lg text-center text-slate-500 mb-3 font-montserrat ",children:"Send your email and confirm change password request"}),e.jsxs("form",{action:"Form Validation",children:[e.jsx("label",{htmlFor:"inputEmailChangePass",children:e.jsx("input",{type:"text",name:"inputEmailChangePass",placeholder:l.email,onChange:f,value:o,required:!0,className:`text-slate-700 bg-slate-200 placeholder:text-darkFontDark 
 w-[80%] mx-auto py-1 rounded-lg px-5  h-12 
          border-0 outline-none font-montserrat
           placeholder:font-base flex
             md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:text-base  font-medium  transition-all  2xl2:text-2xl `})}),e.jsx("div",{className:"flex mt-8",children:e.jsx("button",{type:"button",onClick:p,disabled:!!(i||s<30),className:`
  'shadow-none hover:bg-blue-700 text-buttonTextColorDark  bg-blue-900'
     text-center text-lg md:w-48 font-semibold w-40 h-11 rounded-md border-none outline-none 
      mx-auto cursor-pointer shadow-md  mb-8 flex items-center justify-around transition-all duration-300 
      ssm:w-40 ssm:h-10 md2:text-sm disabled:opacity-30 font-montserrat `,children:s<30?`${s} sec`:"Send"})})]})]}),e.jsx("button",{onClick:b,"aria-label":"change password button",id:"forgot-password",type:"button",className:`text-blue-400 font-medium font-montserrat 
        border-none bg-transparent w-44 outline-none select-none `,children:"Forgot your password?"})]})},U=()=>{const t=y(),{isLoading:r}=v(),{isVerifyModalOpen:l,isRefreshing:i,user:m,resended:s}=N(),[n,o]=h.useState(30),[d,w]=h.useState({width:window.innerWidth,height:window.innerHeight}),b=()=>{t(a(!0)),t(q({email:m.email}));const g=setInterval(()=>{o(u=>u===0?(clearInterval(g),t(a(!1)),30):u-1)},1e3)};n<30&&i&&t(a(!1));const f=()=>{t(V(!1)),t(a(!1))},p=()=>{w({width:window.innerWidth,height:window.innerHeight})};h.useEffect(()=>(window.addEventListener("resize",p),()=>{window.removeEventListener("resize",p)}),[]);const j=async g=>{g.preventDefault();const u=g.currentTarget,S=u.elements.namedItem("userEmail"),C=u.elements.namedItem("userPassword"),D={email:S.value.trim(),password:C.value.trim()};t($(D)),C.value=""},c=d.height>460?"md3:w-5/12 pb-12":"md3:w-10/12   md2:mt-1 pb-1";return e.jsxs(e.Fragment,{children:[e.jsxs(P,{open:l,onCancel:f,footer:null,children:[e.jsx("h1",{className:" text-3xl text-center mb-8 text-slate-700 font-montserrat ",children:"Email is not verified"}),e.jsx("p",{className:"text-lg text-center font-montserrat text-slate-500",children:"Before start you should verify email"}),e.jsx("p",{className:"mt-3 text-lg text-center text-blue-900 font-montserrat  font-semibold",children:m.email}),e.jsxs("div",{className:"flex mt-12 items-center",children:[e.jsx(k,{text:"Accept",isLoading:i,onClick:f}),e.jsx("button",{id:"reg-btn-resend",type:"button",onClick:b,disabled:!!(s||n<30),className:`
  'shadow-none hover:bg-blue-700 text-buttonTextColorDark  bg-blue-900'
     text-center text-lg md:w-48 font-semibold w-40 h-11 rounded-md border-none outline-none 
      mx-auto cursor-pointer shadow-md  mb-8 flex items-center justify-around transition-all duration-300 
      ssm:w-40 ssm:h-10 md2:text-sm disabled:opacity-30   font-montserrat `,children:n<30?`${n} sec`:"Resend"})]})]}),e.jsxs("form",{onSubmit:j,autoComplete:"off",className:`
        ${c} 
          shadow-shadowBoxDark from-smallWraperGradient1Dark to-smallWraperGradient2Dark   flex gap-2 flex-col   pt-20  px-10 rounded-xl
          shadow-lg bg-gradient-to-tr md2:mt-4  md2:pt-8  md:pb-14 md:px-5 md:min-h-0 md:w-[96%]
          transition-all  ssm2:-mt-4 ssm2:pt-28  mx-auto z-20 mt-2 `,children:[e.jsx("h1",{className:`text-center text-4xl m-0 md:text-2xl
         md2:text-2xl font-medium mt-2 text-darkFontDark font-montserrat`,children:"Login"}),e.jsx(H,{windowSize:d}),e.jsx(T,{}),e.jsxs(W,{className:"text-blue-400 font-medium  mt-4 mb-28 flex gap-4 font-montserrat ",to:"/registration",children:[e.jsx("p",{className:"text-slate-300 font-medium font-montserrat",children:"Have no account?"}),"Registrate now"]}),e.jsx(k,{text:"Sign in",isLoading:r})]})]})};export{U as default};
