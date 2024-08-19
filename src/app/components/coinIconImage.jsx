import Image from "next/image";
import React from "react";

const CoinIconImage = ({ size = 28, withPlus = false, url, type = 0 }) => {
   return (
      <div className="coinIcon relative">
         {withPlus && (
            <div className="absolute -top-4 -right-2">
               <h5 className="text-[24px] font-extrabold">+1</h5>
            </div>
         )}
         <Image
            src={
               (type === 0 && url) ||
               (type === 1 && url) ||
               (type === 2 && secondUrl) ||
               (type === 3 && thirdUrl)
            }
            width={size}
            height={28}
            alt="icon"
         />
      </div>
   );
};

export default CoinIconImage;
