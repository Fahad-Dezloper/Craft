"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface Card {
  title: string;
  description: string;
  skeleton: React.ReactNode;
  className: string;
  config: {
    y: number;
    x: number;
    zIndex: number;
    rotate: number;
  };
}

const cards: Card[] = [
  {
    title: "Working Knowledge",
    description:
      "Practical skills and insights gained through hands-on experience that drive real-world problem solving.",
    skeleton: (
      <div className="h-50 w-full rounded-lg bg-gradient-to-r from-orange-600 to-orange-600/60"></div>
    ),
    className: "bg-orange-500",
    config: {
      y: 60,
      x: 0,
      zIndex: 10,
      rotate: -8,
    },
  },
  {
    title: "Practical Demonstration",
    description:
      "Showcasing theoretical concepts through tangible, interactive examples and live-running prototypes.",
    skeleton: (
      <div className="h-50 w-full rounded-lg bg-gradient-to-r from-neutral-600 to-neutral-300/60"></div>
    ),
    className: "bg-stone-300 [&_h2]:text-black!",
    config: {
      y: 120,
      x: 180,
      zIndex: 20,
      rotate: 8,
    },
  },
  {
    title: "Collaboration with AI",
    description:
      "Leveraging advanced machine learning models to augment creativity and accelerate development cycles.",
    skeleton: (
      <div className="h-50 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-600/60"></div>
    ),
    className: "bg-blue-500",
    config: {
      y: 20,
      x: 400,
      zIndex: 30,
      rotate: -2,
    },
  },
  {
    title: "Means and Methods",
    description:
      "The systematic approach and specialized tooling used to execute complex technical visions with precision.",
    skeleton: (
      <div className="h-50 w-full rounded-lg bg-gradient-to-r from-green-600 to-green-600/60"></div>
    ),
    className: "bg-green-300 [&_h2]:text-black! ",
    config: {
      y: 120,
      x: 600,
      zIndex: 40,
      rotate: 1,
    },
  },
  {
    title: "Interface Kit",
    description:
      "A comprehensive library of modular UI components and design tokens for building consistent, high-fidelity interfaces.",
    skeleton: (
      <div className="h-50 w-full rounded-lg bg-gradient-to-r from-rose-300 to-rose-300/60"></div>
    ),
    className: "bg-rose-600",
    config: {
      y: 60,
      x: 800,
      zIndex: 50,
      rotate: 8,
    },
  },
];

const page = () => {
  const [active, isActive] = useState<Card | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        isActive(null);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  const isAnyCardActive = () => {
    return active?.title;
  };

  const isCurrentActive = (card: Card) => {
    return active?.title === card.title;
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div ref={ref} className="relative mx-auto h-160 w-full max-w-5xl">
        {cards.map((item, index) => (
          <motion.div key={item.title} onClick={() => isActive(item)}>
            <motion.button
              initial={{
                y: 400,
                x: 0,
                scale: 0,
                filter: "blur(10px)",
              }}
              animate={{
                y: isCurrentActive(item)
                  ? 0
                  : isAnyCardActive()
                    ? 300
                    : item.config.y,
                x: isCurrentActive(item)
                  ? 320
                  : isAnyCardActive()
                    ? item.config.x * 0.6 + 200
                    : item.config.x,
                rotate: isCurrentActive(item)
                  ? 0
                  : isAnyCardActive()
                    ? item.config.rotate * 0.4
                    : item.config.rotate,
                scale: isCurrentActive(item) ? 1 : isAnyCardActive() ? 0.7 : 1,
                width: item ? 400 : 321,
                height: isCurrentActive(item) ? 500 : 400,
                filter: "blur(0px)",
              }}
              whileHover={{
                scale: isCurrentActive(item)
                  ? 1
                  : isAnyCardActive()
                    ? 0.7
                    : 1.05,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              style={{ zIndex: item.config.zIndex }}
              className={cn(
                `font-signika! absolute inset-0 flex w-80 cursor-pointer flex-col items-start ${isCurrentActive(item) ? "justify-start" : "justify-between"} overflow-hidden rounded-xl p-4 text-white`,
                item.className
              )}
            >
              {item.skeleton}
              <motion.h2
                layoutId={item.title + item.title}
                className="text-left text-2xl font-bold"
              >
                {item.title}
              </motion.h2>
              <AnimatePresence mode="popLayout">
                {isCurrentActive(item) && (
                  <motion.p
                    layoutId={item.title + "description"}
                    initial={{ opacity: 0, x: 20, y: 20, height: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0, height: 100 }}
                    exit={{ opacity: 0, x: 40, y: 40, height: 0 }}
                    transition={{ ease: "easeInOut" }}
                    className="mt-4 text-left leading-tight text-white/80"
                  >
                    {item.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default page;
