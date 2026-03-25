"use client";

import AnimatedSalesCard from "@/components/AnimatedSalesCard";
import { AnimatedText } from "@/components/AnimatedText";
import Card from "@/components/Card";
import CardsGrow from "@/components/CardsGrow";
import ClockAnimation from "@/components/ClockAnimation";
import DynamicIsland from "@/components/DynamicIsland";
import EarnWave from "@/components/EarnWave";
import FamilyDrawer from "@/components/FamilyDrawer";
import FeatureSection from "@/components/FeatureSection";
import HandGesture from "@/components/HandGesture";
import Preloader from "@/components/Preloader";
import SequenceBtn from "@/components/SequenceBtn";
import ShowcaseCard from "@/components/ShowcaseCard";
import TopBar from "@/components/TopBar";

const Home = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* <Card /> */}
      {/* // <FeatureSection /> */}
      {/* <CardsGrow /> */}
      {/* <SequenceBtn /> */}
      {/* // <AnimatedText /> */}
      {/* <Preloader /> */}
      {/* hi there */}
      {/* <EarnWave /> */}
      {/* <AnimatedSalesCard /> */}
      {/* <ShowcaseCard /> */}
      {/* <FamilyDrawer /> */}
      {/* <DynamicIsland /> */}
      {/* <TopBar /> */}
      {/* <HandGesture /> */}
      <ClockAnimation />
    </div>
  );
}

console.log("home", Home);

export default Home;
