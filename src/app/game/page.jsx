"use client";
import React, { useState, useEffect, useRef } from "react";
import CoinIcon from "../components/coinIcon";
import Image from "next/image";
import VectorBG from "../../app/assets/images/vectorbg.png";
import { useAuth } from "../context/UserContext";

const CoinIconPressable = ({
   id,
   left = 0,
   type = 0,
   onRemove,
   gainPoints,
}) => {
   const handleClick = () => {
      gainPoints(type); // Call gainPoints first if needed
      onRemove(id);
   };
   const [top, setTop] = useState(0);
   const divRef = useRef(null);

   useEffect(() => {
      const moveInterval = setInterval(() => {
         setTop((prevTop) => prevTop + 1); // Adjust the '1' for desired speed

         // Check if the icon has moved out of the viewport
         if (divRef.current) {
            const { bottom } = divRef.current.getBoundingClientRect();
            if (bottom > window.innerHeight) {
               onRemove(id); // Remove the icon if it's out of view
            }
         }
      }, 6); // Adjust the '30' for smoother/faster movement

      return () => clearInterval(moveInterval);
   }, [id, onRemove]);

   return (
      <div
         ref={divRef}
         className={`absolute cursor-pointer`}
         style={{ left: `${left}%`, top: `${top}px` }}
         onClick={handleClick}
      >
         {type === 0 && <CoinIcon size={48} />}
         {type === 1 && <CoinIcon size={48} withPlus={true} />}
         {type === 2 && <CoinIcon size={48} color="#FF0404" />}
      </div>
   );
};

const Game = () => {
   const [currentScore, setCurrentScore] = useState(0);
   const [tempScoreDene, setTempScoreDene] = useState(0);
   const [isGameOver, setIsGameOver] = useState(false);
   const [coinIcons, setCoinIcons] = useState([]);
   const [timeLeft, setTimeLeft] = useState(60);
   const { onGameEndSendScore } = useAuth();

   useEffect(() => {
      if (!isGameOver) {
         const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
               if (prevTime > 0) {
                  return prevTime - 1;
               } else {
                  setIsGameOver(true); // Set game over when time reaches 0
                  return 0;
               }
            });
         }, 1000);
         return () => {
            clearInterval(timerInterval);
         };
      }
   }, [isGameOver]);

   useEffect(() => {
      if (isGameOver) {
         handleGameEnd();
      }
   }, [isGameOver]);

   const handleSendScore = async (score) => {
      try {
         await onGameEndSendScore(score); // Wait for score to be sent
         // Set isGameOver only after score is sent
      } catch (error) {
         console.log(error);
         // Handle the error appropriately, maybe show a message to the user
      }
   };

   const handleGameEnd = () => {
      var score = currentScore;
      handleSendScore(score); // Remove 'await' here
   };

   useEffect(() => {
      if (!isGameOver) {
         const spawnInterval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 100);

            let type;
            if (randomNumber < 75) {
               // 0-74 (75%)
               type = 0;
            } else if (randomNumber < 90) {
               // 75-89 (15%)
               type = 1;
            } else {
               // 90-99 (10%)
               type = 2;
            }
            const newIcon = {
               id: Date.now(), // Use timestamp for unique id
               left: Math.random() * 85, // Random left position (0-90%)
               type: type, // Random type (0, 1, or 2)
            };
            setCoinIcons([...coinIcons, newIcon]);
         }, 250);

         return () => {
            clearInterval(spawnInterval);
         };
      }
   }, [coinIcons, isGameOver]);

   const handleRestart = () => {
      handleSendScore(-10);
      setTimeLeft(60);
      setCurrentScore(0);
      setIsGameOver(false);
      setCoinIcons([]);
   };
   useEffect(() => {
      console.log("Current Score:", currentScore);
   }, [currentScore]);
   const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
         .toString()
         .padStart(2, "0")}`;
   };
   const handleRemoveCoinIcon = (id) => {
      setCoinIcons(coinIcons.filter((icon) => icon.id !== id));
   };
   const handleOnClick = (type) => {
      // Receive 'type' directly
      var tempScore = currentScore;
      if (type === 0) {
         tempScore += 1;
      }
      if (type === 1) {
         tempScore += 2;
      }
      if (type === 2) {
         tempScore -= 10;
         if (tempScore < 0) {
            tempScore = 0;
         }
      }
      setCurrentScore(tempScore);
   };
   return (
      <div className="main w-full h-full flex-1 bg-black flex flex-col relative">
         {isGameOver && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col gap-6 items-center justify-center z-10">
               <button
                  className="bg-secondary3 text-black h-[60px] w-[220px] rounded-xl flex items-center justify-center gap-1"
                  onClick={handleRestart}
               >
                  <h5 className="text-black text-[17px]">Play Again 10</h5>
                  <CoinIcon size={24} />
               </button>
               <button
                  className="bg-secondary1 text-black h-[60px] w-[220px] rounded-xl flex items-center justify-center gap-1"
                  onClick={handleRestart}
               >
                  <h5 className="text-black text-[17px]">Earn More Points</h5>
                  <CoinIcon size={24} />
               </button>
            </div>
         )}
         <Image
            src={VectorBG}
            className="absolute w-full h-[130%] vector-bg -top-[76px] rotate-180"
         />
         <div className="absolute top-6 w-full h-[42px]  px-6 ">
            <div className="flex justify-between w-full h-full">
               <div className="coin-count-container w-[96px] bg-opacity-20 bg-[#EAD9FF33] relative z-[500] rounded-xl flex items-center justify-center">
                  <CoinIcon size={26} />
                  <div className="text-container w-10 flex justify-center ">
                     <h5 className="text-[22px] font- font-extrabold">
                        {currentScore}
                     </h5>
                  </div>
               </div>
               <div className="coin-count-container w-[96px] bg-opacity-20 bg-[#EAD9FF33] relative z-[500] rounded-xl flex items-center justify-center">
                  <h5 className="text-[22px] font- font-extrabold">
                     {formatTime(timeLeft)}
                  </h5>
               </div>
            </div>
         </div>

         <div className="spawn-point absolute -top-20 w-full">
            <div className="spawn-point relative w-full h-20 bg-red-400">
               {coinIcons.map((icon) => (
                  <CoinIconPressable
                     key={icon.id}
                     id={icon.id}
                     left={icon.left}
                     type={icon.type}
                     onRemove={handleRemoveCoinIcon}
                     gainPoints={handleOnClick}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Game;
