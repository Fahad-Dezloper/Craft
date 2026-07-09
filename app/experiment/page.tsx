"use client";
import React, { useMemo, useState } from "react";
import { Drawer } from "vaul";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "motion/react";
import {
  CloseIcon,
  CloseIcon2,
  CrossIcon,
  QuestionMarkIcon,
} from "@/lib/icons";
import { Button } from "@/components/shared/Component";
import { WheelPicker, WheelPickerWrapper } from "@ncdai/react-wheel-picker";
import "@ncdai/react-wheel-picker/style.css";

const impressionsOptions = [
  { impressions: "698 - 1.1K", price: "$1" },
  { impressions: "6.9K - 12K", price: "$10" },
  { impressions: "17K - 30K", price: "$25" },
  { impressions: "31K - 60K", price: "$50" },
  { impressions: "60K - 119K", price: "$100" },
];

const pickerOptions = impressionsOptions.map((opt) => ({
  value: opt.price,
  label: (
    <div className="flex w-full items-center justify-between px-6">
      <span className="text-base">{opt.impressions} impressions</span>
      <span className="text-xl">{opt.price}</span>
    </div>
  ),
  textValue: opt.price,
}));

const page = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [view, setView] = useState("default");
  const [elementRef, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <Header setView={setView} />;
      // <DefaultView setView={setView} />
      case "pay":
        return <div />;
      // <RemoveWallet setView={setView} />
    }
  }, [view]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="font-twitter flex cursor-pointer items-center justify-center gap-1.5 rounded-4xl bg-black px-6 py-2 text-lg font-semibold text-white"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 fill-current"
        >
          <g>
            <path d="M9.207 16.207l-5.25 5.25-1.414-1.414 5.25-5.25 1.414 1.414zm5 1l-4.25 4.25-1.414-1.414 4.25-4.25 1.414 1.414zm.413-14.358c.83-1.133 2.57-.866 3.048.418l.042.127.729 2.499 2.471.816c1.377.455 1.637 2.29.439 3.108l-2.153 1.464-.012 2.605c-.008 1.45-1.674 2.262-2.82 1.375l-2.06-1.593-2.478.793c-1.381.442-2.67-.892-2.18-2.258l.878-2.45-1.52-2.113c-.847-1.177.024-2.814 1.473-2.77l2.602.078 1.54-2.1zm-6.413 8.358l-4.25 4.25-1.414-1.414 4.25-4.25 1.414 1.414z" />
          </g>
        </svg>
        Boost Post
      </button>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-10 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          <Drawer.Content className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-[#FEFFFE] outline-hidden md:mx-auto md:w-full md:max-w-[441px]">
            <motion.div animate={{ height: bounds.height }}>
              {/* <Drawer.Close asChild>
                <button
                  data-vaul-no-drag=""
                  className="focus-visible:shadow-focus-ring-button absolute top-7 right-8 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 active:scale-75"
                >
                  <CloseIcon />
                </button>
              </Drawer.Close> */}
              <div
                ref={elementRef}
                className="font-twitter px-6 pt-2.5 pb-6 antialiased"
              >
                {content}
              </div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default page;

const Twitter = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 fill-current"
      viewBox="0 0 640 640"
    >
      <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" />
    </svg>
  );
};

const Header = ({ setView }) => {
  return (
    <>
      <header className="relative mb-4 flex h-[72px] items-center justify-between border-b border-[#F7F7F7] px-2">
        <Drawer.Close asChild>
          <button className="flex cursor-pointer items-center justify-center outline-none">
            <CloseIcon2 className="" />
          </button>
        </Drawer.Close>
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-semibold text-[#222222] md:font-medium">
          Boost Post
        </h2>
        <button className="flex cursor-pointer items-center justify-center outline-none">
          <QuestionMarkIcon className="" />
        </button>
      </header>

      <div className="space-y-3">
        <p className="w-full text-center text-sm font-medium text-[#6e6d6d]">
          Get up to 3x more likes. <span className="underline">Learn more</span>
        </p>
        <div
          className="relative w-full overflow-hidden [&_[data-rwp]]:!h-[194px]"
          data-vaul-no-drag
        >
          <div className="pointer-events-none absolute bottom-0 z-10 h-8 w-full bg-gradient-to-t from-white to-transparent" />
          <div className="pointer-events-none absolute top-0 z-10 h-8 w-full bg-gradient-to-t from-white to-transparent" />
          <WheelPickerWrapper className="w-full">
            <WheelPicker
              options={pickerOptions}
              defaultValue="$25"
              optionItemHeight={48}
              visibleCount={12}
              classNames={{
                optionItem: "text-[#949595] font-medium",
                highlightItem: "text-[#222222] font-semibold",
                highlightWrapper: "bg-[#F4F5F7] rounded-[20px]",
              }}
            />
          </WheelPickerWrapper>
        </div>
        <Button
          onClick={() => {
            setView("key");
          }}
          className={
            "flex h-10! items-center justify-between text-sm! text-[#6e6d6d]"
          }
        >
          Region
          <span className="flex items-center gap-1.5 text-sm text-black">
            California
            <Arrow color="#6e6d6d" width={18} height={18} />
          </span>
        </Button>
        <Button
          onClick={() => {
            setView("phrase");
          }}
          className={
            "flex h-10! items-center justify-between text-sm! text-[#6e6d6d]"
          }
        >
          {/* <PhraseIcon /> */}
          Pay with
          <span className="flex items-center gap-1.5 text-sm text-black">
            <Apple color="#000000" width={18} height={18} />
            Apple
            <Arrow color="#6e6d6d" width={18} height={18} />
          </span>
        </Button>

        <p className="flex flex-col items-center justify-center pt-2.5 pb-2 text-[10px] text-[#949595]">
          By clicking the Boost Post button below, you agree to our
          <button className="underline">Terms and Condition</button>
        </p>

        <button
          className="focus-visible:shadow-focus-ring-button flex h-12 w-full items-center justify-center gap-[15px] rounded-full bg-black px-4 text-center text-[17px] font-medium text-white transition-transform focus:scale-95 active:scale-95 md:font-medium"
          onClick={() => {
            setView("remove");
          }}
        >
          {/* <WarningIcon /> */}
          Boost Post
        </button>
      </div>
    </>
  );
};

const Arrow = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ? color : "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-chevron-right-icon lucide-chevron-right"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
};

const Apple = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) => {
  return (
    <svg
      role="img"
      width={width}
      height={height}
      // stroke={color ? color : "currentColor"}
      viewBox="0 -1 24 26"
      style={{ overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Apple</title>
      <path
        fill={color || "currentColor"}
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    </svg>
  );
};
