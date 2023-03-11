import IconButton from "@/ui/iconButton"
import InputField from "./inputField"

export default function SendBar(){
    return (
        <div className="flex gap-block items-center p-block rounded-widget bg-[#D9D9D9] h-[3.5rem]">
            <IconButton/>
            <InputField/>
            <IconButton/>
        </div>
    )
}