import api from "@/core/api";
import Button from "@/ui/button";
import {ColumnScroller} from "@/ui/scroller";
import DropDown from "@/ui/dropdown";
import Input from "@/ui/input";
import ToggleLabeled from "@/ui/toggleLabeled";
import ToggleSwitch from "@/ui/toggleSwitch";
import VisualArray from "@/ui/visualArray";
import { useCallback, useRef, useState } from "react";
import { BiPlus, BiUser } from "react-icons/bi";
import ButtonWithWindow from "../buttonWithWindow"
import useNotificationsStore from "@/hooks/notificationsStore";

interface Collectables {
    viewBlocks: string[]
    connectBlocks: string[]
    disconnectBlocks: string[]
    pinBlock: string[]
    changeDefaultRole: string[]
    changeDescription: string[]
    pinRoles: string[]
    editors: string[]
    extends: string[]
    changeRoles: string[]
    live: string[]
}

export default function CreateRoleItem(){
    const [isLoading, setIsLoading] = useState(false)
    const nameRef = useRef<HTMLInputElement>(null!)
    const pushNotification = useNotificationsStore(store => store.push)
    const [canSetLabels, setCanSetLabels] = useState(false)
    const [collectables, setCollectables] = useState<Collectables>({
        viewBlocks: [],
        connectBlocks: [],
        disconnectBlocks: [],
        pinBlock: [],
        changeDefaultRole: [],
        changeDescription: [],
        pinRoles: [],
        editors: [],
        extends: [],
        changeRoles: [],
        live: []
    })

    const collectableControls = useCallback((type: keyof Collectables) => {
        function onAdded(item: string){
            if (collectables[type].includes(item)){

            } else {
                setCollectables(collectables => ({...collectables, [type]: [
                    ...collectables[type], item
                ]}))
            }
        }

        function onRemoved(id: number){
            setCollectables(collectables => {
                let items = [...collectables[type]]
                items.splice(id, 1)
                return {
                    ...collectables,
                    [type]: items
                }
            })
            collectables[type].splice(id, 1)
        }

        return {onAdded, onRemoved}
        
    }, [setCollectables, collectables])

    const onSubmit = useCallback(async () => {
        setIsLoading(true)
        const result = await api.createRole({
            editors: collectables.editors,
            extends: collectables.extends,
            name: nameRef.current.value,
            permissions: {
                change_default_role: collectables.changeDefaultRole,
                change_description: collectables.changeDescription,
                change_roles: collectables.changeRoles,
                connect_blocks: collectables.connectBlocks,
                disconnect_blocks: collectables.disconnectBlocks,
                live: collectables.live,
                pin_block: collectables.pinBlock,
                pin_roles: collectables.pinRoles,
                set_labels: canSetLabels,
                view_blocks: collectables.viewBlocks
            }
        })

        if (result.is == 'Ok'){
            pushNotification(result.data, 'success')
        } else {
            pushNotification(JSON.stringify(result.data), 'error')
        }
        setIsLoading(false)
    }, [nameRef, collectables, canSetLabels, pushNotification])

    return (
        <ButtonWithWindow icon={<BiUser className="scale-[1.35]"/>} text='Create role'>
            <div className="w-[30rem] gap-block flex flex-col">
                <Input ref={nameRef} className="bg-[#eeeeee] w-[100%]" placeholder="Name?"/>
                <ColumnScroller className="h-[30rem]">
                <div className="gap-block flex flex-col">
                    <div className="text-[1.4rem] font-medium text-center">Permissions</div>
                    <VisualArray placeholder='Add label...' text="View blocks?" items={collectables.viewBlocks} {...collectableControls('viewBlocks')}/>
                    <VisualArray placeholder='Add label...' text="Go live?" items={collectables.live} {...collectableControls('live')}/>
                    <VisualArray placeholder='Add label...' text="Connect blocks?" items={collectables.connectBlocks} {...collectableControls('connectBlocks')}/>
                    <VisualArray placeholder='Add label...' text="Disconnect blocks?" items={collectables.disconnectBlocks} {...collectableControls('disconnectBlocks')}/>
                    <VisualArray placeholder='Add label...' text="Pin block?" items={collectables.viewBlocks} {...collectableControls('pinBlock')}/>
                    <VisualArray placeholder='Add label...' text="Change default role?" items={collectables.connectBlocks} {...collectableControls('changeDefaultRole')}/>
                    <VisualArray placeholder='Add label...' text="Pin roles?" items={collectables.disconnectBlocks} {...collectableControls('pinRoles')}/>
                    <ToggleLabeled isOn={canSetLabels} onSwitch={() => setCanSetLabels(!canSetLabels)}/>

                    <div className="text-[1.4rem] font-medium text-center">General</div>
                    <VisualArray placeholder='Add username...' text="Who can edit this role?" items={collectables.editors} {...collectableControls('editors')}/>
                    <VisualArray placeholder='Add role id...' text="Roles to extend?" items={collectables.extends} {...collectableControls('extends')}/>
                    
                    
                </div>
                </ColumnScroller>
                <Button disabled={isLoading} onClick={onSubmit}>{isLoading ? 'Loading...' : 'Create'}</Button>
            </div>
        </ButtonWithWindow>
    )
}