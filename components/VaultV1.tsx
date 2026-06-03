"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const scaleVariant = {
  open: { scale: 0.97, borderRadius: "24px", filter: "brightness(0.6)" },
  closed: { scale: 1, borderRadius: "0px", filter: "brightness(1)" },
};

export default function Vault() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <motion.div
        transition={{ duration: 0.3, ease: "easeOut" }}
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={scaleVariant}
        className="flex h-screen w-screen items-center justify-center bg-white shadow-2xl"
      >
        <button
          onClick={() => setOpen(!open)}
          className="cursor-pointer rounded-full bg-black px-8 py-4 text-5xl text-white"
        >
          Open Vault
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "32px" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex h-screen w-screen items-center justify-center rounded-3xl border border-white/15 bg-white shadow-black"
          >
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer rounded-full bg-black px-8 py-4 text-5xl text-white"
            >
              Closes
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* </div> */}
    </div>
  );
}
