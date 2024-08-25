"use client";
import Image from "next/image";
import Loader from "./components/loader";
import ProfileImage from "./assets/images/profile.jpeg";
import CoinIcon from "./components/coinIcon";
import ButtonBGHexagon from "../app/assets/images/btnbghexagon.png";
import ButtonBGHexagon2 from "../app/assets/images/btnbghexagon2.png";
import VectorBG from "../app/assets/images/vectorbg.png";
import DailyReward from "./components/dailyReward";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "./context/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
   const router = useRouter();

   const [showDailyReward, setShowDailyReward] = useState(false);
   const [loading, setLoading] = useState(false);
   const [haveProfileImg, setHaveProfileImg] = useState(false);
   const [onClaim, setOnClaim] = useState(false);
   const {
      authState,
      onLogout,
      onLoginOrCreate,
      onGetBalance,
      isActive,
      onGetGameSettings,
      onGetGameInfo,
   } = useAuth();

   const [maxFreePlayableGames, setMaxFreePlayableGames] = useState(0);
   const [maxPaidPlayableGames, setMaxPaidPlayableGames] = useState(0);

   const [freePlayableGames, setFreePlayableGames] = useState(0);
   const [paidPlayableGames, setPaidPlayableGames] = useState(0);

   const [canPlayFree, setCanPlayFree] = useState(true);
   const [canPlay, setCanPlay] = useState(true);

   const [balance, setBalance] = useState(0);

   const [telegramId, setTelegramId] = useState();
   const [telegramUsername, setTelegramUsername] = useState("");
   const [telegramPhotoUrl, setTelegramPhotoUrl] = useState("");

   const [telegramUser, setTelegramUser] = useState();
   const prevTelegramId = useRef(null);

   const [error, setError] = useState("");

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);

         const tele = window.Telegram?.WebApp;

         // Platform kontrolü ve Telegram uygulamasının başlatılması

         tele?.ready();
         tele?.expand();

         const user = tele?.initDataUnsafe?.user;

         if (user) {
            setTelegramUser(user);
            setTelegramId(user.id);
            setTelegramUsername(user.username);
            setError("User authenticated via Telegram.");
         } else {
            // Eğer kullanıcı bilgisi yoksa default değerleri ayarla
            setTelegramId("5577120511");
            setTelegramUsername("thebarslan");
            setTelegramPhotoUrl("");
            setError("Default user loaded.");
         }

         const handleLogin = async () => {
            try {
               const result = await onLoginOrCreate(
                  telegramId,
                  telegramUsername
               );
               setTelegramPhotoUrl(result.profile_photo_url);
               console.log("Logged In", result);
            } catch (error) {
               console.log(error);
            }
         };

         const handleBalance = async () => {
            try {
               const bal = await onGetBalance();
               setBalance(bal.balance);
            } catch (error) {
               console.log(error);
            }
         };

         const handleGameSettings = async () => {
            try {
               const result = await onGetGameSettings();
               setMaxFreePlayableGames(result.daily_free_games);
               setMaxPaidPlayableGames(result.daily_paid_game_limit);
               handleGamePlayed(
                  result.daily_free_games,
                  result.daily_paid_game_limit
               );
            } catch (error) {
               console.log(error);
            }
         };

         const getGameInfo = async () => {
            try {
               const result = await onGetGameInfo();
               setFreePlayableGames(result["free-daily_games_left"]);
               setPaidPlayableGames(result["daily_paid_games_left"]);
            } catch (error) {
               console.log(error);
            }
         };

         // Oyun oynama sınırlarını kontrol etme
         const handleGamePlayed = (freeLimit, paidLimit) => {
            setCanPlayFree(freeLimit > 0);
            setCanPlay(paidLimit > 0);
         };

         // Asenkron işlemleri sırayla çalıştır
         if (telegramId && telegramUsername) {
            await handleLogin();
            await handleBalance();
            await getGameInfo();
            await handleGameSettings();
         }

         // Son olarak kullanıcı kimlik doğrulamasını kontrol et
         setError(authState.authenticated ? "OK" : "NOT OK");
         setLoading(false);
      };

      fetchData();
   }, [
      authState,
      onClaim,
      telegramId,
      telegramUsername,
      telegramPhotoUrl,
      telegramUser,
   ]);

   useEffect(() => {
      handleProfilePicture();
   }, [telegramPhotoUrl]);
   useEffect(() => {
      logout();
   }, []);

   const handleProfilePicture = () => {
      let url = telegramPhotoUrl;
      if (url === "" || url === null || url === undefined) {
         setHaveProfileImg(false);
         return;
      }

      setHaveProfileImg(true);
   };
   const logout = () => {
      onLogout();
      router.push("/");
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
         <DailyReward
            onClose={() => setShowDailyReward(false)}
            showDailyReward={showDailyReward}
            onClaim={() => setOnClaim(true)}
         />
         <h5 className="hidden">{authState.token}</h5>
         <button className="hidden" onClick={logout}>
            Logout
         </button>
         {/* <button onClick={logout}>Logout</button>
         <h5>{telegramPhotoUrl}</h5>
         <h5>{typeof telegramPhotoUrl}</h5> */}
         <div className="profile-part flex-[4] w-full h-full relative flex items-center justify-center">
            <div className="absolute left-0 top-0 w-full h-full main-screen-gradient"></div>
            <div className="profile-info-container flex items-center gap-6 relative z-80">
               <div className="profile-img w-24 h-24 rounded-full border-primary1 border overflow-hidden">
                  {haveProfileImg ? (
                     <Image
                        src={telegramPhotoUrl}
                        width={96}
                        height={96}
                        alt="profile"
                     />
                  ) : (
                     <div className="profile-icon-div w-24 h-24 rounded-full bg-black flex items-center justify-center">
                        <h5 className="text-[32px] font-extrabold text-white uppercase">
                           {telegramUsername.split("")[0]}
                        </h5>
                     </div>
                  )}
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
                  disabled={!canPlay}
               >
                  {canPlay ? (
                     <>
                        <h5 className="text-lg font-bold drop-shadow-text">
                           {canPlay && canPlayFree && "Daily Free Game"}
                           {canPlay && !canPlayFree && "Daily Paid Game"}
                        </h5>
                        <div className="px-4 py-1 rounded-xl bg-secondary3 text-black text-[13px] font-bold">
                           Play
                        </div>
                     </>
                  ) : (
                     <h5 className="text-lg font-bold drop-shadow-text">
                        Come tomorrow to play.
                     </h5>
                  )}
               </Link>
            </div>
         </div>
      </div>
   );
   if (loading) {
      return (
         <div className="w-full h-full bg-black">
            <Loader />
         </div>
      );
   }
}
