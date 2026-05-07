"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, SVGMotionProps } from "motion/react";

const SVGFilter = () => {
  return (
    <svg
      style={{ position: "absolute", width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        <filter id="gooey-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const GooeyFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const buttonVariants = {
    collapsed: {
      width: 150,
      marginLeft: 0,
    },
    expanded: {
      width: 200,
      marginLeft: 50,
    },
  };

  const iconBubbleVariants = {
    collapsed: {
      scale: 0,
      opacity: 0,
    },
    expanded: { scale: 1, opacity: 1 },
  };

  const TRANSITION = {
    duration: 1,
    type: "spring" as const,
    bounce: 0.25,
  };

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    } else {
      setSearchText("");
    }
  }, [isExpanded]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SVGFilter />
      <div
        style={{ filter: "url(#gooey-filter)" }}
        className="relative flex h-10 items-center justify-center"
      >
        <motion.div
          variants={buttonVariants}
          initial="collapsed"
          transition={TRANSITION}
          animate={isExpanded ? "expanded" : "collapsed"}
          className="flex h-10 items-center justify-center"
        >
          <button
            onClick={() => setIsExpanded(true)}
            className="flex h-10 w-full cursor-pointer items-center gap-2 rounded-full bg-black px-4 font-medium text-white"
          >
            {!isExpanded && <SearchIcon className="size-4 text-white" />}
            <motion.input
              layoutId="input"
              ref={inputRef}
              type="text"
              value={searchText}
              onBlur={() => !searchText && setIsExpanded(false)}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="h-full w-full bg-transparent placeholder-white/50 outline-none"
            />
          </button>
        </motion.div>

        <motion.div
          variants={iconBubbleVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          transition={TRANSITION}
          className="absolute top-1/2 left-0 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black"
        >
          <SearchIcon className="size-4 text-white" />
        </motion.div>
      </div>
    </div>
  );
};

export default GooeyFilter;

const SearchIcon = (props: SVGMotionProps<SVGSVGElement>) => {
  return (
    <motion.svg
      layoutId="search-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </motion.svg>
  );
};
