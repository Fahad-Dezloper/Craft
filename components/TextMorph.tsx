import React from 'react'

import GooeyGroup from '@/components/GooeyGroup'

const lines = [
  { text: 'how are you', padding: 'px-10' },
  { text: 'doing', padding: 'px-2' },
  { text: 'wassup bro how', padding: 'px-10' },
]

const TextMorph = () => {
  return (
    <GooeyGroup className='text-2xl font-black leading-none' overlap={2} backgroundClassName='bg-red-400'>
      {/* {lines.map((line) => (
      ))} */}
        <span className={`w-fit px-4 py-2`}>
          hwo are you
        </span>

        <span className={`w-fit px-2 py-2`}>
          how
        </span>

        <span className={`w-fit px-4 py-2`}>
          hwo are you
        </span>
    </GooeyGroup>
  )
}

export default TextMorph