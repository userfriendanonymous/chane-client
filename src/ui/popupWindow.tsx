import {AnimatePresence, motion, useDragControls} from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BiX } from 'react-icons/bi'

interface Props {
    children: React.ReactNode,
    shown?: boolean,
    onClose: () => void
}

export default function PopupWindow({children, shown, onClose}: Props){
    const windowRef = useRef<HTMLDivElement>(null!)
    const [state, setState] = useState({
        dragPosition: [0, 0],
        position: [0, 0],
        isMouseDown: false,
        isDragging: false
    })

    const mouseMoveListener = useCallback((event: MouseEvent) => {
        console.log(state.isMouseDown, state.isDragging)
        if (state.isMouseDown && state.isDragging){
            setState(state => ({
                ...state,
                position: [state.dragPosition[0] + event.pageX, state.dragPosition[1] + event.pageY]
            }))
        } else {
            if (state.isDragging){
                setState(state => ({...state, isDragging: false}))
            }
        }
    }, [setState])

    const mouseUpListener = useCallback(() => {
        setState(state => ({
            ...state,
            isMouseDown: false
        }))
    }, [setState])

    const mouseDownListener = useCallback(() => {
        setState(state => ({
            ...state,
            isMouseDown: true
        }))
    }, [setState])

    useEffect(() => {
        document.addEventListener('mousedown', mouseDownListener)
        document.addEventListener('mouseup', mouseUpListener)
        document.addEventListener('mousemove', mouseMoveListener)

        return () => {
            document.removeEventListener('mousedown', mouseDownListener)
            document.removeEventListener('mouseup', mouseUpListener)
            document.removeEventListener('mousemove', mouseMoveListener)
        }
    }, [])

    return (
        <AnimatePresence>{
            shown ?
            <motion.div
                ref={windowRef}
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
                style={{
                    translateX: state.position[0],
                    translateY: state.position[1]
                }}
            >
                <div className="flex gap-sub">
                    <div className='bg-[#f2f2f2] h-[2rem] rounded-full flex-grow'
                        onPointerDown={(event) => {
                            setState(state => ({
                                ...state,
                                dragPosition: [state.position[0] - event.pageX, state.position[1] - event.pageY]
                            }))
                        }}
                    />
                    <div className='bg-[#f2f2f2] w-[2rem] h-[2rem] rounded-full flex items-center justify-center cursor-pointer' onClick={onClose}>
                        <BiX className='scale-[1.2]'/>
                    </div>
                </div>

                {children}
            </motion.div>

            :null
        }</AnimatePresence>

    )
}