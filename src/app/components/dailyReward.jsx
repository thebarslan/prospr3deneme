import React, { useState, useEffect } from "react";
import ButtonBGHexagon from "../assets/images/btnbghexagon.png";
import ButtonBGHexagon2 from "../assets/images/btnbghexagon2.png";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import CoinIcon from "./coinIcon";
import { useAuth } from "../context/UserContext";

const DailyReward = ({ onClose, showDailyReward, onClaim }) => {
   const { onGetDailyRewards, authState, onGetUserRewards, onGetDailyReward } =
      useAuth();
   const [rewards, setRewards] = useState([]);
   const [rewardsInfo, setRewardsInfo] = useState([]);
   const [firstUnclaimedReward, setFirstUnclaimedReward] = useState(null);
   const [lastReceivedRewardIndex, setLastReceivedRewardIndex] = useState(2);
   const [isClaimable, setIsClaimable] = useState(true);
   const [isClaiming, setIsClaiming] = useState(false);
   const [coinAnimationActive, setCoinAnimationActive] = useState(false);
   const coinSpawnPosY = [800, 1120, 990, 1400, 1600, 1520, 1250, 1000, 850];
   const coinSpawnPosX = [50, 120, 390, 240, 520, 780, 400, 820, 950];
   const claimDelay = 2;

   const getDailyRewards = async () => {
      try {
         const tempRewards = await onGetDailyRewards();
         setRewards(tempRewards);
         for (const item of tempRewards) {
            if (item.claimed === false) {
               console.log("First Unclaimed Reward :" + item.day);
               setFirstUnclaimedReward(item);
               return;
            }
         }
      } catch (error) {
         console.log(error);
      }
   };

   const getUserRewards = async () => {
      try {
         const tempRewards = await onGetUserRewards();

         console.log(tempRewards);

         setRewardsInfo(tempRewards);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getDailyRewards();
      getUserRewards();
   }, []);
   useEffect(() => {
      const getRewardsTime = () => {
         if (
            rewardsInfo &&
            rewardsInfo.length > 0 &&
            firstUnclaimedReward !== null
         ) {
            const lastRewardTime =
               rewardsInfo[firstUnclaimedReward?.day - 2]?.claimed_at;
            const currentTime = new Date(); // Get the current time

            // Calculate the time difference in milliseconds
            const timeDifference =
               currentTime.getTime() - new Date(lastRewardTime).getTime();

            const oneDayMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds

            if (timeDifference < oneDayMilliseconds) {
               setIsClaimable(false);
               console.log("false");
               return;
            }
         }

         setIsClaimable(true);
      };

      getRewardsTime();
   }, [rewardsInfo, firstUnclaimedReward]);

   const getDailyReward = async () => {
      try {
         await onGetDailyReward();
      } catch (error) {
         console.log(error);
      }
   };
   const handleClaim = () => {
      setIsClaiming(true);
      setCoinAnimationActive(true);

      setTimeout(() => {
         setIsClaiming(false);
         setCoinAnimationActive(false);
         setIsClaimable(false);
         getDailyReward();
         getDailyRewards();
         getUserRewards();
         onClaim();
         // Perform actual reward claiming logic here
      }, claimDelay * 1000); // Convert delay to milliseconds
   };

   function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
   }

   return (
      <>
         {showDailyReward && (
            <div className="absolute w-full h-full bg-black top-0 left-0 z-[700]"></div>
         )}
         <AnimatePresence>
            {showDailyReward && (
               <motion.div
                  key="daily-reward"
                  className="w-full h-[92%] absolute -bottom-[2px] left-0 z-[12000]"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "tween", duration: 0.2 }}
               >
                  <div className="w-full h-full absolute flex bottom-0 left-0 bg-grayBg z-[1000] rounded-t-[52px] daily-reward-container">
                     <div className="relative w-full h-full overflow-hidden rounded-t-[52px] flex-1 flex">
                        <div className="inside-container w-full h-full overflow-hidden rounded-t-[52px]  flex-1 flex flex-col">
                           <Image
                              src={ButtonBGHexagon}
                              width={98}
                              className="absolute -top-[12px] -left-[0px]"
                              alt="hex"
                           />
                           <Image
                              src={ButtonBGHexagon}
                              width={98}
                              className="absolute -top-[32px] right-5"
                              alt="hex"
                           />
                           <div className="top px-6 flex w-full mt-[64px] items-center">
                              <div className="empty w-[40px] h-auto"></div>
                              <div className="title w-full h-auto flex-1 justify-center flex drop-shadow-text">
                                 <h5 className="text-[24px] font-bold">
                                    Daily Reward
                                 </h5>
                              </div>
                              <div className="close w-[40px] h-auto">
                                 <button
                                    className="close-btn w-7 h-7 rounded-full bg-[#4C4B4B] flex items-center justify-center"
                                    onClick={onClose}
                                 >
                                    <IoClose color="red" className="w-5 h-5" />
                                 </button>
                              </div>
                           </div>
                           <div className="text w-full flex items-center justify-center mt-1">
                              <h6 className="font-normal text-[16px]">
                                 Claim your daily reward.
                              </h6>
                           </div>
                           <div className="reward-outer-container w-full h-full  mt-[2px] flex items-center flex-1 ">
                              <div className="rewards-container w-full px-6 grid grid-cols-4 grid-rows-3 flex-1 gap-3 mt-0">
                                 {/* Added gap for spacing */}
                                 {rewards.map((item) => (
                                    <div
                                       key={item.day} // Key is correctly placed
                                       className={`reward w-full aspect-[14/15] rounded-xl flex items-center justify-center flex-col gap-[2px] ${
                                          !item.claimed
                                             ? "bg-black"
                                             : "bg-[#191919]"
                                       }
                                             ${
                                                firstUnclaimedReward !== null &&
                                                firstUnclaimedReward.day ===
                                                   item.day &&
                                                isClaimable &&
                                                "border border-secondary3"
                                             }`} // Conditional styling
                                    >
                                       <span className="text-white text-[12px] font-bold">
                                          Day {item.day}
                                       </span>
                                       <span className="text-white font-semibold">
                                          <CoinIcon size={22} />
                                       </span>
                                       <span className="text-white font-bold text-[14px]">
                                          {item.amount}
                                       </span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <div className="claim-button-container mb-6 flex items-center justify-center mt-0">
                              <button
                                 className={`w-[60%] rounded-xl bg-primary1 h-12 text-black ${
                                    !isClaimable && "bg-[#3A0088] text-white"
                                 }`}
                                 onClick={handleClaim}
                                 disabled={isClaiming || !isClaimable}
                              >
                                 {!isClaimable
                                    ? "Come back tomorrow"
                                    : isClaiming
                                    ? "Claim..."
                                    : "Claim"}
                              </button>
                           </div>
                           {coinAnimationActive && (
                              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                                 {coinAnimationActive && (
                                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                                       {[...Array(9)].map((_, i) => {
                                          const initialY =
                                             randomIntFromInterval(800, 1800);
                                          const duration =
                                             coinSpawnPosY[i] / 400; // Calculate duration based on initialY
                                          return (
                                             <motion.div
                                                key={i}
                                                initial={{
                                                   x: `${coinSpawnPosX[i]}%`,
                                                   y: `${coinSpawnPosY[i]}%`,
                                                }}
                                                animate={{ y: "-100%" }} // Move upwards
                                                transition={{
                                                   duration, // Dynamic duration
                                                   ease: "linear",
                                                   repeat: Infinity,
                                                }}
                                                className="absolute w-8 h-8"
                                             >
                                                <CoinIcon size={36} />
                                             </motion.div>
                                          );
                                       })}
                                    </div>
                                 )}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   );
};

export default DailyReward;
