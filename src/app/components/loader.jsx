import React from "react";

const Loader = ({ color = "#b275fd", width = "50px" }) => {
   return (
      <div className="w-full h-full flex items-center justify-center flex-1">
         <div
            className="loader"
            style={{ background: color, width: width }}
         ></div>
      </div>
   );
};

export default Loader;
