import Image from 'next/image'
import React from 'react'

const ShowcaseCard = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='w-[30vw] h-[30vw] relative border-8 shadow-xl overflow-hidden rounded-[42px] '>
          <div className='absolute inset-0 w-full h-full ' />
            <Image src="/assets/Crab.jpg" alt="Crab image" width={400} height={400} className='w-full h-full object-cover' />
        </div>
    </div>
  )
}

export default ShowcaseCard