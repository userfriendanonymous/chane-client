import api from "@/core/api"
import {ChannelType} from '@/core/bindings'
import useNotificationsStore from "@/hooks/notificationsStore"
import Button from "@/ui/button"
import DropDown from "@/ui/dropdown"
import Input from "@/ui/input"
import { ColumnScroller } from "@/ui/scroller"
import TextArea from "@/ui/textArea"
import UniqueVisualArray from "@/ui/uniqueVisualArray"
import { useCallback, useRef, useState } from "react"
import { BiPlus } from "react-icons/bi"
import ItemButtonWithWindow from "../itemButtonWithWindow"

let channelType = new Map<ChannelType, string>()
channelType.set('server_hosted', 'server hosted')
channelType.set('ghosted', 'ghosted')

export default () => (
    <ItemButtonWithWindow icon={<BiPlus className="scale-[1.4]"/>} window={<ItemPopupWindow/>}>
        Create channel
    </ItemButtonWithWindow>
)

function ItemPopupWindow(){
    const [selected, setSelected] = useState<ChannelType | undefined>(undefined)
    const pushNotification = useNotificationsStore(store => store.push)
    const [isLoading, setIsLoading] = useState(false)

    const [roles, setRoles] = useState<string[]>([])
    const [labels, setLabels] = useState<string[]>([])
    const descriptionRef = useRef<HTMLTextAreaElement>(null!)
    const defaultRoleRef = useRef<HTMLInputElement>(null!)
    const titleRef = useRef<HTMLInputElement>(null!)

    const onSubmit = useCallback(async () => {
        if (!selected){
            pushNotification({content: 'select channel type', type: 'error'})
            return
        }
        setIsLoading(true)
        const result = await api.createChannel({
            default_role: defaultRoleRef.current.value,
            description: descriptionRef.current.value,
            title: titleRef.current.value,
            labels: labels,
            type: selected
        })
        if (result.is == 'Ok'){
            pushNotification({content: JSON.stringify(result.data), type: 'success'})
        } else {
            pushNotification({content: JSON.stringify(result.data), type: 'error'})
        }
        setIsLoading(false)
    }, [selected, pushNotification, descriptionRef, roles, defaultRoleRef, labels])

    return (
        <div className="gap-block flex flex-col w-[20rem]">
            <Input ref={titleRef} className="bg-[#eeeeee]" placeholder="Title?"/>
            <TextArea ref={descriptionRef} placeholder='Description?'/>
            <DropDown selected={selected} onSelect={setSelected} placeholder={'Channel type?'} items={channelType}/>
            <Input ref={defaultRoleRef} placeholder="Default role id?"/>
            <ColumnScroller className="h-[10rem] flex flex-col gap-block">
                <UniqueVisualArray items={roles} setItems={setRoles} placeholder='Add role id...' text='Pinned roles'/>
                <UniqueVisualArray items={labels} setItems={setLabels} placeholder='Add label...' text='Labels'/>
            </ColumnScroller>
            <Button onClick={onSubmit} disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</Button>
            
        </div>
    )
}