import ItemButton from "./itemButton"
import { useCallback, useRef, useState } from "react"
import usePopupWindowsStore from "@/hooks/popupWindowsStore"
import { ItemButtonState } from "."
import PopupWindow from '@/ui/popupWindow'

interface Props {
    window: React.ReactNode
    children: React.ReactNode
    icon: React.ReactNode
    onClose?: (close: () => void) => {}
    windowId: string

}

export default function ItemButtonWithWindow({windowId, window, children, icon, onClose}: Props){
    const [state, setState] = useState<'open' | 'closed'>('open')
    const [, setPopupWindow] = usePopupWindowsStore()

    const defaultOnClose = () => {
        setState('closed')
    }

    if (state == 'open'){
        setPopupWindow(windowId, {
            element: (
                <PopupWindow onClose={() => {
                    onClose ? onClose(defaultOnClose) : defaultOnClose()
                }}>
                    {window}
                </PopupWindow>
            )
        })
    }

    return (
        <ItemButton icon={icon} onClick={() => setState('open')}>
            {children}
        </ItemButton>
    )
}