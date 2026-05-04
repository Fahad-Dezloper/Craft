"use client";

import { AnimatePresence, motion, MotionConfig} from "motion/react";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";

export default function MultiStepComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [ref, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="mb-2 font-semibold">This is step one</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="h-4 w-64 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-48 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-96 animate-pulse rounded-md bg-[#f2f1f0]" />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="mb-2 font-semibold">This is step two</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="h-4 w-64 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-48 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-96 animate-pulse rounded-md bg-[#f2f1f0]" />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="mb-2 font-semibold">This is step three</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="h-4 w-64 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-48 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-32 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-56 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-96 animate-pulse rounded-md bg-[#f2f1f0]" />
            </div>
          </>
        );
    }
  }, [currentStep]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
    <MotionConfig transition={{duration: 0.5, type: "spring", bounce: 0}}>
    <motion.div animate={{height: bounds.height}} className="relative mx-auto my-[100px] w-[550px] bg-white overflow-hidden rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04),0px_8px_8px_-8px_rgba(0,0,0,0.04)]">
      <div className="p-6" ref={ref}>
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
        key={currentStep}
        variants={variants}
        initial="initial"
        animate="active"
        exit="exit"
        custom={direction}
        >{content}</motion.div>
        </AnimatePresence>
        <motion.div layout className="mt-8 flex justify-between">
          <button
            className="h-8 w-20 cursor-pointer rounded-full text-sm font-medium text-[#63635d] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04),0px_8px_8px_-8px_rgba(0,0,0,0.04)] transition-colors hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentStep === 0}
            onClick={() => {
              if (currentStep === 0) {
                return;
              }
              setDirection(-1)
              setCurrentStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <button
            className="relative h-8 w-[120px] overflow-hidden rounded-full bg-[linear-gradient(180deg,#1994ff_0%,#157cff_100%)] text-sm font-semibold text-white shadow-[0px_0px_1px_1px_rgba(255,255,255,0.08)_inset,0px_1px_1.5px_0px_rgba(0,0,0,0.32),0px_0px_0px_0.5px_#1a94ff] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentStep === 2}
            onClick={() => {
              if (currentStep === 2) {
                setCurrentStep(0);
                setDirection(-1);
                return;
              }
              setDirection(1)
              setCurrentStep((prev) => prev + 1);
            }}
          >
            <span className="flex w-full items-center justify-center text-white [text-shadow:0px_1px_1.5px_rgba(0,0,0,0.16)]">
              Continue
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
    </MotionConfig>
    </div>
  );
}

const variants = {
    initial: (direction: number) => {
      return { x: `${110 * direction}%`, opacity: 0 };
    },
    active: { x: "0%", opacity: 1 },
    exit: (direction: number) => {
      return { x: `${-110 * direction}%`, opacity: 0 };
    },
    };
