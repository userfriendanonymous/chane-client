import { useCallback, useEffect, useRef } from "react"
import { BiPlus } from "react-icons/bi"
import Input from "./input"
import InputPro from "./inputPro"

interface Props {
    text: string
    items: React.ReactNode[]
    placeholder: string
    onAdded: (content: string) => void
    onRemoved: (id: number) => void
}

export default function VisualArray({text, items, onAdded, onRemoved, placeholder}: Props){
    const inputRef = useRef<HTMLInputElement>(null!)

    useEffect(() => {
        inputRef.current.value = ''
    }, [items])

    return (
        <div className="block-window flex-col bg-[white] bordered-window">
                <div className="text-[1.1rem] font-medium">{text}</div>
                <InputPro onSubmitted={() => onAdded(inputRef.current.value)} ref={inputRef} placeholder={placeholder}
                    icon={<BiPlus/>}
                />
            <div className="flex flex-wrap gap-sub">{
                items.map((item, id) => (
                    <div className="rounded-sub flex items-center px-[0.7rem] h-[2rem] text-white bg-[#ff3700] cursor-pointer"
                        onClick={() => {
                            onRemoved(id)
                        }}
                    >
                        {item}
                    </div>
                ))
            }</div>
        </div>
    )
}