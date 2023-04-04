import ItemButton from "./itemButton"
import { useCallback, useEffect, useRef, useState } from "react"
import usePopupWindowsStore from "@/hooks/popupWindowsStore"
import { ItemButtonState } from "."
import PopupWindow from '@/ui/popupWindow'
import usePopupWindowsManager from "@/hooks/popupWindowsManager"

interface Props {
    window: React.ReactNode
    children: React.ReactNode
    icon: React.ReactNode
    onClose?: (close: () => void) => {}

}

export default function ItemButtonWithWindow({window, children, icon, onClose}: Props){
    const windowsManager = usePopupWindowsManager()

    const onCloseWindow = useCallback((id: number) => {
        windowsManager.remove(id)
    }, [windowsManager.remove])
    
    const windowFn = useCallback((id: number) => {
        return (
            <PopupWindow onClose={() => onClose ? onClose(() => onCloseWindow(id)) : onCloseWindow(id)}>
                {window}
            </PopupWindow>
        )
    }, [onCloseWindow])

    windowsManager.instance(windowFn)

    return (
        <ItemButton icon={icon} onClick={() => {windowsManager.spawn()}}>
            {children}
        </ItemButton>
    )
}