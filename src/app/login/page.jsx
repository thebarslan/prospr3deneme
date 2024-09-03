"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext";
import { useRouter } from "next/navigation";

const Login = () => {
   const router = useRouter();
   const [Username, setUsername] = useState();
   const [TelegramID, setTelegramID] = useState();
   const { authState, onLoginOrCreate } = useAuth();

   const getTelegramID = () => {
      const tele = window.Telegram?.WebApp;

      tele?.ready();
      tele?.expand();

      const user = tele?.initDataUnsafe?.user;

      if (user) {
         setTelegramID(user.id);
      }
   };

   useEffect(() => {
      getTelegramID();
   }, [authState]);

   const handleRegister = async () => {
      try {
         const result = await onLoginOrCreate(TelegramID, Username);
         router.push("/");
         console.log(result.status);
      } catch (error) {
         console.log(error);
      }
   };
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
                     value={Username}
                     onChange={() => setUsername()}
                  />
               </div>
            </div>
            <div className="button-container w-full flex flex-1 h-full  px-8 mt-8 items-end">
               <button
                  className="invite-a-friend w-full bg-secondary3 h-12 rounded-xl flex-1 flex items-center justify-center"
                  onClick={handleRegister}
               >
                  <h5 className="text-black text-[18px]">Register</h5>
               </button>
            </div>
         </div>
      </div>
   );
};

export default Login;
