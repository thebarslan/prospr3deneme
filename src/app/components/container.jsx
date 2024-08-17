import React from "react";

const Container = ({ children }) => {
   return (
      <div className="container w-screen h-screen max-w-[500px] max-h-[900px] bg-main-bg relative overflow-hidden bg-black">
         {children}
      </div>
   );
};

export default Container;
