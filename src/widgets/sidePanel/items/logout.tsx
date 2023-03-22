import { BiLogIn, BiLogOut } from "react-icons/bi";
import ButtonWithWindow from "../buttonWithWindow";

export default function LogoutItem(){
    return (
        <ButtonWithWindow icon={<BiLogOut className="scale-[1.3]"/>} text='Log out'>

        </ButtonWithWindow>
    )
}