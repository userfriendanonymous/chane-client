import React, { useState } from "react"
import { BiAnchor, BiArrowBack, BiArrowToTop, BiDroplet, BiExpand } from "react-icons/bi"

interface Props<ChannelType> {
    items: Map<ChannelType, React.ReactNode>
    placeholder: React.ReactNode
    selected: ChannelType | undefined
    onSelect: (selected: ChannelType) => void
}

export default function DropDown<CT extends unknown>({items, placeholder, selected, onSelect}: Props<CT>){
    const [isOpen, setIsOpen] = useState(false)
    let elements: React.ReactNode[] = []
    items.forEach((value, key) => elements.push(
        <div className="transition-all cursor-pointer rounded-sub p-sub h-[2.4rem] bg-white text-black hover:bg-[#ff4800] hover:text-white"
        onClick={() => {
            onSelect(key)
        }}>
            {value}
        </div>
    ))

    return (
        <div className="relative">
            <div className="cursor-pointer sub-window h-[2.4rem] bordered-window box-border items-center justify-between"
                onClick={() => setIsOpen(open => !open)}
            >
                {selected ? items.get(selected) : placeholder}
                <BiAnchor style={{
                    transition: 'all 0.3s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}/>
            </div>
            {
                isOpen ?
                <div className="sub-window shadow-[0_0_20px_#d8d8d8] bg-white absolute mt-[0.3rem] flex-col w-full">
                    {elements}
                </div>
                :null
            }
        </div>
    )
}