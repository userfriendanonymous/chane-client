import IconButton from "@/ui/iconButton"
import InputField from "./inputField"

interface Props {
    onSend: (content: string) => void
}

export default function SendBar({onSend}: Props){
    return (
        <div className="block-window items-center bordered-window h-[3.5rem]">
            <IconButton/>
            <InputField onSend={onSend}/>
            <IconButton/>
        </div>
    )
}