import api from "@/core/api";
import useAuthStore from "@/hooks/authStore";
import useNotificationsStore from "@/hooks/notificationsStore";
import Button from "@/ui/button";
import Input from "@/ui/input";
import { useCallback, useRef, useState } from "react";
import { BiCool } from "react-icons/bi";
import ButtonWithWindow from "../buttonWithWindow";

export default function JoinItem(){
    const [isLoading, setIsLoading] = useState(false)
    const pushNotification = useNotificationsStore(store => store.push)
    const validateAuth = useAuthStore(store => store.validate)
    const usernameRef = useRef<HTMLInputElement>(null!)
    const emailRef = useRef<HTMLInputElement>(null!)
    const passwordRef = useRef<HTMLInputElement>(null!)

    const onSubmit = useCallback(async () => {
        setIsLoading(true)
        let name = usernameRef.current.value
        const result = await api.join(name, emailRef.current.value, passwordRef.current.value)
        if (result.type == 'success'){
            validateAuth(name)
            pushNotification('Joined!', 'success')

        } else {
            pushNotification(result.data, 'error')
        }
        setIsLoading(false)
    }, [pushNotification])

    return (
        <ButtonWithWindow icon={<BiCool className="scale-[1.5]"/>} text='Join us'>
            <Input ref={emailRef} placeholder="Email?"/>
            <Input ref={usernameRef} placeholder="Username?"/>
            <Input ref={passwordRef} placeholder="Password?"/>
            <Button disabled={isLoading} onClick={onSubmit}>{isLoading ? 'Loading...' : 'Join B)'}</Button>
        </ButtonWithWindow>
    )
}