"use client"
import { motion } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if(ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [callback]);

    return ref;
};

export default function CardsGrow() {
    const [current, setCurrent] = useState<Card | null>(null);

    const ref = useOutsideClick(() => setCurrent(null));

    return (
        <div className="py-40 bg-gray-100 min-h-screen relative">
            {current && (
                <motion.div 
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                className="fixed z-10 h-full w-full inset-0 bg-black/50 backdrop-blur-sm"></motion.div>
            )}
            {current && <motion.div layoutId={`card-${current.title}`} ref={ref} className="h-[600px] fixed inset-0 m-auto z-20 bg-white w-80 rounded-2xl border border-neutral-200 p-4">
                    <motion.img layoutId={`card-image-${current.content}`} src={current.src} alt={current.title} className="aspect-square rounded-xl" />
                    <div className="flex flex-col justify-between items-start">
                        <div className="flex items-start w-full justify-between py-6 gap-2">
                            <motion.div className="flex flex-col items-start gap-2">
                                <motion.h2 layoutId={`card-text-${current.title}`} className="font-bold text-xs tracking-tight text-black">
                                    {current.title}
                                </motion.h2>
                                <motion.p layoutId={`card-text-${current.description}`} className="text-[10px] text-neutral-500">
                                    {current.description}
                                </motion.p>
                            </motion.div>
                            <Link href={current.ctaLink} className="px-2 py-1 bg-green-500 rounded-full text-white text-xs">{current.ctaText}</Link>
                        </div>

                        <motion.div
                        initial={{
                            filter: "blur(10px)",
                            opacity: 0
                        }}
                        animate={{
                            filter: "blur(0px)",
                            opacity: 1
                        }}
                        transition={{
                            delay: 0.3
                        }}
                        className="h-40 overflow-auto">{current.content()}</motion.div>
                    </div>
                </motion.div>}
            <div className="max-w-lg mx-auto flex flex-col gap-10">
                {cards.map((card, idx) => (
                    <motion.button
                    layoutId={`card-${card.title}`}
                        onClick={() => setCurrent(card)}
                     key={card.title} className="p-4 rounded-lg cursor-pointer flex justify-between items-center bg-white border border-neutral-200">
                        <div className="flex gap-4 items-center">
                            <motion.img layoutId={`card-image-${card.content}`} src={card.src} alt={card.title} className="h-14 aspect-square rounded-xl" />
                            <div className="flex flex-col items-center gap-2">
                                <motion.h2 layoutId={`card-text-${card.title}`} className="font-bold text-xs tracking-tight text-black">
                                    {card.title}
                                </motion.h2>
                                <motion.p layoutId={`card-text-${card.description}`} className="text-[10px] text-neutral-500">
                                    {card.description}
                                </motion.p>
                            </div>
                        </div>
                        <div className="px-2 py-1 capitalize bg-green-500 rounded-full text-white text-xs">
                            {card.ctaText}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}

type Card = {
    description: string;
    title: string;
    src: string;
    ctaText: string;
    ctaLink: string;
    content: () => React.ReactNode;
}

const cards: Card[] = [
    {
      description: "Lana Del Rey",
      title: "Summertime Sadness",
      src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
      ctaText: "play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p className="text-[10px] text-neutral-500">
            Lana Del Rey, an iconic American singer-songwriter, is celebrated for
            her melancholic and cinematic music style. Born Elizabeth Woolridge
            Grant in New York City, she has captivated audiences worldwide with
            her haunting voice and introspective lyrics.
            <br />
            <br />
            Her songs often explore themes of tragic romance, glamour, and
            melancholy, drawing inspiration from both contemporary and vintage
            pop culture.
          </p>
        );
      },
    },
    {
      description: "Frank Ocean",
      title: "Blonde",
      src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
      ctaText: "play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p className="text-[10px] text-neutral-500">
            Frank Ocean is known for his deeply personal songwriting and genre-
            bending sound. Blonde is widely regarded as one of the most influential
            albums of the decade.
            <br />
            <br />
            His work explores love, identity, nostalgia, and self-reflection with
            raw emotional honesty.
          </p>
        );
      },
    },
    {
      description: "Kanye West",
      title: "My Beautiful Dark Twisted Fantasy",
      src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
      ctaText: "play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p className="text-[10px] text-neutral-500">
            Kanye West is a visionary artist known for pushing creative boundaries.
            My Beautiful Dark Twisted Fantasy is often praised for its maximalist
            production and ambitious storytelling.
            <br />
            <br />
            The album blends vulnerability, ego, and grand musical arrangements
            into a landmark cultural moment.
          </p>
        );
      },
    },
    {
      description: "Taylor Swift",
      title: "Folklore",
      src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
      ctaText: "play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p className="text-[10px] text-neutral-500">
            Folklore marked a creative shift for Taylor Swift, embracing indie-folk
            and storytelling-driven songwriting.
            <br />
            <br />
            The album weaves fictional narratives with emotional depth, showcasing
            maturity and lyrical finesse.
          </p>
        );
      },
    },
    {
      description: "The Weeknd",
      title: "After Hours",
      src: "https://assets.aceternity.com/demos/metallica.jpeg",
      ctaText: "play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p className="text-[10px] text-neutral-500">
            After Hours is a dark, synth-heavy journey through heartbreak and
            excess. The Weeknd blends retro aesthetics with modern pop production.
            <br />
            <br />
            The album’s cinematic visuals and themes of isolation made it a global
            phenomenon.
          </p>
        );
      },
    },
  ];  