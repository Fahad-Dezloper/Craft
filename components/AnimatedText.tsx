"use client";
import { stagger } from "motion";
import { useAnimate, motion } from "motion/react";
import { useEffect } from "react";

export const AnimatedText = () => {
  const [scope, animate] = useAnimate();
  const text =
    "Welcome to F**** C***. Then first rule of F**** C*** is that you don't talk about F**** C***. Then second rule of F**** C*** is that you don't talk about F**** C***.";

  useEffect(() => {
    startAnimating();
  }, []);

  const startAnimating = () => {
    animate(
      "span",
      {
        opacity: 1,
        filter: "blur(0px)"
      },
      {
        duration: 0.3,
        ease: "easeInOut",
        delay: stagger(0.02)
      }
    );
  };

  return (
    <motion.div
      ref={scope}
      className="mx-auto max-w-4xl py-40 text-4xl font-bold text-white"
    >
        {text.split(" ").map((word, index) => (
            <motion.span
            style={{
                opacity: 0,
                filter: "blur(10px)",
                y: 10
            }}
            key={word + index}
            className="inline-block"
            >{word} &nbsp;</motion.span>
        ))}
    </motion.div>
  );
};
