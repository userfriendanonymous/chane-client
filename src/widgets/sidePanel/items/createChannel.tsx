import Button from "@/ui/button";
import DropDown from "@/ui/dropdown";
import Input from "@/ui/input";
import { BiPlus } from "react-icons/bi";
import ButtonWithWindow from "../buttonWithWindow"

let items = new Map()
items.set('why', 'cool')
items.set('ideal', 'illegal')

export default function CreateChannelItem(){
    return (
        <ButtonWithWindow icon={<BiPlus className="scale-[1.4]"/>} text='Create channel'>
            <div className="gap-block flex flex-col w-[15rem]">
                <Input className="bg-[#eeeeee]" placeholder=""/>
                <Button>Hey</Button>
                <DropDown placeholder={'select'} items={items}/>
            </div>
        </ButtonWithWindow>
    )
}