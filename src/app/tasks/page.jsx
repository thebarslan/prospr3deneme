"use client";
import React, { useReducer, useState, useEffect } from "react";
import TasksLogo from "../assets/images/taskslogo.png";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import TonIcon from "../assets/images/icons/ton.png";
import EvmIcon from "../assets/images/icons/evm.png";
import { FaCircleCheck } from "react-icons/fa6";
import Loader from "../components/loader";
import { useAuth } from "../context/UserContext";
import TaskDone from "../components/taskDone";

const TwitterIcon = () => {
   return (
      <svg
         width="30"
         height="27"
         viewBox="0 0 30 27"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M23.6268 0.0710449H28.227L18.1768 11.3667L30 26.7377H20.7427L13.4918 17.4154L5.19538 26.7377H0.5924L11.3419 14.6557L0 0.0710449H9.49242L16.0465 8.59208L23.6268 0.0710449ZM22.0122 24.03H24.5613L8.10735 2.63651H5.372L22.0122 24.03Z"
            fill="white"
         />
      </svg>
   );
};
const YoutubeIcon = () => {
   return (
      <svg
         width="40"
         height="40"
         viewBox="0 0 40 40"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M39.164 10.3875C38.704 8.66682 37.3488 7.31126 35.6278 6.85128C32.5084 6.01562 19.9998 6.01562 19.9998 6.01562C19.9998 6.01562 7.49162 6.01562 4.37223 6.85128C2.65119 7.31126 1.29596 8.66682 0.835988 10.3875C0 13.5072 0 20.0154 0 20.0154C0 20.0154 0 26.5238 0.835988 29.6432C1.29596 31.3639 2.65119 32.7198 4.37223 33.1795C7.49162 34.0155 19.9998 34.0155 19.9998 34.0155C19.9998 34.0155 32.5084 34.0155 35.6278 33.1795C37.3488 32.7198 38.704 31.3639 39.164 29.6432C40 26.5238 40 20.0154 40 20.0154C40 20.0154 40 13.5072 39.164 10.3875Z"
            fill="#FF0000"
         />
         <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.9994 26.0155L26.3911 20.0158L15.9994 14.0154V26.0155Z"
            fill="white"
         />
      </svg>
   );
};
const TelegramIcon = () => {
   return (
      <svg
         width="40"
         height="40"
         viewBox="0 0 40 40"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z"
            fill="url(#paint0_linear_200_2016)"
         />
         <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.05173 19.7889C14.8821 17.2487 18.77 15.574 20.7153 14.7649C26.2695 12.4547 27.4236 12.0534 28.1758 12.0402C28.3413 12.0373 28.7112 12.0783 28.9509 12.2727C29.1532 12.4369 29.2089 12.6587 29.2355 12.8143C29.2621 12.97 29.2953 13.3246 29.2689 13.6017C28.968 16.7641 27.6656 24.4386 27.003 27.9807C26.7227 29.4794 26.1706 29.9819 25.6362 30.0311C24.4748 30.138 23.5928 29.2636 22.4679 28.5262C20.7077 27.3723 19.7132 26.654 18.0046 25.528C16.03 24.2268 17.31 23.5116 18.4354 22.3428C18.7299 22.0369 23.8472 17.3823 23.9462 16.9601C23.9586 16.9072 23.9701 16.7104 23.8532 16.6065C23.7362 16.5025 23.5636 16.5381 23.4391 16.5663C23.2625 16.6064 20.4505 18.4651 15.003 22.1423C14.2048 22.6904 13.4818 22.9574 12.8341 22.9434C12.12 22.928 10.7463 22.5397 9.72514 22.2077C8.47264 21.8006 7.47717 21.5853 7.56386 20.8939C7.60901 20.5337 8.10496 20.1654 9.05173 19.7889Z"
            fill="white"
         />
         <defs>
            <linearGradient
               id="paint0_linear_200_2016"
               x1="20"
               y1="0"
               x2="20"
               y2="39.7033"
               gradientUnits="userSpaceOnUse"
            >
               <stop stopColor="#2AABEE" />
               <stop offset="1" stopColor="#229ED9" />
            </linearGradient>
         </defs>
      </svg>
   );
};

const Tasks = () => {
   const { onGetTasks, onFinishTask, authState } = useAuth();
   const [tasksDeneme, setTasksDeneme] = useState([]);
   const [loading, setLoading] = useState(false);
   const [tasks, setTasks] = useState(false);
   useEffect(() => {
      const getTasks = async () => {
         try {
            setLoading(true);
            const tempTasks = await onGetTasks();
            setTasksDeneme(tempTasks);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };

      getTasks();
   }, [tasks]);

   const [isLoading, setIsLoading] = useState(false);

   const socialTasks = tasksDeneme.filter((task) => task.task.category === 1);
   const engagementTasks = tasksDeneme.filter(
      (task) => task.task.category === 3
   );
   const bonusTasks = tasksDeneme.filter((task) => task.task.category === 2);

   const handleTaskStart = async (taskId) => {
      setTasksDeneme((prevTasks) =>
         prevTasks.map((task) =>
            task.id === taskId ? { ...task, completed: false } : task
         )
      );
      setTimeout(() => {
         setTasksDeneme((prevTasks) =>
            prevTasks.map((task) =>
               task.id === taskId ? { ...task, completed: true } : task
            )
         );
         finishTask(taskId);
      }, 1000);
   };

   const [showTaskDone, setShowTaskDone] = useState(false);
   const [selectedTask, setSelectedTask] = useState(null);
   const handleTaskSelection = (task) => {
      setSelectedTask(task);
      setShowTaskDone(true);
   };
   if (loading) {
      return (
         <div className="w-full h-full bg-black">
            <Loader />
         </div>
      );
   }

   return (
      <div className="main w-full h-full flex-1 bg-black flex flex-col  pl-1 pr-3 relative">
         <TaskDone
            onClose={() => setShowTaskDone(false)}
            showTaskDone={showTaskDone}
            task={selectedTask}
            onTaskDone={() => setTasks(!tasks)}
         />
         <div className=" h-full w-full flex flex-col">
            <div className="tasks-logo-container w-full px-10 flex justify-center items-center mt-4">
               <Image src={TasksLogo} alt="logo" />
            </div>
            <div className="total-tasks-container h-full w-full overflow-y-auto scroll flex flex-col mb-[76px]">
               <div className="tasks-container w-full pl-3 pr-2 gap-4 flex flex-col mt-4 h-auto">
                  <h5 className="text-[20px]">Social Tasks</h5>
                  {socialTasks.map((task) => {
                     return (
                        <div
                           className="task w-full h-[72px] bg-grayBg rounded-2xl flex justify-between px-6"
                           key={task.id}
                        >
                           <div className="left flex gap-3 h-full items-center">
                              <div className="icon-container w-10 flex justify-center items-center">
                                 {task.task.name.includes("X") && (
                                    <BsTwitterX className="w-8 h-auto" />
                                 )}

                                 {task.task.name.includes("Youtube") && (
                                    <YoutubeIcon className="w-8 h-auto" />
                                 )}
                                 {task.task.name.includes("Telegram") && (
                                    <TelegramIcon className="w-8 h-auto" />
                                 )}
                              </div>
                              <div className="task-info-container flex flex-col gap-0">
                                 <h5 className="text-[16px] font-extrabold">
                                    {task.task.name}
                                 </h5>
                                 <h5 className="font-normal text-[14px]">
                                    +{task.task.rewards} P3
                                 </h5>
                              </div>
                           </div>
                           <div className="right w-[52px] h-full flex items-center justify-end">
                              {task.completed ? (
                                 <FaCircleCheck
                                    color="#00CD46"
                                    className="text-[#00CD46] w-7 h-auto"
                                 />
                              ) : (
                                 <>
                                    {task.taskIsLoading ? (
                                       <div className="abc h-8 w-8">
                                          <Loader />
                                       </div>
                                    ) : (
                                       <button
                                          className="w-full h-8 bg-secondary2 text-black text-[12px] rounded-xl"
                                          onClick={() =>
                                             handleTaskSelection(task)
                                          }
                                       >
                                          Start
                                       </button>
                                    )}
                                 </>
                              )}
                           </div>
                        </div>
                     );
                  })}
               </div>
               <div className="tasks-container w-full pl-3 pr-2 gap-4 flex flex-col mt-6 h-auto">
                  <h5 className="text-[20px]">Engagement Tasks</h5>

                  {engagementTasks.map((task) => {
                     return (
                        <div
                           className="task w-full h-[72px] bg-grayBg rounded-2xl flex justify-between px-6"
                           key={task.id}
                        >
                           <div className="left flex gap-3 h-full items-center">
                              <div className="icon-container w-10 flex justify-center items-center">
                                 {task.task.name.includes("X") && (
                                    <BsTwitterX className="w-8 h-auto" />
                                 )}

                                 {task.task.name.includes("Youtube") && (
                                    <YoutubeIcon className="w-8 h-auto" />
                                 )}
                                 {task.task.name.includes("Telegram") && (
                                    <TelegramIcon className="w-8 h-auto" />
                                 )}
                              </div>
                              <div className="task-info-container flex flex-col gap-0">
                                 <h5 className="text-[16px] font-extrabold">
                                    {task.task.name}
                                 </h5>
                                 <h5 className="font-normal text-[14px]">
                                    +{task.task.rewards} P3
                                 </h5>
                              </div>
                           </div>
                           <div className="right w-[52px] h-full flex items-center justify-end">
                              {task.completed ? (
                                 <FaCircleCheck
                                    color="#00CD46"
                                    className="text-[#00CD46] w-7 h-auto"
                                 />
                              ) : (
                                 <>
                                    {task.taskIsLoading ? (
                                       <div className="abc h-8 w-8">
                                          <Loader />
                                       </div>
                                    ) : (
                                       <button
                                          className="w-full h-8 bg-secondary2 text-black text-[12px] rounded-xl"
                                          onClick={() =>
                                             handleTaskSelection(task)
                                          }
                                       >
                                          Start
                                       </button>
                                    )}
                                 </>
                              )}
                           </div>
                        </div>
                     );
                  })}
               </div>
               <div className="tasks-container w-full pl-3 pr-2 gap-4 flex flex-col mt-8 h-auto mb-4">
                  <h5 className="text-[20px]">Bonus Tasks</h5>

                  {bonusTasks.map((task) => {
                     return (
                        <div
                           className="task w-full h-[72px] bg-grayBg rounded-2xl flex justify-between px-6"
                           key={task.id}
                        >
                           <div className="left flex gap-3 h-full items-center">
                              <div className="icon-container w-10 flex justify-center items-center">
                                 {task.taskSocial === "Ton" && (
                                    <Image
                                       src={TonIcon}
                                       className="w-10 h-auto"
                                       alt="ton"
                                    />
                                 )}
                                 {task.taskSocial === "EVM" && (
                                    <Image
                                       src={EvmIcon}
                                       className="w-10 h-auto"
                                       alt="evm"
                                    />
                                 )}
                                 {task.task.name.includes("Email") && (
                                    <IoIosMail className="w-9 h-auto" />
                                 )}
                              </div>
                              <div className="task-info-container flex flex-col gap-0">
                                 <h5 className="text-[16px] font-extrabold">
                                    {task.task.name}
                                 </h5>
                                 <h5 className="font-normal text-[14px]">
                                    +{task.task.rewards} P3
                                 </h5>
                              </div>
                           </div>
                           <div className="right w-[52px] h-full flex items-center justify-end">
                              {task.completed ? (
                                 <FaCircleCheck
                                    color="#00CD46"
                                    className="text-[#00CD46] w-7 h-auto"
                                 />
                              ) : (
                                 <>
                                    {task.taskIsLoading ? (
                                       <div className="abc h-8 w-8">
                                          <Loader />
                                       </div>
                                    ) : (
                                       <button
                                          className="w-full h-8 bg-secondary2 text-black text-[12px] rounded-xl"
                                          onClick={() =>
                                             handleTaskSelection(task)
                                          }
                                       >
                                          Start
                                       </button>
                                    )}
                                 </>
                              )}
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Tasks;
