import React, { useMemo, useState } from 'react'
import Ring from './shared/Ring';
import {AnimatePresence, motion} from 'motion/react'
import Timer from './shared/Timer';

const VIEWS = ['idle', 'ring', 'timer'] as const
type View = (typeof VIEWS)[number]
type VariantKey =
  | 'idle'
  | 'idle-ring'
  | 'idle-timer'
  | 'ring-idle'
  | 'ring-timer'
  | 'timer-idle'
  | 'timer-ring'

const DynamicIsland = () => {
    const [view, setView] = useState<View>("idle");
    const [variantKey, setVariantKey] = useState<VariantKey>("idle");


    const content = useMemo(() => {
        switch (view) {
            case "ring":
                return <Ring />;
            case "timer":
                return <Timer />;
            case "idle":
                return <div className='h-7' />;
        }
    }, [view])

    const variants = {
        exit: (transition: Record<string, unknown> | undefined) => {
          return {
            ...transition,
            opacity: [1, 0],
            filter: "blur(4px)",
          };
        },
      };

  return (
    <div>
    <div className="flex h-[160px] justify-center">
      <motion.div 
      layout 
      transition={{
        type: "spring",
        bounce: BOUNCE_VARIANTS[variantKey]
      }}
      className="h-fit min-w-[100px] overflow-hidden  bg-black" style={{borderRadius: 32}}>
        
        <motion.div
            transition={{
              type: "spring",
              bounce: BOUNCE_VARIANTS[variantKey],
            }}
            initial={{
              scale: 0.9,
              opacity: 0,
              filter: "blur(5px)",
              originX: 0.5,
              originY: 0.5,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              originX: 0.5,
              originY: 0.5,
              transition: {
                delay: 0.05,
              },
            }}
            key={view}
          >
            {content}
          </motion.div>
      </motion.div>

    </div>
    <div className="pointer-events-none absolute left-1/2 top-0 flex h-[200px] w-[300px] -translate-x-1/2 items-start justify-center">
  <AnimatePresence mode="popLayout"  custom={ANIMATION_VARIANTS[variantKey]}>
    // This shows only when exiting
    <motion.div
      initial={{ opacity: 0 }}
      exit="exit"
      variants={variants}
      key={view}
    >
      {content}
    </motion.div>
  </AnimatePresence>
  </div>

  <div className="flex w-full justify-center gap-4">
          {VIEWS.map((v) => (
            <button
              type="button"
              className="rounded-full capitalize w-32 h-10 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 hover:bg-gray-50"
              onClick={() => {
                setView(v);
                setVariantKey(`${view}-${v}` as VariantKey);
              }}
              key={v}
            >
              {v}
            </button>
          ))}
        </div>
 </div>
  )
}

export default DynamicIsland

const ANIMATION_VARIANTS = {
    idle: {
      scale: 1,
      scaleX: 1,
      y: 0,
      bounce: 0.5,
    },
    "idle-ring": {
      scale: 0.9,
      scaleX: 0.9,
      bounce: 0.5,
    },
    "idle-timer": {
      scale: 0.7,
      y: -7.5,
      bounce: 0.3,
    },
    "ring-idle": {
      scale: 0.9,
      scaleX: 0.9,
      bounce: 0.5,
    },
    "timer-ring": {
      scale: 0.7,
      y: -7.5,
      bounce: 0.35,
    },
    "ring-timer": {
      scale: 1.4,
      y: 7.5,
      bounce: 0.35,
    },
    "timer-idle": {
      scale: 0.7,
      y: -7.5,
      bounce: 0.3,
    },
  } as const satisfies Partial<
    Record<
      VariantKey,
      { scale: number; bounce: number; scaleX?: number; y?: number }
    >
  >;
  
  const BOUNCE_VARIANTS = {
    idle: 0.5,
    "idle-ring": 0.5,
    "idle-timer": 0.3,
    "ring-idle": 0.5,
    "timer-ring": 0.35,
    "ring-timer": 0.35,
    "timer-idle": 0.3,
  } as const satisfies Record<VariantKey, number>;
  