import ToggleSwitch from "./toggleSwitch"
import {Props as ToggleSwitchProps} from './toggleSwitch'

interface Props extends ToggleSwitchProps {
}

export default function ToggleLabeled(props: Props){
    return (
        <div className="block-window justify-between items-center bg-[white] border-[1px] border-[#dedede]">
            <div className="text-[1.1rem] font-medium">
                Can set labels?
            </div>
            <ToggleSwitch {...props}/>
        </div>
    )
}