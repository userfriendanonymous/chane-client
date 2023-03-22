import api from "@/core/api"
import MiniActionButton from "@/ui/miniActionButton"
import { useRef } from "react"

interface Props {
    onSend: (content: string) => void
}

export default function InputField({onSend}: Props){
    const inputRef = useRef<HTMLInputElement>(null!)
    return (
        <div className='flex p-sub h-[2.5rem] bg-white sub-window items-center flex-grow'>
            <input ref={inputRef} className="flex-grow"/>
            <MiniActionButton onClick={() => {
                onSend(inputRef.current.value)
            }}/>
        </div>
    )
}