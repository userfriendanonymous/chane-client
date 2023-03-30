import api from "@/core/api"
import MiniActionButton from "@/ui/miniActionButton"
import { useRef } from "react"
import { BiSend } from "react-icons/bi"

interface Props {
    onSend: (content: string) => void
}

export default function InputField({onSend}: Props){
    const inputRef = useRef<HTMLInputElement>(null!)
    return (
        <div className='flex h-[3.5rem] bg-white bordered-window items-center flex-grow'>
            <input ref={inputRef} className="flex-grow h-[100%] px-sub text-[1.3rem]"/>
            <div onClick={() => onSend(inputRef.current.value)} className="w-[3.5rem] h-[100%] bg-[#f3f3f3] flex items-center justify-center cursor-pointer">
                <BiSend className="scale-[2]"/>
            </div>
            {/* <MiniActionButton onClick={() => {
                onSend(inputRef.current.value)
            }}/> */}
        </div>
    )
}