"use client";

import AnimatedSalesCard from "@/components/AnimatedSalesCard";
import { AnimatedText } from "@/components/AnimatedText";
import Card from "@/components/Card";
import CardsGrow from "@/components/CardsGrow";
import EarnWave from "@/components/EarnWave";
import FeatureSection from "@/components/FeatureSection";
import Preloader from "@/components/Preloader";
import SequenceBtn from "@/components/SequenceBtn";

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
      <AnimatedSalesCard />
    </div>
  );
}

console.log("home", Home);

export default Home;
