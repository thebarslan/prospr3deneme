"use client";
import React, { useState, useEffect, useRef } from "react";
import CoinIcon from "../components/coinIcon";
import Image from "next/image";
import VectorBG from "../../app/assets/images/vectorbg.png";
import { useAuth } from "../context/UserContext";
import Loader from "../components/loader";
import CoinIconImage from "../components/coinIconImage";
import Link from "next/link";

const CoinIconPressable = ({
   id,
   left = 0,
   type = 0,
   onRemove,
   gainPoints,
   moveSpeed,
   defaultImage,
   secondImage,
   thirdImage,
}) => {
   const handleInteraction = (event) => {
      event.preventDefault();

      // Get the icon's position
      const { x, y } = divRef.current.getBoundingClientRect();

      // Gain points and remove the coin icon immediately
      gainPoints(type);
      onRemove(id);

      // Trigger the explosion
      // onExplosionComplete({ x, y });
   };

   const { authState, onGetGameSettings } = useAuth();
   const [top, setTop] = useState(0);
   const divRef = useRef(null);

   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android|iPad|iPhone|iPod/i.test(userAgent)) {
         setIsMobile(true);
      }
   }, []);

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
      }, moveSpeed); // Adjust the '30' for smoother/faster movement

      return () => clearInterval(moveInterval);
   }, [id, onRemove]);

   return (
      <div
         ref={divRef}
         className={`absolute cursor-pointer p-2`}
         style={{ left: `${left}%`, top: `${top}px` }}
         onClick={!isMobile ? handleInteraction : null}
         onTouchStart={isMobile ? handleInteraction : null}
      >
         {type === 0 && <CoinIconImage size={48} url={defaultImage} />}
         {type === 1 && (
            <CoinIconImage size={48} url={defaultImage} withPlus={true} />
         )}
         {type === 2 && <CoinIconImage size={48} url={secondImage} />}
         {type === 3 && <CoinIconImage size={48} url={thirdImage} />}
      </div>
   );
};

const Game = () => {
   const { authState, onGetGameSettings, onStartGame } = useAuth();
   const [loading, setLoading] = useState(true);

   const [spawnSpeed, setSpawnSpeed] = useState(0);
   const [moveSpeed, setMoveSpeed] = useState(0);
   const [defaultImage, setDefaultImage] = useState("");
   const [secondImage, setSecondImage] = useState("");
   const [thirdImage, setThirdImage] = useState("");

   const [currentScore, setCurrentScore] = useState(0);
   const [tempScoreDene, setTempScoreDene] = useState(0);
   const [isGameOver, setIsGameOver] = useState(false);
   const [coinIcons, setCoinIcons] = useState([]);
   const [timeLeft, setTimeLeft] = useState(60);
   const { onGameEndSendScore } = useAuth();

   useEffect(() => {
      if (!isGameOver && !loading) {
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
   }, [isGameOver, loading]);

   useEffect(() => {
      handleStartGame();
      const handleGameSettings = async () => {
         try {
            setLoading(true);
            const result = await onGetGameSettings();
            let tempSpawnSpeed = result.spawn_speed;
            tempSpawnSpeed = ((100 - tempSpawnSpeed) / 100) * 500;
            console.log(tempSpawnSpeed);
            setSpawnSpeed(tempSpawnSpeed);
            console.log(result.spawn_speed);
            let tempMoveSpeed = result.move_speed;
            tempMoveSpeed = ((100 - tempMoveSpeed) / 100) * 10;
            console.log(tempMoveSpeed);
            setMoveSpeed(tempMoveSpeed);
            console.log(result.move_speed);
            setDefaultImage(result.game_icon);
            setSecondImage(result.game_icon2);
            setThirdImage(result.game_icon3);

            // Use setTimeout to introduce a 1-second delay
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };

      handleGameSettings();
   }, []);

   useEffect(() => {
      if (isGameOver) {
         handleGameEnd();
      }
   }, [isGameOver]);

   const handleStartGame = async () => {
      try {
         await onStartGame();
      } catch (error) {
         console.log(error);
         // Handle the error appropriately, maybe show a message to the user
      }
   };

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
      if (!isGameOver && !loading) {
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
         }, spawnSpeed);

         return () => {
            clearInterval(spawnInterval);
         };
      }
   }, [coinIcons, isGameOver, loading]);

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
   if (loading) {
      return (
         <div className="w-full h-full bg-black">
            <Loader />
         </div>
      );
   }
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
                  className="bg-secondary2 text-black h-[60px] w-[220px] rounded-xl flex items-center justify-center gap-1"
                  onClick={handleRestart}
               >
                  <h5 className="text-black text-[17px]">Earn More Points</h5>
                  <CoinIcon size={24} />
               </button>
               <Link
                  className="bg-secondary1 text-black h-[60px] w-[220px] rounded-xl flex items-center justify-center gap-1"
                  href="/"
               >
                  <h5 className="text-black text-[17px]">
                     Return to Main Menu
                  </h5>
               </Link>
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
                     moveSpeed={moveSpeed}
                     defaultImage={defaultImage}
                     secondImage={secondImage}
                     thirdImage={thirdImage}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Game;
