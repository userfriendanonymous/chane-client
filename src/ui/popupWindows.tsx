import usePopupWindowsStore from "@/hooks/popupWindowsStore"
import { AnimatePresence } from "framer-motion"
import { ReactNode } from "react"

export default function PopupWindows(){
    let data = usePopupWindowsStore(state => state.windows)
    let elements: ReactNode[] = []
    
    data.forEach((item, key) => elements.push(
        <div key={key}>
            {item}
        </div>
    ))
    return (
        <div className="absolute z-[100000] justify-self-center flex items-center justify-center">
            <AnimatePresence>
                {elements}
            </AnimatePresence>
        </div>
    )
}