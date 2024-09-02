import React from "react";

const Login = () => {
   return (
      <div className="w-full h-full bg-black flex flex-col relative">
         <div className="gradient absolute w-full h-1/2 top-0 left-0 main-screen-gradient z-10"></div>
         <div className="main-container w-full h-full flex flex-col relative z-20 justify-center">
            <div className="top flex-2 h-full w-full flex flex-col justify-center">
               <div className="title-container w-full flex items-center justify-center">
                  <h5 className="font-bold text-[24px]">Register to Prospr3</h5>
               </div>
               <div className="input-container w-full flex flex-col px-8 justify-center mt-10">
                  <h5 className="pl-3 text-[15px] mb-[2px]">Username</h5>
                  <input
                     type="text"
                     className="w-full h-12 rounded-lg border-2 border-white bg-transparent pl-3 font-semibold"
                  />
               </div>
            </div>
            <div className="button-container w-full flex flex-1 h-full  px-8 mt-8 items-end">
               <button className="invite-a-friend w-full bg-secondary3 h-12 rounded-xl flex-1 flex items-center justify-center">
                  <h5 className="text-black text-[18px]">Register</h5>
               </button>
            </div>
         </div>
      </div>
   );
};

export default Login;
