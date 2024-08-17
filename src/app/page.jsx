"use client";
import Image from "next/image";
import Loader from "./components/loader";
import ProfileImage from "./assets/images/profile.jpeg";
import CoinIcon from "./components/coinIcon";
import ButtonBGHexagon from "../app/assets/images/btnbghexagon.png";
import ButtonBGHexagon2 from "../app/assets/images/btnbghexagon2.png";
import VectorBG from "../app/assets/images/vectorbg.png";
import DailyReward from "./components/dailyReward";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "./context/UserContext";
import { useRouter } from "next/navigation";
export default function Home() {
   const router = useRouter();

   const [showDailyReward, setShowDailyReward] = useState(false);
   const [loading, setLoading] = useState(false);
   const { authState, onLogout, onLoginOrCreate, onGetBalance, isActive } =
      useAuth();

   const [balance, setBalance] = useState(0);
   useEffect(() => {
      const handleLogin = async () => {
         try {
            await onLoginOrCreate("1123131", "abcd");
            console.log("Logged In");
         } catch (error) {
            console.log(error);
         }
      };

      const handleBalance = async () => {
         try {
            setLoading(true);
            const bal = await onGetBalance();
            setBalance(bal.balance);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      handleLogin();
      handleBalance();
   }, []);

   const logout = () => {
      onLogout();
      router.push("/login");
   };
   if (loading) {
      return (
         <div className="w-full h-full bg-black">
            <Loader />
         </div>
      );
   }
   if (authState.authenticated) {
      return (
         <div className="main w-full h-full flex-1 bg-black flex flex-col relative">
            <DailyReward
               onClose={() => setShowDailyReward(false)}
               showDailyReward={showDailyReward}
            />

            <div className="profile-part flex-[4] w-full h-full relative flex items-center justify-center">
               <div className="absolute left-0 top-0 w-full h-full main-screen-gradient"></div>
               <div className="profile-info-container flex items-center gap-6 relative z-80">
                  <div className="profile-img w-24 h-24 rounded-full border-primary1 border overflow-hidden">
                     <Image
                        src={ProfileImage}
                        width={96}
                        height={96}
                        alt="profile"
                     />
                  </div>
                  <div className="profile-info-texts h-auto flex flex-col">
                     <h5 className="font-bold text-[21px]">
                        {authState.user.username}
                     </h5>
                     <div className="coin-text flex items-center gap-2">
                        <CoinIcon />
                        <h5 className="text-[20px] font-bold">{balance}</h5>
                     </div>
                  </div>
               </div>
            </div>
            <div className="buttons-part flex-[5] w-full h-full relative flex flex-col">
               <div className="white-fade absolute top-0 w-full h-20 left-0 z-50"></div>
               <Image
                  src={VectorBG}
                  className="absolute w-full h-auto vector-bg"
                  alt="hex"
               />
               <div className="button-container w-full px-8 relative z-[60] flex flex-col gap-[28px] mt-4">
                  <button
                     className="button w-full h-[88px] bg-grayBg rounded-lg overflow-hidden relative flex items-center justify-center"
                     onClick={() => setShowDailyReward(true)}
                  >
                     <Image
                        src={ButtonBGHexagon}
                        width={70}
                        className="absolute -bottom-4 -left-2"
                        alt="hex"
                     />
                     <Image
                        src={ButtonBGHexagon2}
                        width={70}
                        className="absolute -top-5 -right-2"
                        alt="hex"
                     />
                     <h5 className="text-lg font-bold drop-shadow-text">
                        Claim Daily Reward
                     </h5>
                  </button>
                  <Link
                     href="/game"
                     className="button w-full gap-4 h-[88px] bg-grayBg rounded-lg overflow-hidden relative flex items-center justify-center"
                  >
                     <h5 className="text-lg font-bold drop-shadow-text">
                        Play Drop Game
                     </h5>
                     <div className="px-4 py-1 rounded-xl bg-secondary3 text-black text-[13px] font-bold">
                        Play
                     </div>
                  </Link>
               </div>
            </div>
         </div>
      );
   } else {
      return (
         <div className="w-full h-full bg-black">
            <Loader />
         </div>
      );
   }
}
