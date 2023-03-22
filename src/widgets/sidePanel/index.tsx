import { motion } from "framer-motion"
import {BiPlus} from 'react-icons/bi'
import ButtonWithWindow from "./buttonWithWindow"
import Input from "@/ui/input"
import Button from "@/ui/button"
import CreateBlockItem from "./items/createBlock"
import CreateChannelItem from "./items/createChannel"
import CreateRoleItem from "./items/createRole"
import LoginItem from "./items/login"
import JoinItem from "./items/join"
import LogoutItem from "./items/logout"
import useAuthStore from "@/hooks/authStore"

const VARIANTS = {
    open: {
        width: '15rem',
        boxShadow: '0px 0px 200px #aeaeae'
    },
    closed: {
        width: '5rem',
        boxShadow: '0px 0px 0px #aeaeae'
    }
}

const TRANSITION = {
    type: 'spring',
    duration: 0.6,
}

export default function SidePanel(){
    const authState = useAuthStore(state => state.state)

    return (
        <div className="w-[5rem] z-[100]">
            <motion.div
                className='box-border h-[100%] rounded-section p-widget flex flex-col gap-widget bg-[white] border-[2px] border-[#e5e5e5]'
                variants={VARIANTS}
                transition={TRANSITION}
                initial='closed'
                animate='closed'
                whileHover='open'
            >
                {
                    authState.is == 'valid' ?
                    <>
                    <CreateChannelItem/>
                    <CreateBlockItem/>
                    <CreateRoleItem/>
                    <LogoutItem/>
                    </>

                    :
                    <>
                    <JoinItem/>
                    <LoginItem/>
                    </>
                }
                
                
            </motion.div>
        </div>
    )
}