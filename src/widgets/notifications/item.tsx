import {Notification} from '@/hooks/notificationsStore'
import { BiCheck, BiError, BiNoEntry } from 'react-icons/bi'

interface Props {
    content: Notification['content']
    type: Notification['type']
}

export default function Item({type, content}: Props){
    return (
        <div className={`px-[2rem] flex rounded-block gap-block h-[3.4rem] text-[1.3rem] font-medium text-white items-center ${type == 'success' ? 'bg-[#21d124]' : type == 'warning' ? 'bg-[#ff6600]' : 'bg-[#ff0033]'}`}>
            {
                type == 'error' ?
                <BiError/>
                : type == 'success' ? 
                <BiCheck/>
                :
                <BiNoEntry/>
            }
            {content}
        </div>
    )
}