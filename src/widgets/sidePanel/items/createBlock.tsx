import api from "@/core/api"
import useNotificationsStore from "@/hooks/notificationsStore"
import Button from "@/ui/button"
import Input from "@/ui/input"
import { useCallback, useRef, useState } from "react"
import { BiCube } from "react-icons/bi"
import ButtonWithWindow from "../buttonWithWindow"

export default function CreateBlockItem(){
    const buttonRef = useRef<HTMLInputElement>(null!)
    const [isLoading, setIsLoading] = useState(false)
    const pushNotification = useNotificationsStore(store => store.push)

    const onSubmit = useCallback(async () => {
        setIsLoading(true)
        const result = await api.createBlock({
            content: buttonRef.current.value
        })
        if (result.is == 'Ok'){
            pushNotification(result.data, 'success')
        } else {
            pushNotification(JSON.stringify(result.data), 'error')
        }
        setIsLoading(false)
    }, [])

    return (
        <ButtonWithWindow icon={<BiCube className="scale-[1.35]"/>} text='Create block'>
            <div className="gap-block flex flex-col w-[15rem]">
                <Input ref={buttonRef} className="bg-[#eeeeee]" placeholder="Content?"/>
                <Button disabled={isLoading} onClick={onSubmit}>{isLoading ? 'Loading...' : 'Create'}</Button>
            </div>
        </ButtonWithWindow>
    )
}