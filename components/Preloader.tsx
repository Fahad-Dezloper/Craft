"use client";
import React, { useState } from "react";
import { motion } from "motion/react";

const Preloader = () => {
  const [animate, setAnimate] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-24 bg-[#FEFDF1] text-red-400">
      <div className="flex w-[47vw] flex-col gap-1">
        {/* w-[67vw] */}
        <div className="flex items-center">
          <div className="flex items-center justify-center rounded-full border-[1.5px] p-2">
            <ArrowRight color="oklch(70.4% 0.191 22.216)" />
          </div>
          {animate && (
            <motion.div
              layoutId="DENTAL"
              className="ml-1 flex items-center justify-center rounded-full border-[1.5px] border-red-400 bg-red-400 p-2"
              style={{ borderRadius: 9999 }}
            >
              <motion.span
                layoutId="DENTALT"
                className="flex items-center justify-center"
              >
                <ArrowRight color="white" />
              </motion.span>
            </motion.div>
          )}
          <motion.div
            layoutId="DENTAL"
            className="ml-3 flex items-center justify-center rounded-full border-[1.5px] border-red-400 bg-red-400 p-2 px-5"
            style={{ borderRadius: 9999 }}
          >
            <motion.span
              layoutId="DENTALT"
              className="font-inter mb-0.5 flex h-8 items-center justify-center text-xl leading-none text-white"
            >
              DENTAL
            </motion.span>
          </motion.div>
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          <div className="font-inter rounded-full bg-white p-3 px-5 text-xl text-red-400">
            ASSISTANCE
          </div>
          {/* <div className='flex items-center justify-center border-[1.5px] rounded-full p-2'><ArrowLeft color='oklch(70.4% 0.191 22.216)' /></div> */}
          <div className="flex items-center justify-center rounded-full border-[1.5px] bg-red-400 p-2">
            <Teeth />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setAnimate(true)}
          className="font-inter cursor-pointer rounded-full bg-white p-3 px-5 text-xl text-red-400 hover:bg-red-400 hover:text-white"
        >
          Animate
        </button>
        <button
          onClick={() => setAnimate(false)}
          className="font-inter cursor-pointer rounded-full bg-white p-3 px-5 text-xl text-red-400 hover:bg-red-400 hover:text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Preloader;

const ArrowRight = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M15 16l4 -4" />
      <path d="M15 8l4 4" />
    </svg>
  );
};

const Teeth = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-dental"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5.5c-1.074 -.586 -2.583 -1.5 -4 -1.5c-2.1 0 -4 1.247 -4 5c0 4.899 1.056 8.41 2.671 10.537c.573 .756 1.97 .521 2.567 -.236c.398 -.505 .819 -1.439 1.262 -2.801c.292 -.771 .892 -1.504 1.5 -1.5c.602 0 1.21 .737 1.5 1.5c.443 1.362 .864 2.295 1.262 2.8c.597 .759 2 .993 2.567 .237c1.615 -2.127 2.671 -5.637 2.671 -10.537c0 -3.74 -1.908 -5 -4 -5c-1.423 0 -2.92 .911 -4 1.5" />
      <path d="M12 5.5l3 1.5" />
    </svg>
  );
};

const ArrowLeft = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M5 12l4 4" />
      <path d="M5 12l4 -4" />
    </svg>
  );
};
