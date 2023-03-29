import Button from "@/ui/button"
import Input from "@/ui/input"
import { useRef } from "react"

interface Props {
    onOpen: (id: string) => void
}

export default function Closed({onOpen}: Props){
    const idRef = useRef<HTMLInputElement>(null!)
    return (
        <div>
            <Input ref={idRef} placeholder="id?"/>
            <Button onClick={() => onOpen(idRef.current.value)}>Connect</Button>
        </div>
    )
}