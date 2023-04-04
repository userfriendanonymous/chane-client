import api from "@/core/api"
import useAuthStore from "@/hooks/authStore"
import useNotificationsStore from "@/hooks/notificationsStore"
import Button from "@/ui/button"
import Input from "@/ui/input"
import { useCallback, useRef, useState } from "react"
import { BiLogIn } from "react-icons/bi"
import ItemButtonWithWindow from "../itemButtonWithWindow"

export default () => (
    <ItemButtonWithWindow icon={<BiLogIn className="scale-[1.3]"/>} window={<ItemPopupWindow/>}>
        Login
    </ItemButtonWithWindow>
)

function ItemPopupWindow(){
    const [isLoading, setIsLoading] = useState(false)
    const usernameRef = useRef<HTMLInputElement>(null!)
    const passwordRef = useRef<HTMLInputElement>(null!)
    const pushNotification = useNotificationsStore(store => store.push)
    const validateAuth = useAuthStore(store => store.validate)

    const onSubmit = useCallback(async () => {
        setIsLoading(true)
        let name = usernameRef.current.value
        const result = await api.login({name, password: passwordRef.current.value})
        if (result.is == 'Ok'){
            pushNotification({content: 'Logged in', type: 'success'})
            validateAuth(name)

        } else {
            pushNotification({content: JSON.stringify(result.data), type: 'error'})
            validateAuth('hi')
        }
        setIsLoading(false)
    }, [])

    return (
        <div className="w-[14rem] flex flex-col gap-block">
            <Input ref={usernameRef} placeholder="Username?"/>
            <Input ref={passwordRef} placeholder="Password?"/>
            <Button onClick={onSubmit} disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</Button>
        </div>
    )
}