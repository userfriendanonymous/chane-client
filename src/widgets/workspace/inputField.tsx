import MiniActionButton from "@/ui/miniActionButton";

export default function InputField(){
    return (
        <div className='flex p-sub h-[2.5rem] bg-white rounded-block items-center flex-grow'>
            <input className="flex-grow"/>
            <MiniActionButton/>
        </div>
    )
}