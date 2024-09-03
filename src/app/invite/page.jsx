"use client";
import React, { useState, useEffect } from "react";
import GiftImage from "../assets/images/invitegiftimg.png";
import GiftImage2 from "../assets/images/invitegiftimg2.png";
import Image from "next/image";
import CoinIcon from "../components/coinIcon";
import { FaCheck, FaUserFriends } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import Loader from "../components/loader";
import { useAuth } from "../context/UserContext";
const Invite = () => {
   const { onGetReferrals, authState, onGetReferralsCode } = useAuth();
   const [verifiedInvites, setVerifiedInvites] = useState(0);
   const [totalInvites, setTotalInvites] = useState(0);
   const [sliderWidth, setSliderWidth] = useState(0);

   const [referrals, setReferrals] = useState([]);
   const [loading, setLoading] = useState(false);
   const [refCode, setRefCode] = useState("");

   const [Copied, setCopied] = useState(false);

   const handleInviteClick = () => {
      const tele = window.Telegram?.WebApp;
      if (tele) {
         tele.openTelegramLink(
            `https://t.me/share/url?url=${encodeURIComponent(
               refCode
            )}&text=Join%20using%20my%20referral%20code`
         );
      } else {
         console.log("Telegram WebApp is not available");
      }
   };

   useEffect(() => {
      const getReferrals = async () => {
         try {
            setLoading(true);
            console.log(authState.token);
            const tempRef = await onGetReferrals();
            setReferrals(tempRef);
            console.log(tempRef);
            setLoading(false);
            setVerifiedInvites(tempRef.length);
            setTotalInvites(tempRef.length);
         } catch (error) {
            console.log(error);
         }
      };
      const getRefCode = async () => {
         try {
            const tempRefCode = await onGetReferralsCode();
            setRefCode(tempRefCode.referral_link);
            console.log(tempRefCode.referral_link);
         } catch (error) {
            console.log(error);
         }
      };
      getReferrals();
      getRefCode();
   }, []);

   useEffect(() => {
      if (verifiedInvites === 0) {
         setSliderWidth(0);
         return;
      }
      setSliderWidth((verifiedInvites / totalInvites) * 100);
   }, [verifiedInvites, totalInvites]);
   if (loading) {
      return (
         <div className="w-full h-full bg-black">
            <Loader />
         </div>
      );
   }
   const handleCopyIcon = () => {
      setCopied(true);
      setTimeout(() => {
         setCopied(false);
      }, 2000);
   };
   const copyRefCode = () => {
      handleCopyIcon();
      console.log(refCode);
      navigator.clipboard.writeText(refCode);
   };

   return (
      <div className="main w-full h-full flex-1 bg-black flex flex-col relative justify-between">
         <div className="flex flex-col h-full flex-1 w-full  justify-between">
            <div className="invite-text-title w-full text-center flex flex-col mt-5 ">
               <h5 className="text-[22px]">Invite your friends</h5>
               <h5 className="text-[16px] font-medium mt-1">
                  Earn more points
               </h5>
            </div>
            <div className="invite-infos w-full flex flex-col gap-2 px-6 mt-3 ">
               <div className="invite-bonus w-full rounded-xl bg-grayBg   flex flex-col gap-0 justify-center">
                  <div className="invite-text w-full text-center flex flex-col">
                     <h5 className="text-[15px]">Invite Bonus</h5>
                  </div>
                  <div className="invite-text w-full text-center flex flex-col">
                     <h5 className="text-[12px] font-medium">
                        Earn 1000 points for you and your friend
                     </h5>
                  </div>
                  <div className="invite-img flex items-center justify-center relative">
                     <div className="container flex items-center w-auto justify-center">
                        <Image src={GiftImage} className="w-auto gift-icon" />
                        <div className="w-[50px] bg-red-400 h-full flex items-center">
                           <div className="text flex items-center gap-1 relative">
                              <h5 className="text-[16px] absolute -left-4 -top-1">
                                 +1000
                              </h5>
                              <div className="absolute left-8 -top-[1px] ">
                                 <CoinIcon size={20} />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="invite-bonus w-full h-[100px] rounded-xl bg-grayBg flex flex-col gap-0 justify-center">
                  <div className="invite-text w-full text-center flex flex-col">
                     <h5 className="text-[15px]">Invite Boost</h5>
                  </div>
                  <div className="invite-text w-full text-center flex flex-col">
                     <h5 className="text-[12px] font-medium">
                        Earn 5% of all points earned by your referrals
                     </h5>
                  </div>
                  <div className="invite-img flex items-center justify-center relative">
                     <div className="container flex items-center w-auto justify-center">
                        <Image src={GiftImage2} className="w-auto gift-icon" />
                        <div className="w-[50px]  h-full flex items-center">
                           <div className="text flex items-center gap-1 relative">
                              <h5 className="text-[16px] absolute -left-2 -top-1">
                                 +5%
                              </h5>
                              <div className="absolute left-6 -top-[1px] ">
                                 <CoinIcon size={20} />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="my-invites px-6 w-full flex flex-col mt-1 ">
               <div className="text w-full text-center">
                  <h5>My Invites</h5>
               </div>

               <div className="my-invites-inside w-full h-[100px] rounded-xl bg-grayBg flex flex-col gap-0 justify-center mt-2 px-5">
                  <div className="slider w-full h-8 rounded-full relative bg-black overflow-hidden">
                     {verifiedInvites !== 0 && (
                        <div
                           className="absolute h-full left-0 top-0 bg-primary1 rounded-full flex items-center px-4 gap-2"
                           style={{ width: `${sliderWidth}%` }}
                        ></div>
                     )}
                     <div className="inside absolute flex gap-2 items-center w-full h-full pl-4">
                        <FaUserFriends />
                        <h5 className="text-[14px] font-medium ">
                           Joined: {totalInvites}
                        </h5>
                     </div>
                  </div>
                  <div className="verified px-2 mt-2">
                     <h5 className="text-[14px] font-medium">
                        Verified: {verifiedInvites}
                     </h5>
                  </div>
               </div>
            </div>
         </div>
         <div className="invite-part w-full flex items-end mb-[30px] ">
            <div className="invite w-full px-6 flex gap-3 mt-4">
               <button
                  className="invite-a-friend w-full bg-secondary3 h-14 rounded-xl flex-1 flex items-center justify-center"
                  onClick={handleInviteClick}
               >
                  <h5 className="text-black text-[18px]">Invite a friend</h5>
               </button>
               <button
                  className={`copy-link w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                     Copied ? "bg-[#00CD46]" : "bg-secondary3"
                  }`}
                  onClick={copyRefCode}
               >
                  {Copied ? (
                     <FaCheck
                        color="white"
                        className="text-white w-7 h-auto"
                        fill="white"
                     />
                  ) : (
                     <svg
                        width="30"
                        height="30"
                        viewBox="0 0 29 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill-rule="evenodd"
                           clip-rule="evenodd"
                           d="M20.3948 6.79435C20.2883 4.95707 18.7647 3.5 16.9007 3.5H7.56738L7.36173 3.50594C5.52446 3.6124 4.06738 5.13604 4.06738 7V16.3333L4.07332 16.539C4.17978 18.3763 5.70342 19.8333 7.56738 19.8333H8.73405V21C8.73405 22.933 10.3011 24.5 12.234 24.5H21.5674C23.5004 24.5 25.0674 22.933 25.0674 21V11.6667C25.0674 9.73367 23.5004 8.16667 21.5674 8.16667H20.4007V7L20.3948 6.79435ZM19.2351 10.5C19.2348 10.5 19.2344 10.5 19.2341 10.5C19.2337 10.5 19.2333 10.5 19.233 10.5H12.234C11.5897 10.5 11.0674 11.0223 11.0674 11.6667V18.6656C11.0674 18.666 11.0674 18.6663 11.0674 18.6667C11.0674 18.667 11.0674 18.6674 11.0674 18.6677V21C11.0674 21.6443 11.5897 22.1667 12.234 22.1667H21.5674C22.2117 22.1667 22.734 21.6443 22.734 21V11.6667C22.734 11.0223 22.2117 10.5 21.5674 10.5H19.2351ZM8.73405 17.5V11.6667C8.73405 9.73367 10.3011 8.16667 12.234 8.16667H18.0674V7C18.0674 6.40169 17.617 5.90858 17.0368 5.84118L16.9007 5.83333H7.56738C6.96907 5.83333 6.47596 6.28371 6.40857 6.86394L6.40072 7V16.3333C6.40072 16.9316 6.8511 17.4248 7.43133 17.4922L7.56738 17.5H8.73405Z"
                           fill="#212121"
                        />
                     </svg>
                  )}
               </button>
            </div>
         </div>
      </div>
   );
};

export default Invite;
