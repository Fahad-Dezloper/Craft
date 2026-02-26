"use client";
import { motion, useAnimate } from "motion/react";

export default function SequenceBtn() {
  const [scope, animate] = useAnimate();

  const startAnimating = async () => {
    animate(
      ".text",
      {
        display: "none",
      },
      {
        duration: 0.1,
      }
    );
    await animate(
      "button",
      {
        width: "5rem",
        borderRadius: "1000px",
      },
      {
        duration: 0.3,
      }
    );
    await animate("button", {
        opacity: 1,
        scale: [1, 1.2, 0.8, 1]
    }, {
        duration: 0.5
    })
  };
  return (
    <div
      ref={scope}
      className="relative flex h-20 w-60 items-center justify-center"
    >
      <motion.button
        onClick={startAnimating}
        style={{ width: "30rem" }}
        className="h-20 cursor-pointer rounded-lg bg-linear-to-r  from-purple-500 via-violet-600 to-indigo-500 font-medium text-white"
      >
        <span className="text">Purchase Now ($169)</span>
      </motion.button>
    </div>
  );
}
