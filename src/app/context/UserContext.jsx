"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import Loader from "../components/loader";
import { usePathname } from "next/navigation";

const TOKEN_KEY = "my-jwt";
const USER_KEY = "user-data";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [authState, setAuthState] = useState(() => {
      // Check if window and localStorage exist before accessing them
      if (typeof window !== "undefined" && window.localStorage) {
         return {
            token: localStorage.getItem(TOKEN_KEY) || null,
            authenticated: !!localStorage.getItem(TOKEN_KEY) || false,
            user: JSON.parse(localStorage.getItem(USER_KEY)) || {
               username: "",
               id: null,
               balance: 0,
            },
         };
      } else {
         // If localStorage is not available, return a default unauthenticated state
         return {
            token: null,
            authenticated: false,
            user: {
               username: "",
               id: null,
               balance: 0,
            },
         };
      }
   });
   const pathname = usePathname();

   const apiClient = axios.create({
      baseURL: "https://q4k6d8kz-8000.euw.devtunnels.ms",
      headers: {
         Authorization: `Token ${authState.token}`,
         Accept: "application/json",
      },
   });
   const loadAuthData = () => {
      try {
         const token = localStorage.getItem(TOKEN_KEY);
         const storedUserData = localStorage.getItem(USER_KEY);
         // ... rest of your loadAuthData logic
         if (token && storedUserData) {
            const userData = JSON.parse(storedUserData);
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;
            setAuthState({
               token: token,
               authenticated: true,
               user: userData,
            });
         }
      } catch (error) {
         console.error("Error accessing localStorage:", error);
         // Handle the error gracefully, e.g., set a default unauthenticated state
         setAuthState({
            token: null,
            authenticated: false,
            user: { username: "", id: null, balance: 0 },
         });
      }
   };
   //    const loadAuthData = () => {
   //       const token = localStorage.getItem(TOKEN_KEY);
   //       const storedUserData = localStorage.getItem(USER_KEY);
   //       if (token && storedUserData) {
   //          const userData = JSON.parse(storedUserData);
   //          axios.defaults.headers.common["Authorization"] = `Token ${token}`;
   //          setAuthState({
   //             token: token,
   //             authenticated: true,
   //             user: userData,
   //          });
   //       }
   //    };
   useEffect(() => {
      // Check for authentication data immediately on component mount
      loadAuthData();
   }, []); // Empty dependency array ensures this runs only once

   const getGameSettings = async () => {
      try {
         const response = await apiClient.get("/game/settings/current/", {});
         const data = response.data;
         return data;
      } catch (error) {
         console.log(error);
      }
   };

   const getBalance = async () => {
      try {
         const response = await apiClient.get("/users/users/my_balance/", {});
         const data = response.data;
         return data;
      } catch (error) {
         console.log(error);
      }
   };
   const getDailyRewards = async () => {
      try {
         const response = await apiClient.get(
            "/rewards/user-daily-rewards/reward_status/",
            {}
         );
         const data = response.data;
         console.log(data);
         return data;
      } catch (error) {
         console.log(error);
      }
   };
   const getUserRewards = async () => {
      try {
         const response = await apiClient.get(
            "/rewards/user-daily-rewards/",
            {}
         );
         const data = response.data;
         console.log(data);
         return data;
      } catch (error) {
         console.log(error);
      }
   };
   const getDailyReward = async () => {
      try {
         const response = await apiClient.post(
            "/rewards/user-daily-rewards/claim_reward/",
            {}
         );
         const data = response.data;
         console.log(data);
         return data;
      } catch (error) {
         console.log(error);
      }
   };

   const gameEndSendScore = async (score) => {
      try {
         const response = await apiClient.post("/game/game/end_game/", {
            score,
         });
         const data = response.data;
         console.log(data);
         return data;
      } catch (error) {
         console.log(error);
      }
   };
   const getTasks = async () => {
      try {
         const response = await apiClient.get("/tasks/user-tasks/", {});
         const data = response.data;
         console.log(data);
         return data;
      } catch (error) {
         console.log(error);
      }
   };
   const finishTask = async (id, user_input) => {
      try {
         console.log(id);
         const response = await apiClient.post(
            `/tasks/user-tasks/${id}/complete/`,
            { user_input: user_input } // Send an empty object in the body
         );
         const data = response.data;
         console.log(data);
         return data;
      } catch (error) {
         console.log(error.response ? error.response.data : error.message);
      }
   };
   const getReferrals = async () => {
      try {
         const response = await apiClient.get(
            "/referrals/referrals/my_referrals/",
            {}
         );
         const data = response.data;
         console.log(data);
         return data;
      } catch (error) {
         console.log(error);
      }
   };
   const getReferralsCode = async () => {
      try {
         const response = await apiClient.get(
            "/referrals/referrals/my_referral_link/",
            {}
         );
         const data = response.data;
         console.log(data);
         return data;
      } catch (error) {
         console.log(error);
      }
   };

   const loginOrCreateWithUsername = async (
      telegram_user_id,
      telegram_username
   ) => {
      setIsLoading(true);
      if (localStorage.getItem(TOKEN_KEY)) {
         console.log("Kullanıcı zaten giriş yapmış.");
         console.log(authState.user);
         return;
      }
      try {
         const response = await apiClient.post("/users/users/start_bot/", {
            telegram_user_id,
            telegram_username,
         });
         const data = response.data;
         console.log(data);
         localStorage.setItem(TOKEN_KEY, data.token);
         localStorage.setItem(USER_KEY, JSON.stringify(data));

         setAuthState({
            token: data.token,
            authenticated: true,
            user: {
               username: data.telegram_username,
               id: data.user_id,
               balance: data.balance,
            },
         });
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   const logout = () => {
      try {
         localStorage.removeItem(TOKEN_KEY);
         localStorage.removeItem(USER_KEY);
         axios.defaults.headers.common["Authorization"] = "";
         setAuthState({
            token: null,
            authenticated: false,
            user: {
               username: "",
               id: null,
               balance: 0,
            },
         });
      } catch (e) {
         console.error(e);
      }
   };

   const value = {
      onLoginOrCreate: loginOrCreateWithUsername,
      onLogout: logout,
      authState,
      isLoading,
      onGetBalance: getBalance,
      onGetTasks: getTasks,
      onFinishTask: finishTask,
      onGetReferrals: getReferrals,
      onGetReferralsCode: getReferralsCode,
      onGetDailyRewards: getDailyRewards,
      onGetDailyReward: getDailyReward,
      onGetUserRewards: getUserRewards,
      onGameEndSendScore: gameEndSendScore,
      onGetGameSettings: getGameSettings,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
