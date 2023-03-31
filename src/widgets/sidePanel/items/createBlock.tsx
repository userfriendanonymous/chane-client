import api from "@/core/api"
import useNotificationsStore from "@/hooks/notificationsStore"
import Button from "@/ui/button"
import Input from "@/ui/input"
import { useCallback, useRef, useState } from "react"
import { BiCube } from "react-icons/bi"
import ItemButtonWithWindow from "../itemButtonWithWindow"

export default () => (
    <ItemButtonWithWindow icon={<BiCube className="scale-[1.35]"/>} window={<ItemPopupWindow/>} windowId="createBlockSidePanelItem">
        Create block
    </ItemButtonWithWindow>
)

function ItemPopupWindow(){
    const buttonRef = useRef<HTMLInputElement>(null!)
    const [isLoading, setIsLoading] = useState(false)
    const pushNotification = useNotificationsStore(store => store.push)

    const onSubmit = useCallback(async () => {
        setIsLoading(true)
        const result = await api.createBlock({
            content: buttonRef.current.value
        })
        if (result.is == 'Ok'){
            pushNotification({content: result.data, type: 'success'})
        } else {
            pushNotification({content: JSON.stringify(result.data), type: 'error'})
        }
        setIsLoading(false)
    }, [])

    return (
        <div className="gap-block flex flex-col w-[15rem]">
            <Input ref={buttonRef} className="bg-[#eeeeee]" placeholder="Content?"/>
            <Button disabled={isLoading} onClick={onSubmit}>{isLoading ? 'Loading...' : 'Create'}</Button>
        </div>
    )
}