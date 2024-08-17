"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonBGHexagon from "../assets/images/btnbghexagon.png";
import ButtonBGHexagon2 from "../assets/images/btnbghexagon2.png";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useAuth } from "../context/UserContext";
import Loader from "./loader";
import CoinIcon from "./coinIcon";

const TaskDone = ({ onClose, showTaskDone, task, onTaskDone }) => {
   const { onGetTasks, onFinishTask, authState } = useAuth();
   const [loading, setLoading] = useState(false);
   const [user_input, setUserInput] = useState("");
   const finishTask = async (taskId) => {
      try {
         await onFinishTask(taskId, user_input);
      } catch (error) {
         console.log(error);
      }
   };
   const handleFinishTask = () => {
      var taskId = task.id;
      setLoading(true);
      finishTask(taskId);
      setTimeout(() => {
         setLoading(false);
         onClose();
         onTaskDone();
      }, 6000);
   };

   return (
      <>
         <AnimatePresence>
            {showTaskDone && (
               <motion.div
                  key="daily-reward"
                  className="w-full h-[70%] absolute -bottom-6 left-0  z-[500]"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "tween", duration: 0.2 }}
               >
                  <div className="w-full h-full absolute flex bottom-0 left-0 bg-grayBg z-[901] rounded-t-3xl daily-reward-container">
                     <div className="relative w-full h-full overflow-hidden rounded-t-3xl flex-1 flex">
                        <div className="inside-container w-full h-full overflow-hidden rounded-t-3xl flex-1 flex flex-col">
                           <Image
                              src={ButtonBGHexagon}
                              width={90}
                              className="absolute -top-4 -left-0 rotate-90"
                              alt="hex"
                           />
                           <Image
                              src={ButtonBGHexagon2}
                              width={80}
                              className="absolute -top-10 right-0"
                              alt="hex"
                           />
                           <div className="top px-6 flex w-full mt-[80px] items-center">
                              <div className="empty w-[40px] h-auto"></div>
                              <div className="title w-full h-auto flex-1 justify-center flex drop-shadow-text">
                                 <h5 className="text-xl font-bold">
                                    {task.task.name}
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
                           <div className="reward w-full flex gap-1 items-center justify-center mt-2">
                              <h5 className="text-[16px] font-medium mr-2">
                                 Receive
                              </h5>
                              <CoinIcon size={20} />
                              <h5 className="text-[16px] font-bold ml-[2px]">
                                 +{task.task.rewards}
                              </h5>
                           </div>
                           <div className="w-full h-full flex flex-col justify-center flex-1 mb-6">
                              {task.task.requires_user_input && (
                                 <>
                                    <div className="claim-button-container  flex items-center justify-center mt-0 px-6">
                                       <input
                                          className="w-full h-[48px] bg-black rounded-xl outline-none border-2 border-secondary3 text-white pl-2"
                                          placeholder={"Enter your email"}
                                          value={user_input}
                                          onChange={(e) =>
                                             setUserInput(e.target.value)
                                          }
                                       />
                                    </div>
                                 </>
                              )}

                              <div className="claim-button-container  flex items-center justify-center mt-6 px-6 ">
                                 <button
                                    className="w-full h-[48px] bg-secondary3 rounded-xl"
                                    onClick={handleFinishTask}
                                    disabled={loading}
                                 >
                                    {loading ? (
                                       <>
                                          <Loader width="30px" color="white" />
                                       </>
                                    ) : (
                                       "Do the task"
                                    )}
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   );
};

export default TaskDone;
