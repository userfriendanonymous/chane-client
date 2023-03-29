import Button from "@/ui/button";
import Input from "@/ui/input";
import { useCallback, useRef } from "react"

interface Props {
    onEnter: (id: string) => void
}

export default function UnselectedMainFeed({onEnter}: Props){
    const channelIdRef = useRef<HTMLInputElement>(null!)

    const onEnterClick = useCallback(() => {
        onEnter(channelIdRef.current.value)
    }, [])

    return (
        <div className="section-window flex-grow">
            <Input ref={channelIdRef} placeholder="channel id?"/>
            <Button onClick={onEnterClick}>Enter</Button>
        </div>
    )
}