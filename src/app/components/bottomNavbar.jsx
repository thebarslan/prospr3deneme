"use client";
import React, { useState, useEffect } from "react";
import HomeIcon from "../assets/images/icons/home.png";
import HomeSelectedIcon from "../assets/images/icons/homepurple.png";
import TasksIcon from "../assets/images/icons/tasks.png";
import TasksSelectedIcon from "../assets/images/icons/taskspurple.png";
import InviteIcon from "../assets/images/icons/invite.png";
import InviteSelectedIcon from "../assets/images/icons/invitepurple.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavbar = () => {
   const pathname = usePathname();
   const [pageIndex, setPageIndex] = useState(0);
   const [indicatorLeft, setIndicatorLeft] = useState(0); // State for indicator position

   useEffect(() => {
      // Update indicator position when pageIndex changes
      if (pageIndex === 0) {
         setIndicatorLeft(13);
      } else if (pageIndex === 1) {
         // Calculate center of the container and adjust for half the indicator's width
         const containerWidth =
            document.querySelector(".bottom-navbar .container")?.offsetWidth ||
            0;
         setIndicatorLeft(containerWidth / 2 - 6); // Adjust as needed
      } else if (pageIndex === 2) {
         // Adjust as needed
         const containerWidth =
            document.querySelector(".bottom-navbar .container")?.offsetWidth ||
            0;
         setIndicatorLeft(containerWidth - 26);
      }
   }, [pageIndex]);
   useEffect(() => {
      if (pathname === "/") {
         setPageIndex(0);
      }
      if (pathname === "/tasks") {
         setPageIndex(1);
      }
      if (pathname === "/invite") {
         setPageIndex(2);
      }
   }, [pathname]);
   if (pathname === "/login") {
      return null; // Don't render the navbar on the login page
   } else {
      return (
         <div className="bottom-navbar fixed bottom-0 w-full max-w-[500px] h-[72px] bg-grayBg flex items-center px-11 z-[600]">
            <div className="container w-full flex justify-between items-center relative h-full">
               <Link
                  href="/"
                  className="item flex flex-col gap-[2px] items-center justify-start"
                  onClick={() => setPageIndex(0)}
               >
                  <Image
                     src={pageIndex === 0 ? HomeSelectedIcon : HomeIcon}
                     width={24}
                     height={24}
                  />
                  <h5
                     className={`text-[14px] font-bold ${
                        pageIndex === 0 ? "text-secondary3" : "text-white"
                     }`}
                  >
                     Home
                  </h5>
               </Link>
               <Link
                  href="/tasks"
                  className="item flex flex-col gap-[2px] items-center justify-center"
                  onClick={() => setPageIndex(1)}
               >
                  <Image
                     src={pageIndex === 1 ? TasksSelectedIcon : TasksIcon}
                     width={24}
                     height={24}
                  />
                  <h5
                     className={`text-[14px] font-bold ${
                        pageIndex === 1 ? "text-secondary3" : "text-white"
                     }`}
                  >
                     Tasks
                  </h5>
               </Link>
               <Link
                  href="/invite"
                  className="item flex flex-col gap-[2px] items-center justify-start"
                  onClick={() => setPageIndex(2)}
               >
                  <Image
                     src={pageIndex === 2 ? InviteSelectedIcon : InviteIcon}
                     width={24}
                     height={24}
                  />
                  <h5
                     className={`text-[14px] font-bold ${
                        pageIndex === 2 ? "text-secondary3" : "text-white"
                     }`}
                  >
                     Invite
                  </h5>
               </Link>

               {/* <div
                  className={`indexShow absolute w-4 h-2 bg-secondary3 bottom-0 rounded-t-xl transition-left duration-300`}
                  style={{ left: indicatorLeft }}
               ></div> */}
            </div>
         </div>
      );
   }
};
