import {AnimatePresence, motion, useDragControls} from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BiX } from 'react-icons/bi'

interface Props {
    children: React.ReactNode
    onClose: () => void
}

export default function PopupWindow({children, onClose}: Props){

    return (
        <motion.div
            variants={{
                shown: {
                    scale: 1,
                    opacity: 1,
                    originY: 0
                },

                hidden: {
                    scale: 0,
                    opacity: 0
                }
            }}
            transition={{
                type: 'spring',
                duration: 0.53,
                bounce: 0.45
            }}
            initial='hidden'
            animate='shown'
            exit='hidden'

            className='mt-[1rem] absolute block-window flex-col bg-white shadow-[0_0_30px_#cfcfcf] z-[100]'
        >
            <div className="flex gap-sub">
                <div className='bg-[#f2f2f2] h-[2rem] rounded-full flex-grow'/>
                <div className='bg-[#f2f2f2] w-[2rem] h-[2rem] rounded-full flex items-center justify-center cursor-pointer' onClick={onClose}>
                    <BiX className='scale-[1.2]'/>
                </div>
            </div>

            {children}
        </motion.div>
    )
}