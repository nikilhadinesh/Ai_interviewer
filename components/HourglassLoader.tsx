"use client"; // Client component ah irukanum

import React from "react";
import Lottie from "lottie-react";
// 👇 Namma download panna JSON file inga import panrom
import animationData from "@/public/loader.json"; 

const HourglassLoader = () => {
  return (
    // 🌑 Full Screen Dark Overlay with Blur
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500">
      
      {/* ⏳ The Lottie Animation */}
      <div className="w-64 h-64 md:w-80 md:h-80">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* ✍️ Optional Text */}
      <p className="mt-4 text-lg font-medium text-gray-300 animate-pulse">
        Preparing your interview environment...
      </p>

    </div>
  );
};

export default HourglassLoader;