import useAuthStore from "@/hooks/authStore";
import Button from "@/ui/button";
import { useCallback } from "react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import ButtonWithWindow from "../buttonWithWindow";

export default function LogoutItem(){
    const invalidateAuth = useAuthStore(store => store.invalidate)
    const onSubmit = useCallback(() => {
        invalidateAuth()
    }, [invalidateAuth])

    return (
        <ButtonWithWindow icon={<BiLogOut className="scale-[1.3]"/>} text='Log out'>
            <div className="w-[10rem]">
                <Button onClick={onSubmit}>Log me out!</Button>
            </div>
        </ButtonWithWindow>
    )
}