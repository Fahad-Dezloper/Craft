"use client";

import { AnimatePresence, motion, spring } from "motion/react";
import { useEffect, useState, useRef, type CSSProperties, type RefObject } from "react";
import { useOnClickOutside } from "usehooks-ts";

type FormState = "idle" | "loading" | "success";

export default function FeedbackComponentCSS() {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref as RefObject<HTMLElement>, () => setOpen(false));

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
    }, 3300);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter" &&
        open &&
        formState === "idle"
      ) {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, formState]);

  return (
    <div className="flex h-[500px] w-full items-center justify-center">
      <motion.button
        layoutId="popover-btn"
        onClick={() => {
          setOpen(true);
          setFormState("idle");
          setFeedback("");
        }}
        className="relative flex h-9 items-center rounded-[8px] border border-[#e9e9e7] bg-white px-3 font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-1"
      >
        <motion.span layoutId="feedback-btn"  className="block text-sm">Feedback</motion.span>
      </motion.button>
      <AnimatePresence>
      {open ? (
        <motion.div
          layoutId="popover-btn"
          className="absolute h-48 w-[364px] overflow-hidden rounded-xl bg-[#f5f6f7] p-1 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] outline-none"
          ref={ref}
        >
          <motion.span
          layoutId="feedback-btn"
            aria-hidden
            className={`pointer-events-none absolute left-4 top-[17px] text-sm text-[#63635d] transition-opacity ${
              feedback ? "opacity-0" : "opacity-100"
            }`}
            data-feedback={feedback ? true : false} 
          >
            Feedback
          </motion.span>
<AnimatePresence mode="popLayout">
          {formState === "success" ? (
            <motion.div initial={{opacity: 0, y: -32, filter: "blur(4px)"}} animate={{opacity: 1, y: 0, filter:"blur(0px)"}} transition={{type: "spring", duration: 0.4, bounce: 0 }} className="flex h-full flex-col items-center justify-center">
              <svg
                className="-mt-1"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                  fill="#2090FF"
                  fillOpacity="0.16"
                />
                <path
                  d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                  stroke="#2090FF"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="mb-1 mt-2 text-sm font-medium text-[#21201c]">
                Feedback received!
              </h3>
              <p className="text-sm text-[#63635d]">
                Thanks for helping me improve Sonner.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                if (!feedback) return;
                submit();
              }}
              exit={{y : 8, opacity: 0, filter: "blur(4px)"}}
              transition={{type: "spring", duration: 0.4, bounce: 0  }}
              className="rounded-lg border border-[#e6e7e8] bg-white"
            >
              <textarea
                autoFocus
                placeholder="Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="h-32 w-full resize-none rounded-[8px_0] p-3 text-sm outline-none placeholder:opacity-0"
                required
              />
              <div className="relative flex h-12 items-center px-[10px]">
                <svg
                  className="absolute -top-px left-0 right-0"
                  width="352"
                  height="2"
                  viewBox="0 0 352 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 1H352" stroke="#E6E7E8" strokeDasharray="4 4" />
                </svg>
                <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
                  <svg
                    width="6"
                    height="12"
                    viewBox="0 0 6 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2029_22)">
                      <path
                        d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
                        fill="#F5F6F7"
                      />
                      <path
                        d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
                        stroke="#E6E7E8"
                        strokeWidth="1"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2029_22">
                        <rect width="6" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div className="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
                  <svg
                    width="6"
                    height="12"
                    viewBox="0 0 6 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2029_22)">
                      <path
                        d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
                        fill="#F5F6F7"
                      />
                      <path
                        d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
                        stroke="#E6E7E8"
                        strokeWidth="1"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2029_22">
                        <rect width="6" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <button
                  type="submit"
                  disabled={!feedback || formState === "loading"}
                  className="relative ml-auto flex h-6 w-[104px] items-center justify-center overflow-hidden rounded-md bg-[linear-gradient(180deg,#1994ff_0%,#157cff_100%)] text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    boxShadow:
                      "0px 0px 1px 1px rgba(255, 255, 255, 0.08) inset, 0px 1px 1.5px 0px rgba(0, 0, 0, 0.32), 0px 0px 0px 0.5px #1a94ff",
                  }}
                >
                  {/* We already built this one in the animate presence part */}
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      transition={{
                        type: "spring",
                        duration: 0.3,
                        bounce: 0,
                      }}
                      initial={{ opacity: 0, y: -25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 25 }}
                      className="flex w-full items-center justify-center text-white [text-shadow:0px_1px_1.5px_rgba(0,0,0,0.16)]"
                      key={formState}
                    >
                      {formState === "loading" ? (
                        <Spinner size={14} color="rgba(255, 255, 255, 0.65)" />
                      ) : (
                        <span>Send feedback</span>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </motion.form>
          )}
          </AnimatePresence> 
        </motion.div>
      ) : null}
      </AnimatePresence>
    </div>
  );
}

type SpinnerProps = {
  color: string;
  size?: number;
};

const Spinner = ({ color, size = 20 }: SpinnerProps) => {
  const bars = Array.from({ length: 12 });

  return (
    <div className="h-(--spinner-size) w-(--spinner-size)" style={{ "--spinner-size": `${size}px` } as CSSProperties}>
      <div className="relative left-1/2 top-1/2 h-(--spinner-size) w-(--spinner-size)">
        {bars.map((_, i) => (
          <motion.div
            key={`spinner-bar-${i}`}
            className="absolute left-[-10%] top-[-3.9%] h-[8%] w-[24%] rounded-[6px]"
            style={{
              background: color,
              transform: `rotate(${i === 0 ? 0.0001 : i * 30}deg) translate(146%)`,
            }}
            animate={{ opacity: [1, 0.15] }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: -(1.2 - (i + 1) * 0.1),
            }}
          />
        ))}
      </div>
    </div>
  );
};