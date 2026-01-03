"use client"
import react from 'react'
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { BoltIcon, PhoneOutgoingIcon, RocketIcon, SparkleIcon, WandIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { useState } from 'react';

type Features = {
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
};

const features: Features[] = [
  {
    icon: <RocketIcon className="h-8 w-8 text-neutral-200" />,
    title: "Generate ultra realistic images in seconds",
    description:
      "With our state of the art AI, you can generate ultra realistic images in no time at all.",
    content: (
      <div>
        <Image
          src="https://assets.aceternity.com/pro/car-1.jpg"
          alt="car"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <SparkleIcon className="h-8 w-8 text-neutral-200" />,
    title: "High-quality outputs every time",
    description:
      "Our models are trained to deliver consistent, production-grade visuals.",
    content: (
      <div>
        <Image
          src="https://assets.aceternity.com/pro/car-2.jpg"
          alt="car"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <PhoneOutgoingIcon className="h-8 w-8 text-neutral-200" />,
    title: "Multiple styles & presets",
    description:
      "Choose from a wide range of artistic styles and visual presets.",
    content: (
      <div>
        <Image
          src="https://assets.aceternity.com/pro/car-3.jpg"
          alt="car"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <BoltIcon className="h-8 w-8 text-neutral-200" />,
    title: "Blazing fast generation",
    description:
      "Optimized pipelines ensure minimal latency and instant results.",
    content: (
      <div>
        <Image
          src="https://assets.aceternity.com/pro/car-4.jpg"
          alt="car"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
]

export default function FeatureSection() {
    const backgrounds = ["#343434", "#00193b", "#05291c"]
    const [background, setBackground ] = useState(backgrounds[0]);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
      });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const finalValue = Math.floor(latest * backgrounds.length);
        setBackground(backgrounds[finalValue])
    });
  

  return (
    <motion.div
    animate={{
        background
    }}
    ref={ref} className='flex bg-neutral-900 justify-center items-center min-h-screen'>
      <div className='flex flex-col gap-10 py-40 max-w-4xl mx-auto'>
        {features.map((feature, idx) => (
          <Card key={idx} feature={feature} />
        ))}
      </div>
    </motion.div>
  )
}

const Card = ({ feature }: { feature: Features }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const translateContent = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const blur  = useTransform(scrollYProgress, [0.5, 1], [0, 10]);
  return (
    <motion.div 
    ref={ref} className='grid grid-cols-2 gap-20 py-40'>
      <motion.div
      style={{
        filter: useMotionTemplate`blur(${blur}px)`
      }}
      className='flex flex-col gap-5'>
        {feature.icon}
        <h2 className='text-4xl font-bold text-white'>{feature.title}</h2>
        <p className='text-lg text-neutral-400'>{feature.description}</p>
      </motion.div>
      <motion.div
        style={{
          y: translateContent
        }}
      >{feature.content}</motion.div>
    </motion.div>
  )
}
