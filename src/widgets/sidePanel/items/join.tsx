import api from "@/core/api"
import useAuthStore from "@/hooks/authStore"
import useNotificationsStore from "@/hooks/notificationsStore"
import Button from "@/ui/button"
import Input from "@/ui/input"
import { useCallback, useRef, useState } from "react"
import { BiCool } from "react-icons/bi"
import ItemButtonWithWindow from "../itemButtonWithWindow"

export default () => (
    <ItemButtonWithWindow icon={<BiCool className="scale-[1.5]"/>} window={<ItemPopupWindow/>} windowId="joinSidePanelItem">
        Join us
    </ItemButtonWithWindow>
)


function ItemPopupWindow(){
    const [isLoading, setIsLoading] = useState(false)
    const pushNotification = useNotificationsStore(store => store.push)
    const validateAuth = useAuthStore(store => store.validate)
    const usernameRef = useRef<HTMLInputElement>(null!)
    const emailRef = useRef<HTMLInputElement>(null!)
    const passwordRef = useRef<HTMLInputElement>(null!)

    const onSubmit = useCallback(async () => {
        setIsLoading(true)
        let name = usernameRef.current.value
        const result = await api.join({
            email: emailRef.current.value,
            name: usernameRef.current.value,
            password: passwordRef.current.value
        })
        if (result.is == 'Ok'){
            validateAuth(name)
            pushNotification({content: 'Joined!', type: 'success'})
        } else {
            pushNotification({content: JSON.stringify(result.data), type: 'error'})
        }
        setIsLoading(false)
    }, [pushNotification])

    return (
        <div>
            <Input ref={emailRef} placeholder="Email?"/>
            <Input ref={usernameRef} placeholder="Username?"/>
            <Input ref={passwordRef} placeholder="Password?"/>
            <Button disabled={isLoading} onClick={onSubmit}>{isLoading ? 'Loading...' : 'Join B)'}</Button>
        </div>
    )
}