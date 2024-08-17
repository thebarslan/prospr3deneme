import React from "react";

const CoinIcon = ({ size = 28, color = "#5000BB", withPlus = false }) => {
   return (
      <div className="coinIcon relative">
         {withPlus && (
            <div className="absolute -top-4 -right-2">
               <h5 className="text-[24px] font-extrabold">+1</h5>
            </div>
         )}
         <svg
            width={size}
            height={0.84 * size}
            viewBox="0 0 25 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <mask
               id="mask0_30_800"
               maskUnits="userSpaceOnUse"
               x="0"
               y="0"
               width="25"
               height="21"
            >
               <path
                  d="M0.472656 0.117401H24.8076V20.828H0.472656V0.117401Z"
                  fill="white"
               />
            </mask>
            <g mask="url(#mask0_30_800)">
               <mask
                  id="mask1_30_800"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="25"
                  height="21"
               >
                  <path
                     d="M24.799 10.4727L18.7175 20.828H6.5544L0.472656 10.4727L6.5544 0.117401H18.7175L24.799 10.4727Z"
                     fill="white"
                  />
               </mask>
               <g mask="url(#mask1_30_800)">
                  <path
                     d="M0.472656 0.117401H24.8079V20.828H0.472656V0.117401Z"
                     fill={color}
                  />
               </g>
            </g>
            <path
               d="M17.6258 7.56634V8.49518C17.6258 10.1017 16.3028 11.4124 14.6811 11.4124H11.6948V9.55819H14.5561C15.3687 9.55819 16.0319 8.89768 16.0319 8.06516C16.0319 7.23264 15.3687 6.59965 14.5561 6.59965H9.79183V16.2355H7.90625V4.64908H14.6811C16.3028 4.64908 17.6258 5.95978 17.6258 7.56634Z"
               fill="white"
            />
         </svg>
      </div>
   );
};

export default CoinIcon;
