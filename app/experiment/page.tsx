"use client";
import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import useMeasure from "react-use-measure";
import { motion, useAnimate, AnimatePresence } from "motion/react";
import { ChevronLeftt, CloseIcon2, QuestionMarkIcon } from "@/lib/icons";
import { Button } from "@/components/shared/Component";
import { WheelPicker, WheelPickerWrapper } from "@ncdai/react-wheel-picker";
import "@ncdai/react-wheel-picker/style.css";
import { Check } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");
  const [paymentMethod, setPaymentMethod] = useState("Apple");
  const [elementRef, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <Header setView={setView} paymentMethod={paymentMethod} />;
      // <DefaultView setView={setView} />
      case "pay":
        return (
          <Pay
            setView={setView}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        );
      // <RemoveWallet setView={setView} />
      case "success":
        return <div />;
    }
  }, [view, paymentMethod]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <button
        onClick={() => setIsOpen(true)}
        className="font-twitter flex cursor-pointer items-center justify-center gap-1.5 rounded-4xl bg-black px-6 py-2 text-lg font-semibold text-white transition-transform active:scale-[0.97]"
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
          <Drawer.Content className="fixed inset-x-3 bottom-4 z-10 mx-auto overflow-hidden rounded-t-[36px] rounded-b-[48px] bg-[#FEFFFE] outline-hidden md:mx-auto md:w-full md:max-w-[441px]">
            <motion.div
              animate={{ height: bounds.height }}
              transition={{ type: "spring", bounce: 0.22, duration: 0.6 }}
              style={{
                willChange: "height, transform",
                transform: "translateZ(0)",
              }}
            >
              <div
                ref={elementRef}
                className="font-twitter px-4 pb-6 antialiased"
              >
                <motion.div
                  key={view}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ willChange: "opacity", transform: "translateZ(0)" }}
                >
                  {content}
                </motion.div>
              </div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default page;

const Twitter = ({
  className = "h-5 w-5 fill-current",
}: {
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 640 640"
    >
      <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" />
    </svg>
  );
};

const Header = ({
  setView,
  paymentMethod,
}: {
  setView: (view: string) => void;
  paymentMethod: string;
}) => {
  return (
    <>
      <header className="relative mt-2 mb-4 flex h-[55px] items-center justify-between border-b border-[#F7F7F7] px-2">
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
                optionItem: "text-[#858686] font-medium",
                highlightItem: "text-[#222222] font-semibold",
                highlightWrapper: "bg-[#E7E7E7] rounded-[20px]",
              }}
            />
          </WheelPickerWrapper>
        </div>
        <div
          className={
            "flex h-10 w-full items-center justify-between rounded-[16px] bg-[#E7E7E7] px-4 text-sm font-medium text-[#858686]"
          }
        >
          Region
          <span className="flex items-center gap-1.5 text-sm font-semibold text-black">
            California
            <Arrow color="#858686" width={18} height={18} />
          </span>
        </div>
        <Button
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 150));
            setView("pay");
          }}
          className={
            "flex h-10! items-center justify-between bg-[#E7E7E7]! text-sm! font-medium! text-[#858686]"
          }
        >
          Pay with
          <span className="flex items-center gap-1.5 text-sm font-semibold text-black">
            {paymentMethod === "Apple" ? (
              <>
                <Apple color="#000000" width={18} height={18} />
                Apple
              </>
            ) : (
              <>
                <Twitter className="h-[18px] w-[18px] fill-current" />
                Money
              </>
            )}
            <Arrow color="#858686" width={18} height={18} />
          </span>
        </Button>

        <p className="flex flex-col items-center justify-center pt-2.5 pb-2 text-[10px] text-[#858686]">
          By clicking the Boost Post button below, you agree to our
          <button className="underline">Terms and Condition</button>
        </p>

        <AnimatedButton
          className="focus-visible:shadow-focus-ring-button flex h-12 w-full cursor-pointer items-center justify-center gap-[15px] rounded-full bg-black px-4 text-center text-[17px] font-medium text-white transition-transform focus:scale-[0.97] active:scale-[0.97] md:font-medium"
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            // setView("success");
          }}
        >
          {(isSuccess) => (
            <div className="flex items-center">
              <span>Boost</span>
              <motion.span
                initial={false}
                animate={{
                  width: isSuccess ? 0 : "auto",
                  opacity: isSuccess ? 0 : 1,
                  filter: isSuccess ? "blur(4px)" : "blur(0px)",
                }}
                className="overflow-hidden whitespace-nowrap"
                transition={{ duration: 0.3 }}
              >
                &nbsp;Post
              </motion.span>
              <motion.span
                initial={false}
                animate={{
                  width: isSuccess ? "auto" : 0,
                  opacity: isSuccess ? 1 : 0,
                  filter: isSuccess ? "blur(0px)" : "blur(4px)",
                }}
                className="overflow-hidden whitespace-nowrap"
                transition={{ duration: 0.3 }}
              >
                ed
              </motion.span>
            </div>
          )}
        </AnimatedButton>
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

const Pay = ({
  setView,
  paymentMethod,
  setPaymentMethod,
}: {
  setView: (view: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}) => {
  return (
    <>
      <header className="relative mb-4 flex h-[72px] items-center justify-between border-b border-[#F7F7F7] px-2">
        <button
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 150));
            setView("default");
          }}
          className="flex cursor-pointer items-center justify-center transition-transform outline-none active:scale-[0.97]"
        >
          <ChevronLeftt className={""} />
        </button>
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-semibold text-[#222222] md:font-medium">
          Pay with
        </h2>
      </header>
      <div className="mt-2 flex flex-col gap-1 px-2">
        <button
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 150));
            setPaymentMethod("Apple");
            setView("default");
          }}
          className="flex w-full cursor-pointer items-center justify-between bg-transparent py-2 text-[17px] font-medium text-black transition-transform outline-none active:scale-[0.97]"
        >
          <div className="flex items-center gap-3">
            <div className="flex w-6 items-center justify-center">
              <Apple width={24} height={24} color="#000000" />
            </div>
            Pay with Apple
          </div>
          {paymentMethod === "Apple" && (
            <Check className="h-4 w-4 text-black" strokeWidth={2.5} />
          )}
        </button>
        <button
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 150));
            setPaymentMethod("X Money");
            setView("default");
          }}
          className="flex w-full cursor-pointer items-center justify-between bg-transparent py-2 text-[17px] font-medium text-black transition-transform outline-none active:scale-[0.97]"
        >
          <div className="flex items-center gap-3">
            <div className="flex w-6 items-center justify-center">
              <Twitter />
            </div>
            Pay with X Money
          </div>
          {paymentMethod === "X Money" && (
            <Check className="h-4 w-4 text-black" strokeWidth={2.5} />
          )}
        </button>
      </div>
    </>
  );
};

type AnimatedButtonProps = Omit<
  React.ComponentProps<typeof motion.button>,
  "children"
> & {
  successText?: React.ReactNode;
  children?: React.ReactNode | ((isSuccess: boolean) => React.ReactNode);
};

const AnimatedButton = ({
  className,
  children,
  successText,
  ...props
}: AnimatedButtonProps) => {
  const [scope, animate] = useAnimate();
  const [isSuccess, setIsSuccess] = useState(false);

  const animateLoading = async () => {
    await animate(
      ".loader",
      {
        width: "20px",
        scale: 1,
        display: "block",
      },
      {
        duration: 0.2,
      }
    );
  };

  const animateSuccess = async () => {
    setIsSuccess(true);
    await Promise.all([
      animate(
        ".loader",
        {
          width: "0px",
          scale: 0,
          display: "none",
        },
        {
          duration: 0.2,
        }
      ),
      animate(
        ".check-animated",
        {
          width: "20px",
          scale: 1,
          display: "block",
        },
        {
          duration: 0.2,
        }
      ),
    ]);

    await animate(
      ".check-animated",
      {
        width: "0px",
        scale: 0,
        display: "none",
      },
      {
        delay: 2,
        duration: 0.2,
      }
    );
    setIsSuccess(false);
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await animateLoading();
    if (props.onClick) {
      await props.onClick(event as any);
    }
    await animateSuccess();
  };

  const { onClick, ...buttonProps } = props;

  return (
    <motion.button
      layout
      layoutId="button"
      ref={scope}
      className={className}
      {...buttonProps}
      onClick={handleClick}
    >
      <motion.div layout className="flex items-center gap-2">
        <Loader />
        <AnimatedCheckIcon />
        <motion.div layout className="flex">
          {typeof children === "function"
            ? children(isSuccess)
            : isSuccess && successText
              ? successText
              : children}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        ease: "linear",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const AnimatedCheckIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check-animated text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};
