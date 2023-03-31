import Button from "@/ui/button"
import Input from "@/ui/input"
import { useRef } from "react"
import { OnOpen } from ".."

interface Props {
    onOpen: OnOpen
}

export default function Closed({onOpen}: Props){
    const idRef = useRef<HTMLInputElement>(null!)
    return (
        <div>
            <Input ref={idRef} placeholder="id?"/>
            <Button onClick={() => onOpen(idRef.current.value, true)}>Connect</Button>
            <Button onClick={() => onOpen(idRef.current.value, false)}>View</Button>
        </div>
    )
}