import api from "@/core/api";
import useAuthStore from "@/hooks/authStore";
import useNotificationsStore from "@/hooks/notificationsStore";
import Button from "@/ui/button";
import Input from "@/ui/input";
import { useCallback, useRef, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import ButtonWithWindow from "../buttonWithWindow";

export default function LoginItem(){
    const [isLoading, setIsLoading] = useState(false)
    const usernameRef = useRef<HTMLInputElement>(null!)
    const passwordRef = useRef<HTMLInputElement>(null!)
    const pushNotification = useNotificationsStore(store => store.push)
    const validateAuth = useAuthStore(store => store.validate)

    const onSubmit = useCallback(async () => {
        setIsLoading(true)
        let name = usernameRef.current.value
        const result = await api.login(name, passwordRef.current.value)
        if (result.type == 'success'){
            pushNotification('Logged in', 'success')
            validateAuth(name)

        } else {
            pushNotification(result.data, 'error')
            validateAuth('hi')
        }
        setIsLoading(false)
    }, [])

    return (
        <ButtonWithWindow icon={<BiLogIn className="scale-[1.3]"/>} text='Login'>
            <div className="w-[14rem] flex flex-col gap-block">
                <Input ref={usernameRef} placeholder="Username?"/>
                <Input ref={passwordRef} placeholder="Password?"/>
                <Button onClick={onSubmit} disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</Button>
            </div>
        </ButtonWithWindow>
    )
}