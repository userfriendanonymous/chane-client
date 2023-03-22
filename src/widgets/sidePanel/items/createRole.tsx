import api from "@/core/api";
import Button from "@/ui/button";
import {ColumnScroller} from "@/ui/scroller";
import DropDown from "@/ui/dropdown";
import Input from "@/ui/input";
import ToggleLabeled from "@/ui/toggleLabeled";
import ToggleSwitch from "@/ui/toggleSwitch";
import VisualArray from "@/ui/visualArray";
import { useCallback, useState } from "react";
import { BiPlus, BiUser } from "react-icons/bi";
import ButtonWithWindow from "../buttonWithWindow"

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
}

export default function CreateRoleItem(){
    const [isLoading, setIsLoading] = useState(false)
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
        extends: []
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

    const onSubmit = useCallback(() => {
        api
        setIsLoading(true)
    }, [])

    return (
        <ButtonWithWindow icon={<BiUser className="scale-[1.35]"/>} text='Create role'>
            <Input className="bg-[#eeeeee]" placeholder="Name?"/>
            <ColumnScroller className="h-[30rem]">
            <div className="gap-block flex flex-col w-[30rem]">
                <div className="text-[1.4rem] font-medium text-center">Permissions</div>
                <VisualArray placeholder='Add label...' text="View blocks?" items={collectables.viewBlocks} {...collectableControls('viewBlocks')}/>
                <VisualArray placeholder='Add label...' text="Connect blocks?" items={collectables.connectBlocks} {...collectableControls('connectBlocks')}/>
                <VisualArray placeholder='Add label...' text="Disconnect blocks?" items={collectables.disconnectBlocks} {...collectableControls('disconnectBlocks')}/>
                <ToggleLabeled isOn={canSetLabels} onSwitch={() => setCanSetLabels(!canSetLabels)}/>

                <div className="text-[1.4rem] font-medium text-center">General</div>
                <VisualArray placeholder='Add username...' text="Who can edit this role?" items={collectables.editors} {...collectableControls('editors')}/>
                <VisualArray placeholder='Add role id...' text="Roles to extend?" items={collectables.extends} {...collectableControls('extends')}/>
                
                
            </div>
            </ColumnScroller>
            <Button disabled={isLoading} onClick={onSubmit}>{isLoading ? 'Loading...' : 'Create'}</Button>
        </ButtonWithWindow>
    )
}