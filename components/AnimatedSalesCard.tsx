import Image from "next/image";
import * as motion from "motion/react-client"
import React, { useState } from "react";

const AnimatedSalesCard = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#E4DEDD] text-[#606060]">
      <div className=" w-74 flex flex-col gap-6 rounded-3xl bg-[#F2F2F2] p-4">
        <div className="flex h-8 w-full justify-between">
          <div onClick={() => setToggle(!toggle)} className="flex gap-1 items-center cursor-pointer">
            <LeftIcon />
            <ChevronDown />
          </div>
          <div className="flex text-sm font-semibold items-center gap-1 border p-3 rounded-xl border-neutral-300">
            Filters <Filter />
          </div>
        </div>
        <div className="flex flex-col justify-end h-[30vh] gap-1.5 text-sm">
          {toggle ? 
          <div className="flex flex-col gap-1.5 text-sm">
            <motion.div layoutId="dribble" className="flex bg-white rounded-xl py-2 px-3 tracking-tight items-center justify-between">
                <div className="flex gap-2 items-center">
                    <motion.span layoutId="dribble-img" className="w-5 h-5 block">
                      <Image src="/assets/Dribble.png" alt="Dribble logo" width={400} height={400} className="w-full h-full object-cover" />
                    </motion.span>
                    <span className="font-medium text-neutral-400">Dribbble</span>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-bold font-mono text-black">$227,459</span>
                    <span className="text-sm py-1 px-2 font-medium bg-[#F2F2F2] rounded-4xl">43%</span>
                </div>
            </motion.div>
            <motion.div layoutId="insta" className="flex bg-white rounded-xl py-2 px-3 tracking-tight items-center justify-between">
                <div className="flex gap-2 items-center">
                    <motion.span layoutId="insta-img" className="w-5 h-5 block">
                      <Image src="/assets/Instag.png" alt="Dribble logo" width={400} height={400} className="w-full h-full object-cover" />
                    </motion.span>
                    <span className="font-medium text-neutral-400">Instagram</span>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-bold font-mono text-black">$142,823</span>
                    <span className="text-sm py-1 px-2 font-medium bg-[#F2F2F2] rounded-4xl">27%</span>
                </div>
            </motion.div>
            <motion.div layoutId="beha" className="flex bg-white rounded-xl py-2 px-3 tracking-tight items-center justify-between">
                <div className="flex gap-2 items-center">
                    <motion.span layoutId="beha-img" className="w-5 h-5 block">
                      <Image src="/assets/Beha.png" alt="Dribble logo" width={400} height={400} className="w-full h-full object-cover" />
                    </motion.span>
                    <span className="font-medium text-neutral-400">Behance</span>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-bold font-mono text-black">$89,935</span>
                    <span className="text-sm py-1 px-2 font-medium bg-[#F2F2F2] rounded-4xl">11%</span>
                </div>
            </motion.div>
            <motion.div layoutId="google" className="flex bg-white rounded-xl py-2 px-3 tracking-tight items-center justify-between">
                <div className="flex gap-2 items-center">
                    <motion.span layoutId="google-img" className="w-5 h-5 block">
                      <Image src="/assets/Google.png" alt="Dribble logo" width={400} height={400} className="w-full h-full object-cover" />
                    </motion.span>
                    <span className="font-medium text-neutral-400">Google</span>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-bold font-mono text-black">$37,028</span>
                    <span className="text-sm py-1 px-2 font-medium bg-[#F2F2F2] rounded-4xl">7%</span>
                </div>
            </motion.div> 
            </div>
            :
            <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex items-end gap-1.5 w-full h-full">
              <motion.div layoutId="beha" className="h-32 flex flex-col bg-white rounded-xl p-1">
                <motion.span layoutId="beha-img" className="w-full h-fit p-2 block">
                <Image src="/assets/Beha.png" alt="Dribble logo" width={400} height={400} className="w-full h-6 object-cover" />
                </motion.span>
              </motion.div>
              <motion.div layoutId="dribble" className="h-42  flex flex-col bg-white rounded-xl p-1">
                <motion.span layoutId="dribble-img" className="w-full h-fit p-2 block">
                <Image src="/assets/Dribble.png" alt="Dribble logo" width={400} height={400} className="w-full h-6 object-cover" />
                </motion.span>
              </motion.div>
              <motion.div layoutId="google" className="h-22  flex flex-col bg-white rounded-xl p-1">
                <motion.span layoutId="google-img" className="w-full h-fit p-2 block">
                <Image src="/assets/Google.png" alt="Dribble logo" width={400} height={400} className="w-full h-6 object-cover" />
                </motion.span>
              </motion.div>
              <motion.div layoutId="insta" className="h-16  flex flex-col bg-white rounded-xl p-1">
                <motion.span layoutId="insta-img" className="w-full h-fit p-2 block">
                <Image src="/assets/Instag.png" alt="Dribble logo" width={400} height={400} className="w-full h-6 object-cover" />
                </motion.span>
              </motion.div>
              <div className="h-36  flex flex-col bg-white rounded-xl p-1">
                <span className="w-full h-fit p-2 ">
                <ShopIcon />
                </span>
              </div>
            </div>
            <div className="flex flex-col ">
              <span className="text-neutral-500 font-semibold">Deals amount</span>
              <span className="flex gap-1 items-center font-bold text-black tracking-tight">by referrer category <ChevronDown /></span>
            </div>
            </div>
}
        </div>

      </div>
    </div>
  );
};

export default AnimatedSalesCard;

const LeftIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-align-left"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6l16 0" />
      <path d="M4 11l12 0" />
      <path d="M4 16l14 0" />
      <path d="M4 21l10 0" />
    </svg>
  );
};

const ChevronDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="gray"
      className="icon icon-tabler icons-tabler-filled icon-tabler-chevron-down"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18.707 8.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1 -1.414 0l-6 -6a1 1 0 0 1 1.414 -1.414l5.293 5.293l5.293 -5.293a1 1 0 0 1 1.414 0" />
    </svg>
  );
};

const Filter = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-filter-2"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6h16" />
      <path d="M6 11h12" />
      <path d="M9 16h6" />
    </svg>
  );
};

const ShopIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg>
  )
}
