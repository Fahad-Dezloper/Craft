"use client";

import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import { Drawer } from 'vaul';
import { motion } from "motion/react";
import { DefaultView, Key, Phrase, RemoveWallet } from "./shared/Component";
import { CloseIcon } from "@/lib/icons";


export default function FamilyDrawer() {
const [isOpen, setIsOpen] = useState(false);
const [view, setView] = useState("default");
const [elementRef, bounds] = useMeasure();



const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultView setView={setView} />;
      case "remove":
        return <RemoveWallet setView={setView} />;
      case "phrase":
        return <Phrase setView={setView} />;
      case "key":
        return <Key setView={setView} />;
    }
  }, [view]);

return (
  <div className="w-screen h-screen flex items-center justify-center relative ">
    <button
      className="h-[44px] px-6 rounded-full bg-white py-2 font-medium text-black border border-gray-200 transition-colors hover:bg-[#F9F9F8] focus-visible:shadow-focus-ring-button md:font-medium"
      onClick={() => setIsOpen(true)}
    >
      Try it out
    </button>

      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 z-10 bg-black/30"
          onClick={() => setIsOpen(false)}
        />
          <Drawer.Content
          asChild
          className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-[#FEFFFE] outline-hidden md:mx-auto md:w-full"
        >
          <motion.div animate={{ height: bounds.height }}>
            <Drawer.Close asChild>
              <button
                data-vaul-no-drag=""
                className="absolute right-8 top-7 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-75"
              >
                <CloseIcon />
              </button>
            </Drawer.Close>
            <div ref={elementRef} className="px-6 pb-6 pt-2.5 antialiased font-(--font-open-runde)">
              {content}
            </div>
          </motion.div>
        </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
  </div>
);
}