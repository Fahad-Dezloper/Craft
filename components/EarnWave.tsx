import { ChevronRight, Lock } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 2, // delay between each child
    },
  },
};

const EarnWave = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative flex h-full w-full flex-col items-center overflow-hidden bg-[#F4F5F7]"
    >
      <motion.div
        initial={{ top: 800, opacity: 0 }}
        animate={{ top: 25, opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.4, ease: "easeInOut" }}
        className="absolute -left-32 h-full w-[20vw]"
      >
        <motion.div className="absolute h-full w-[20vw] -rotate-12 rounded-t-full border border-[#F4F5F7] bg-linear-to-b from-[#DDE8F0] from-5% to-[#F4F5F7] to-100%"></motion.div>
      </motion.div>
      <motion.div
        initial={{ top: 800, opacity: 0 }}
        animate={{ top: 25, opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.4, ease: "easeInOut" }}
        className="absolute top-6 -right-32 h-full w-[20vw]"
      >
        <div className="absolute h-full w-[20vw] rotate-12 rounded-t-full border border-[#F4F5F7] bg-linear-to-b from-[#DDE8F0] from-5% to-[#F4F5F7] to-100%"></div>
      </motion.div>
      {/* <div className='bg-linear-to-b rounded-full right-0 from-[#DDE8F0] from-40% to-[#F4F5F7] to-100% w-[20vw] h-full'></div> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        className="mt-2 flex w-[60vw] items-center justify-between border-b border-neutral-200 py-2 text-[#1D2F3A]"
      >
        <div className="font-semibold">earnwave</div>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="">About</span>
          <span className="">For Buisness</span>
          <span className="">Media</span>
          <span className="">Blog</span>
        </div>
        <div className="rounded-full bg-white px-4 py-2 shadow-[80px_-80px_80px_-92px_45px_rgba(0,0,0,0.8)]">
          Signup
        </div>
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 1, ease: "easeInOut" }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-[80px] font-medium tracking-tight text-[#1D2F3A]">
            Connect. Learn. Earn
          </h1>
          <p className="text-center font-medium tracking-tight text-neutral-500">
            Your data is a profitable asset. With Earnware you control what{" "}
            <br /> data to share anonymously and earn from it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.2, ease: "easeIn" }}
          className="flex items-center gap-4"
        >
          <div className="size-2 rounded-full bg-[#C1CBCB]" />
          <div className="size-4 rounded-full bg-[#C1CBCB]" />
          <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-[80px_-80px_80px_-92px_45px_rgba(0,0,0,0.8)]">
            <LockIcon />
          </div>
          <div className="size-4 rounded-full bg-[#C1CBCB]" />
          <div className="size-2 rounded-full bg-[#C1CBCB]" />
        </motion.div>

        <div className="absolute right-32 bottom-28 flex h-[30vh] w-fit gap-12 perspective-distant">
          <motion.div
            initial={{
              opacity: 0,
              rotateX: 13,
              rotateY: 6,
              marginTop: 42,
              marginRight: 12,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              rotateX: 0,
              rotateY: 0,
              marginTop: 0,
              marginRight: 0,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.8, delay: 3.6, ease: "linear" }}
            // delay: 3.6,/</div>
            className="h-[30vh] w-[20vw] rounded-[42px] border-2 border-white bg-[#F9FAFC] p-8 shadow-[80px_-80px_80px_-92px_45px_rgba(0,0,0,0.8)]"
          >
            <div className="flex h-full w-full flex-col gap-3">
              <span className="w-fit rounded-full bg-[#F1F1F4] p-1 px-2 text-xs font-semibold text-[#919898]">
                Your earnings
              </span>
              <h1 className="text-5xl font-medium tracking-tighter text-[#1D2F3A]">
                $30.00
              </h1>
              <div className="flex flex-col text-neutral-500">
                <span className="text-xs">Next payout in</span>
                <span className="text-sm font-semibold">10,550</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              rotateX: 50,
              marginTop: 34,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              rotateX: 0,
              marginTop: 0,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.8, delay: 2.6, ease: "linear" }}
            className="relative h-[40vh] w-[30vw] overflow-hidden rounded-[42px] border-2 border-white bg-[#F1F3F6] shadow-[80px_-80px_80px_-92px_45px_rgba(0,0,0,0.8)]"
          >
            <div className="flex h-full w-full flex-col justify-between">
              <h1 className="w-full pt-8 text-center text-3xl font-medium tracking-tighter text-[#1D2F3A]">
                Connect sources
              </h1>
              <CurvedHero />
            </div>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              rotateX: 13,
              rotateY: 12,
              marginTop: 42,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              rotateX: 0,
              rotateY: 0,
              marginTop: 0,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.8, delay: 3.5, ease: "linear" }}
            className="h-[35vh] w-[23vw] rounded-[42px] border-2 border-white bg-[#F9FAFC] p-8 shadow-[80px_-80px_80px_-92px_45px_rgba(0,0,0,0.8)]"
          >
            <div className="flex h-full w-full flex-col">
              <div className="relative h-full w-full">
                <div className="absolute top-0 right-0 z-30 h-[9vh] w-[10vw] rounded-2xl bg-blue-400"></div>
                <div className="absolute top-12 right-12 z-20 h-[9vh] w-[10vw] rounded-2xl bg-green-400"></div>
                <div className="absolute top-24 right-24 z-10 h-[9vh] w-[10vw] rounded-2xl bg-purple-400"></div>
              </div>
              <div className="flex h-fit w-full items-center gap-2 leading-tight font-medium text-[#1D2F3A]">
                <span className="text-neutral-500">
                  Learn more from you data <br /> and make better decisions
                </span>
                <span className="h-fit rounded-xl bg-[#E0EDED] p-2">
                  <ChevronRight className="size-6" />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EarnWave;

const LockIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="#C1CBCB"
      className="icon icon-tabler icons-tabler-filled icon-tabler-lock"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3" />
    </svg>
  );
};

const CurvedHero = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-18 left-16 z-30 size-20 rounded-full bg-green-400" />
      <div className="absolute right-16 bottom-18 z-30 size-20 rounded-full bg-green-400" />
      <div className="absolute bottom-34 left-34 z-20 size-16 rounded-full bg-red-400" />
      <div className="absolute right-34 bottom-34 z-20 size-16 rounded-full bg-red-400" />
      <div className="absolute bottom-6 left-36 z-50 flex items-center rounded-4xl bg-[#425565] px-4 py-2">
        <AppleIcon />
        <div className="flex flex-col items-center">
          <span className="text-[10px] leading-tight">Download on the</span>
          <span className="text-lg leading-tight font-semibold">App Store</span>
        </div>
      </div>
      <div className="absolute inset-0 z-10">
        <div
          className="h-full w-full"
          style={{ clipPath: "circle(92% at 50% 148%)" }}
        ></div>
      </div>
      <div className="absolute inset-0 z-20 overflow-hidden">
        <div
          className="h-full w-full bg-white opacity-30"
          style={{ clipPath: "circle(82% at 50% 148%)" }}
        ></div>
      </div>
      <div className="absolute inset-0 z-30">
        <div
          className="h-full w-full bg-white opacity-30"
          style={{ clipPath: "circle(72% at 50% 154%)" }}
        ></div>
      </div>
      <div className="absolute inset-0 z-40">
        <div
          className="h-full w-full bg-white opacity-30"
          style={{ clipPath: "circle(62% at 50% 160%)" }}
        ></div>
      </div>
    </div>
  );
};

const AppleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-brand-apple"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15.079 5.999l.239 .012c1.43 .097 3.434 1.013 4.508 2.586a1 1 0 0 1 -.344 1.44c-.05 .028 -.372 .158 -.497 .217a4.15 4.15 0 0 0 -.722 .431c-.614 .461 -.948 1.009 -.942 1.694c.01 .885 .339 1.454 .907 1.846c.208 .143 .436 .253 .666 .33c.126 .043 .426 .116 .444 .122a1 1 0 0 1 .662 .942c0 2.621 -3.04 6.381 -5.286 6.381c-.79 0 -1.272 -.091 -1.983 -.315l-.098 -.031c-.463 -.146 -.702 -.192 -1.133 -.192c-.52 0 -.863 .06 -1.518 .237l-.197 .053c-.575 .153 -.964 .226 -1.5 .248c-2.749 0 -5.285 -5.093 -5.285 -9.072c0 -3.87 1.786 -6.92 5.286 -6.92c.297 0 .598 .045 .909 .128c.403 .107 .774 .26 1.296 .508c.787 .374 .948 .44 1.009 .44h.016c.03 -.003 .128 -.047 1.056 -.457c1.061 -.467 1.864 -.685 2.746 -.616l-.24 -.012z" />
      <path d="M14 1a1 1 0 0 1 1 1a3 3 0 0 1 -3 3a1 1 0 0 1 -1 -1a3 3 0 0 1 3 -3z" />
    </svg>
  );
};
