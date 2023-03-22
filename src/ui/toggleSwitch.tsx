import {motion} from 'framer-motion'

export interface Props {
    isOn: boolean
    onSwitch: () => void
}

export default function ToggleSwitch({isOn, onSwitch}: Props){
    return (
        <motion.div className='cursor-pointer sub-window w-[3.5rem] h-[2rem]' onClick={onSwitch}
            style={{
                justifyContent: isOn ? 'flex-end' : 'flex-start'
            }}
            animate={isOn ? {
                backgroundColor: '#ff5900'
            } : {
                backgroundColor: '#c6c6c6'
            }}
            transition={{
                type: 'tween',
                duration: 0.2
            }}
        >
            <motion.div
                layout
                transition={{
                    type: 'spring',
                    bounce: 0.5,
                    duration: 0.45
                }}
                className='rounded-[0.3rem] w-[1rem] bg-[white]'
            />
        </motion.div>
    )
}