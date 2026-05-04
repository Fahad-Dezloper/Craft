"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRef, useEffect, useState, useId } from "react";
import { X } from "lucide-react";

const useOutsideClick = (ref: React.RefObject<HTMLDivElement | null>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
};

export default function CardsGrow() {
  const [active, setActive] = useState<Card | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useOutsideClick(ref, () => setActive(null));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 py-20 px-4 min-h-screen">
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
            />
            
            {/* Expanded Card */}
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-5xl min-h-[700px] h-fit max-h-[95vh] bg-white dark:bg-neutral-900 rounded-[48px] overflow-hidden shadow-2xl relative flex flex-col md:flex-row z-60"
            >
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setActive(null)}
                className="absolute right-8 top-8 z-70 bg-black/50 backdrop-blur-md p-4 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={24} />
              </motion.button>

              <div className="relative w-full md:w-[40%] h-80 md:h-auto overflow-hidden">
                <motion.img
                  layoutId={`image-${active.title}-${id}`}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col p-8 md:p-16 overflow-auto bg-white dark:bg-neutral-900">
                <div className="mb-8">
                    <motion.h2
                        layoutId={`title-${active.title}-${id}`}
                        className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white tracking-tighter leading-none mb-4"
                    >
                        {active.title}
                    </motion.h2>
                    <motion.p
                        layoutId={`desc-${active.description}-${id}`}
                        className="text-neutral-500 text-2xl font-medium"
                    >
                        {active.description}
                    </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-neutral-600 dark:text-neutral-400 text-2xl leading-relaxed space-y-8"
                >
                  <div className="prose prose-2xl dark:prose-invert max-w-none font-medium">
                     {active.content()}
                  </div>
                  
                  <div className="pt-12 flex items-center gap-6">
                    <Link
                      href={active.ctaLink}
                      target="_blank"
                      className="px-12 py-5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-black text-2xl hover:scale-[1.05] active:scale-[0.95] transition-transform shadow-xl"
                    >
                      {active.ctaText}
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto flex flex-col gap-6">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-[32px] cursor-pointer hover:shadow-xl transition-all duration-300 flex items-center gap-6"
          >
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl">
              <motion.img
                layoutId={`image-${card.title}-${id}`}
                src={card.src}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex justify-between items-center pr-4">
              <div className="">
                <motion.h2
                  layoutId={`title-${card.title}-${id}`}
                  className="text-xl font-bold text-neutral-800 dark:text-neutral-200 tracking-tight"
                >
                  {card.title}
                </motion.h2>
                <motion.p
                  layoutId={`desc-${card.description}-${id}`}
                  className="text-neutral-500 text-lg"
                >
                  {card.description}
                </motion.p>
              </div>
              <motion.div
                className="px-6 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-900 dark:text-white text-lg font-bold group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors"
              >
                {card.ctaText}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}

type Card = {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
};

const cards: Card[] = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://images.unsplash.com/photo-1514525253344-991f8555ee41?q=80&w=3474&auto=format&fit=crop",
    ctaText: "Listen Now",
    ctaLink: "#",
    content: () => (
      <p>
        Lana Del Rey, an iconic American singer-songwriter, is celebrated for her melancholic and cinematic music style. 
        Her haunting voice and introspective lyrics explore themes of tragic romance, glamour, and melancholy, 
        drawing inspiration from both contemporary and vintage pop culture.
      </p>
    ),
  },
  {
    description: "Frank Ocean",
    title: "Blonde",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=3540&auto=format&fit=crop",
    ctaText: "Play Song",
    ctaLink: "#",
    content: () => (
      <p>
        Frank Ocean is known for his deeply personal songwriting and genre-bending sound. 
        Blonde is widely regarded as one of the most influential albums of the decade, 
        exploring love, identity, and self-reflection with raw emotional honesty.
      </p>
    ),
  },
  {
    description: "Kanye West",
    title: "MBDTF",
    src: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=3540&auto=format&fit=crop",
    ctaText: "View Album",
    ctaLink: "#",
    content: () => (
      <p>
        Kanye West is a visionary artist known for pushing creative boundaries. 
        My Beautiful Dark Twisted Fantasy is often praised for its maximalist production 
        and ambitious storytelling, blending vulnerability and grand musical arrangements.
      </p>
    ),
  },
  {
    description: "Taylor Swift",
    title: "Folklore",
    src: "https://images.unsplash.com/photo-1459749411177-042180ce673f?q=80&w=3540&auto=format&fit=crop",
    ctaText: "Explore",
    ctaLink: "#",
    content: () => (
      <p>
        Folklore marked a creative shift for Taylor Swift, embracing indie-folk and storytelling-driven songwriting. 
        The album weaves fictional narratives with emotional depth, showcasing maturity and lyrical finesse.
      </p>
    ),
  },
  {
    description: "The Weeknd",
    title: "After Hours",
    src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=3538&auto=format&fit=crop",
    ctaText: "Listen Now",
    ctaLink: "#",
    content: () => (
      <p>
        After Hours is a dark, synth-heavy journey through heartbreak and excess. 
        The Weeknd blends retro aesthetics with modern pop production, creating a cinematic world of isolation and reflection.
      </p>
    ),
  },
];

  