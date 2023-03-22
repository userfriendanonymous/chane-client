import PopupWindow from "@/ui/popupWindow"
import { useState } from "react"
import Button from "./button"
import {Props as ButtonProps} from './button'

interface Props extends ButtonProps {
}

export default function ButtonWithWindow({children, onClick, ...props}: ButtonProps){
    const [isShown, setIsShown] = useState(false)
    return (
        <Button {...props} onClick={(event) => {
            if (onClick) onClick(event)
            setIsShown(true)
        }}>
            <PopupWindow onClose={() => setIsShown(false)} shown={isShown}>
                {children}
            </PopupWindow>
        </Button>
    )
}