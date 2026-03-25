"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useAnimate,
  useMotionValue,
  useTransform,
  easeOut,
  easeInOut,
} from "motion/react";
import { useAnimateVariant } from "@/lib/variants/use-animate-variant";
import {
  bellsVariants,
  backgroundVariants,
  clockVariants,
  clockAndBellsVariants,
  bellVariants,
} from "@/lib/variants/clock-variants";

const INITIAL_HOUR_ROTATION = 120;
const SPRING_CONFIG = {
  type: "spring",
  stiffness: 250,
  damping: 25,
  mass: 1.2,
}

export default function ClockAnimation() {
  const [scope, animateVariant, animate] = useAnimateVariant();
  const hasClickedRef = useRef(false);

  useEffect(() => {
    animateVariant('[data-animate="bells"]', bellsVariants.idle);
  }, [animateVariant]);

  const animateClockVariant = (variant: string) => {
    const clockVariantsAny = clockVariants as Record<string, unknown>;
    const clockAndBellsVariantsAny = clockAndBellsVariants as Record<string, unknown>;
    const bellsVariantsAny = bellsVariants as Record<string, unknown>;
    const backgroundVariantsAny = backgroundVariants as Record<string, unknown>;
    const bellVariantsAny = bellVariants as Record<string, unknown>;

    const animations = [
      animateVariant(
        "[data-animate='clock']",
        (clockVariantsAny[variant] ?? clockVariants.initial) as any
      ),
      animateVariant(
        "[data-animate='clock-and-bells']",
        (clockAndBellsVariantsAny[variant] ?? clockAndBellsVariants.initial) as any
      ),
      animateVariant(
        '[data-animate="bells"]',
        (bellsVariantsAny[variant] ?? bellsVariants.initial) as any
      ),
      ...Array.from({ length: 2 }, (_, i) =>
        animateVariant(
          `[data-animate="bell"][data-index='${i}']`,
          typeof bellVariantsAny[variant] === "function"
            ? (bellVariantsAny[variant] as (index: number) => any)(i)
            : (bellVariantsAny[variant] ?? bellVariants.initial) as any
        )
      ),
      animateVariant(
        '[data-animate="background"]',
        (backgroundVariantsAny[variant] ?? backgroundVariants.initial) as any
      ),
    ].filter(Boolean);

    return Promise.all(animations);
  }

  const animateClockHands = (hourRotation: number, minuteRotation: number) => {
    (animate as any)(
      "[data-animate='hour-hand']",
      {
        transform: `rotate(${hourRotation}deg)`,
      },
      SPRING_CONFIG
    );
    (animate as any)(
      "[data-animate='minute-hand']",
      {
        transform: `rotate(${minuteRotation}deg)`,
      },
      SPRING_CONFIG
    );
  }

  const handleMouseEnter = () => {
    animateClockVariant("hover");
  }

  const handleMouseLeave = async () => {
    hasClickedRef.current = false;
    animateClockHands(INITIAL_HOUR_ROTATION, 0);
    await animateClockVariant("initial");
    animateVariant('[data-animate="bells"]', bellsVariants.idle);
  }

  const handleClick = () => {
    if (!hasClickedRef.current) {
      hasClickedRef.current = true;
      animateClockVariant("click");

      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // Calculate rotations (0 degrees is at 12 o'clock position)
      // Hour hand: moves 30 degrees per hour (360/12) plus 0.5 degrees per minute
      const newHourRotation = hours * 30 + minutes * 0.5;

      // Minute hand: moves 6 degrees per minute (360/60)
      const newMinuteRotation = minutes * 6 + seconds * 0.1;

      const hourSpins = 1;
      const minuteSpins = 2;
      const hourWithSpins = 360 * hourSpins + newHourRotation;
      const minuteWithSpins = 360 * minuteSpins + newMinuteRotation;

      animateClockHands(hourWithSpins, minuteWithSpins);
    } else {
      animateClockVariant("scale-click");
    }
  }

  return (
    <svg
      width="155"
      height="143"
      viewBox="0 0 155 143"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible!"
    >
      <g
        ref={scope}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <motion.g
          data-animate="background"
          initial={backgroundVariants.initial}
          filter="url(#filter7_clock_359_1453)"
        >
          <path
            d="M86.0337 0.868621C128.43 6.67762 158.875 40.0266 154.034 75.3566C152.498 86.5686 147.592 96.6336 140.254 104.964C134.113 111.937 132.037 122.368 137.526 129.865L139.354 132.361C139.858 133.052 140.226 133.835 140.436 134.665C141.863 140.348 135.764 144.958 130.686 142.033L109.869 130.044C107.05 128.419 103.811 127.672 100.565 127.897L98.1097 128.067C88.7577 129.878 78.7507 130.213 68.5047 128.809C26.1097 123 -4.33427 89.6506 0.505733 54.3216C5.34673 18.9916 43.6387 -4.93938 86.0337 0.868621Z"
            fill="#F8F8F8"
          />
        </motion.g>

        <g data-animate="clock-and-bells">
          <g data-animate="clock">
            <circle
              cx="76.6995"
              cy="69.0189"
              r="22.93"
              fill="#989898"
            />
            <motion.line
              data-animate="minute-hand"
              initial={{
                transform: `rotate(0deg)`,
                transformOrigin: "0% 100%",
              }}
              x1="76.3175"
              y1="69.5132"
              x2="78.0647"
              y2="58.2433"
              strokeWidth="4.9"
              strokeLinecap="round"
              stroke="#F8F8F8"
            />
            <motion.line
              data-animate="hour-hand"
              initial={{
                transformOrigin: "0% 100%",
                transform: `rotate(${INITIAL_HOUR_ROTATION}deg)`,
              }}
              x1="76.3174"
              y1="69.5132"
              x2="77.5886"
              y2="61.3112"
              strokeWidth="4.9"
              strokeLinecap="round"
              stroke="#F8F8F8"
            />
          </g>

          <motion.g
            data-animate="bells"
            initial={bellsVariants.initial}
            style={{ transformBox: "view-box" }}
          >
            <path
              data-animate="bell"
              data-index="0"
              d="M85.8858 33.91C86.5606 34.0022 87.1988 34.2719 87.7353 34.6915C88.2717 35.1111 88.6872 35.6655 88.9393 36.2982C89.1914 36.9309 89.271 37.6192 89.1701 38.2927C89.0691 38.9663 88.7913 39.6009 88.3648 40.132L86.3708 42.614C85.9358 43.155 85.2088 43.358 84.5448 43.158C81.8043 42.3293 78.9503 41.9381 76.0879 41.999C75.7485 42.0101 75.4136 41.9194 75.1263 41.7385C74.839 41.5576 74.6125 41.2948 74.4759 40.984L73.2248 38.058C72.9498 37.417 72.8549 36.712 72.9499 36.021C73.0184 35.5204 73.185 35.0383 73.4399 34.6021C73.6948 34.1659 74.0332 33.7842 74.4356 33.4788C74.8381 33.1734 75.2967 32.9502 75.7854 32.8221C76.2741 32.694 76.7833 32.6633 77.2838 32.732L85.8858 33.91Z"
              opacity="0.4"
              fill="#989898"
            />
            <path
              data-animate="bell"
              data-index="1"
              d="M102.985 49.4718C103.398 50.0153 103.656 50.6608 103.731 51.3395C103.806 52.0182 103.695 52.7045 103.411 53.3251C103.126 53.9458 102.678 54.4775 102.115 54.8635C101.552 55.2495 100.894 55.4753 100.213 55.5167C100.183 55.5184 100.154 55.5119 100.128 55.4979C100.102 55.484 100.081 55.4632 100.066 55.4378C99.5088 54.4819 98.8937 53.5611 98.2237 52.6807C97.556 51.7986 96.8346 50.9584 96.0637 50.1647C96.0437 50.1437 96.0297 50.1176 96.0234 50.0892C96.017 50.0609 96.0186 50.0313 96.0278 50.0037C96.2511 49.3587 96.6454 48.7865 97.1685 48.348C97.6915 47.9094 98.3238 47.6211 98.9979 47.5137C99.672 47.4064 100.363 47.484 100.996 47.7383C101.629 47.9926 102.182 48.4141 102.595 48.9577L102.985 49.4718Z"
              opacity="0.45"
              fill="#989898"
            />
          </motion.g>
        </g>
      </g>

      <defs>
        <filter
          id="filter7_clock_359_1453"
          x="0"
          y="0"
          width="154.539"
          height="142.938"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="6.551"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          ></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"></feColorMatrix>
          <feBlend
            in2="shape"
            result="effect1_innerShadow_359_1453"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
