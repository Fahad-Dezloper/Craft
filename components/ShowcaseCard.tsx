import Image from "next/image";
import React from "react";

const ShowcaseCard = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-[30vw] w-[30vw] overflow-hidden rounded-[42px] border-8 shadow-xl">
        <div className="absolute inset-0 h-full w-full" />
        <Image
          src="/assets/Crab.jpg"
          alt="Crab image"
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default ShowcaseCard;
