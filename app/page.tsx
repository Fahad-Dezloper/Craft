"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

import AnimatedSalesCard from "@/components/AnimatedSalesCard";
import { AnimatedText } from "@/components/AnimatedText";
import Card from "@/components/Card";
import CardsGrow from "@/components/CardsGrow";
import ClockAnimation from "@/components/ClockAnimation";
import DynamicIsland from "@/components/DynamicIsland";
import EarnWave from "@/components/EarnWave";
import FeatureSection from "@/components/FeatureSection";
import FeedbackComponentCSS from "@/components/FeedbackModal";
import Graph from "@/components/GraphAnimation";
import HandGesture from "@/components/HandGesture";
import StyledWithoutDrag from "@/components/LayIdTest";
import MultiStepComponent from "@/components/MultiStepModal";
import PacoWebsite from "@/components/PacoWebsite";
import Preloader from "@/components/Preloader";
import SequenceBtn from "@/components/SequenceBtn";
import ShowcaseCard from "@/components/ShowcaseCard";
import TextMorph from "@/components/TextMorph";
import TopBar from "@/components/TopBar";
import { TrashAnimation } from "@/components/trash-animation";

const COMPONENTS = [
  { name: "Card", component: Card, bg: "#f9fafb" },
  { name: "Feature Section", component: FeatureSection, bg: "#171717" },
  // { name: "Cards Grow", component: CardsGrow, bg: "#f3f4f6" },
  // { name: "Sequence Button", component: SequenceBtn, bg: "#000000" },
  { name: "Animated Text", component: AnimatedText, bg: "#000000" },
  // { name: "Preloader", component: Preloader, bg: "#FEFDF1" },
  { name: "Earn Wave", component: EarnWave, bg: "#F4F5F7" },
  { name: "Animated Sales Card", component: AnimatedSalesCard, bg: "#E4DEDD" },
  { name: "Showcase Card", component: ShowcaseCard, bg: "#ffffff" },
  { name: "Dynamic Island", component: DynamicIsland, bg: "#000000" },
  { name: "Top Bar", component: TopBar, bg: "#000000" },
  { name: "Hand Gesture", component: HandGesture, bg: "#000000" },
  { name: "Clock Animation", component: ClockAnimation, bg: "#000000" },
  // { name: "Text Morph", component: TextMorph, bg: "#000000" },
  { name: "Styled Layout", component: StyledWithoutDrag, bg: "#000000" },
  { name: "Feedback Component", component: FeedbackComponentCSS, bg: "#000000" },
  { name: "Multi Step Component", component: MultiStepComponent, bg: "#000000" },
  { name: "Trash Animation", component: TrashAnimation, bg: "#000000" },
  { name: "Graph", component: Graph, bg: "#000000" },
  { name: "Paco Website", component: PacoWebsite, bg: "#000000" },
];

const Slide = ({ item, isActive }: { item: any, isActive: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setMounted(true), 300);
      return () => clearTimeout(timer);
    } else {
      setMounted(false);
    }
  }, [isActive]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center overflow-auto"
    >
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <item.component container={containerRef} />
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  );
};


const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= COMPONENTS.length) {
      setIndex(Math.max(0, COMPONENTS.length - 1));
    }
  }, [COMPONENTS.length, index]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "n" || e.key === "ArrowRight") {
        setIndex((prev) => (prev + 1) % COMPONENTS.length);
      } else if (e.key === "p" || e.key === "ArrowLeft") {
        setIndex((prev) => (prev - 1 + COMPONENTS.length) % COMPONENTS.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div 
      className="h-screen w-screen overflow-hidden transition-colors duration-500"
      animate={{ backgroundColor: COMPONENTS[index]?.bg || "#000" }}
    >
      {/* Navigation Hint */}
      <div className="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 opacity-40 mix-blend-difference">
        <p className="text-xs font-mono tracking-widest uppercase text-white">
          Press <span className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">N</span> to advance • {index + 1} / {COMPONENTS.length}
        </p>
      </div>


      <motion.div
        className="flex h-full w-full"
        animate={{ x: `-${index * 100}%` }}
        transition={{ 
          type: "spring", 
          damping: 35, 
          stiffness: 120,
          mass: 1 
        }}
      >
        {COMPONENTS.map((item, i) => (
          <div
            key={i}
            className="relative flex h-full w-full flex-shrink-0 items-center justify-center"
          >
            <Slide item={item} isActive={index === i} />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;



