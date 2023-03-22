import Page from "@/widgets/page"
import Button from "@/ui/button"
import Input from "@/ui/input"
import { useCallback, useRef } from "react"
import api from "@/core/api"

export default function(){
    const emailRef = useRef<HTMLInputElement>(null!)
    const nameRef = useRef<HTMLInputElement>(null!)
    const passwordRef = useRef<HTMLInputElement>(null!)

    const onSubmit = useCallback(async () => {
        const response = await api.join(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
        if (response.type == 'success'){
            alert('success: ' + JSON.stringify(response.data))
        } else {
            alert('fail: ' + JSON.stringify(response.data))
        }
    }, [emailRef, nameRef, passwordRef])

    return (
        <Page>
            <div className='items-center justify-center widget-window bg-[#f4f4f4] flex-grow'>
                <div className="widget-window flex-col w-[20rem] bg-[#383863]">
                    <div className="text-center text-white text-[1rem]">Join us?</div>
                    <Input ref={emailRef} placeholder="Email?"/>
                    <Input ref={nameRef} placeholder="Username?"/>
                    <Input ref={passwordRef} placeholder="Password?"/>
                    <Button onClick={onSubmit}>Join!</Button>
                </div>
            </div>
        </Page>
    )
}