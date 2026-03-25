import { useAnimate } from "motion/react";
import { useCallback } from "react";

export function useAnimateVariant() {
  const [scope, animate] = useAnimate();

  type AnimateSelector = Parameters<typeof animate>[0];
  type AnimateValues = Parameters<typeof animate>[1];
  type AnimateTransition = Parameters<typeof animate>[2];

  type Variant = {
    transition?: AnimateTransition;
    [key: string]: unknown;
  };

  const DEFAULT_SPRING = {
    type: "spring",
    stiffness: 800,
    damping: 80,
    mass: 4,
  } as unknown as AnimateTransition;

  const animateVariant = useCallback(
    (selector: AnimateSelector, variant?: Variant) => {
      if (!variant) return;
      const { transition, ...values } = variant;
      return animate(
        selector,
        values as unknown as AnimateValues,
        (transition ?? DEFAULT_SPRING) as AnimateTransition
      );
    },
    [animate]
  );

  return [scope, animateVariant, animate] as const;
}