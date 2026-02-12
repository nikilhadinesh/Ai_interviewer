"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/loader.json"; 

const HourglassLoader = () => {
  return (
    
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500">
      
      
      <div className="w-64 h-64 md:w-80 md:h-80">
        <Lottie animationData={animationData} loop={true} />
      </div>

      
      <p className="mt-4 text-lg font-medium text-gray-300 animate-pulse">
        Preparing your interview environment...
      </p>

    </div>
  );
};

export default HourglassLoader;