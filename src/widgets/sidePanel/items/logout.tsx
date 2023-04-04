import useAuthStore from "@/hooks/authStore"
import Button from "@/ui/button"
import { useCallback } from "react"
import { BiLogIn, BiLogOut } from "react-icons/bi"
import ItemButtonWithWindow from "../itemButtonWithWindow"

export default () => (
    <ItemButtonWithWindow icon={<BiLogOut className="scale-[1.3]"/>} window={<ItemPopupWindow/>}>
        Log out
    </ItemButtonWithWindow>
)

function ItemPopupWindow(){
    const invalidateAuth = useAuthStore(store => store.invalidate)
    const onSubmit = useCallback(() => {
        invalidateAuth()
    }, [invalidateAuth])

    return (
        <div className="w-[10rem]">
            <Button onClick={onSubmit}>Log me out!</Button>
        </div>
    )
}