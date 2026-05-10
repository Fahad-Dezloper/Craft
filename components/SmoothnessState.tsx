"use client";
import React, { useState } from "react";

const SmoothState = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#FFFFFF]">
      <div className="h-[55vh] w-[60vw] overflow-hidden rounded-4xl border-2 border-[#EBEBE9] bg-[#F5F5F2] px-22 py-18">
        <div className="relative flex h-full items-center justify-center">
          {[...Array(10)].map((_, index) => {
            const isActive =
              hoveredIndex === null ? index === 4 : index === hoveredIndex;
            const Xoffset = index * 24;
            const Yoffset = index * 8 + (isActive ? -16 : 0);
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`absolute mb-20 ml-44 overflow-hidden rounded-[20px] backdrop-blur-[7px] transition-all duration-200 before:absolute before:top-0 before:right-0 before:left-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent after:absolute after:top-0 after:bottom-0 after:left-0 after:w-[1px] after:bg-gradient-to-b after:from-white/80 after:via-transparent after:to-white/30 ${
                  isActive
                    ? "h-[22vh] w-[12vw] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    : "h-[20vh] w-[10vw] bg-[#EEEEEB]/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_rgba(255,255,255,0.1),inset_0_0_14px_7px_rgba(255,255,255,0.7)]"
                }`}
                style={{
                  transform: `translate3d(-${Xoffset}px, ${Yoffset}px, 0) skewY(20deg)`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SmoothState;
