import usePopupWindowsStore from "@/hooks/popupWindowsStore"
import { ReactNode } from "react"

export default function PopupWindows(){
    let [data] = usePopupWindowsStore()
    let elements: ReactNode[] = []
    
    data.forEach((item, key) => elements.push(
        <div key={key}>
            {item.element}
        </div>
    ))
    return (
        <div>
            {elements}
        </div>
    )
}