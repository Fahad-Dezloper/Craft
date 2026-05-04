"use client"
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

const Card = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <CardContent />
        </div>
    )
}

export default Card

function CardContent() {
    const [open, setOpen] = useState(true);
    return (
        <>
        <AnimatePresence>
        {open && 
        <motion.div
        initial={{
            opacity: 0,
            scale: 0.98,
            filter: 'blur(10px)'
        }}
        animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)'
        }}
        exit={{
            opacity: 0,
            scale: 0.98,
            filter: 'blur(10px)'
        }}
        transition={{
            duration: 0.3,
            ease: "easeInOut"
        }}
        className={cn(
            "w-72 min-h-[26rem] h-[26rem] bg-white rounded-xl",
            "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]",
            "p-6 flex flex-col"
        )}>
            <h2 className='font-bold text-neutral-600 text-[10px]'>Aceternity UI Components</h2>
            <p className='text-neutral-600 mt-2 text-[10px]'>A collection of ui components</p>
            <div className='flex items-center  justify-center'>
                <button className='flex items-center bg-white text-neutral-600 gap-1 text-[10px] mt-4 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-md px-2 py-1'>
                    {" "}Emil Paaji
                    <XIcon onClick={() => setOpen(false)} className="h-3 w-3 text-neutral-400" />
                </button>
            </div>
            <div className='bg-gray-100 flex-1 mt-4 rounded-lg border border-dashed border-neutral-200 relative'>
                <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.98,
                    filter: "blur(10px)"
                }}
                whileHover={{
                    opacity: 1,
                    scale: 1.05,
                    filter: "blur(0px)"
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
                className='absolute inset-0 w-full h-full bg-white border border-neutral-200 text-neutral-600 rounded-lg divide-y divide-neutral-200'>
                    <div className='py-4 w-full text-center'>Superteam</div>
                    <div className='py-4 w-full text-center'>Superteam</div>
                    <div className='py-4 w-full text-center'>Superteam</div>
                    <div className='py-4 w-full text-center'>Superteam</div>
                    <div className='py-4 w-full text-center'>Superteam</div>
                </motion.div>
            </div>
        </motion.div> 
        }
        </AnimatePresence>
        </>
    )
}

