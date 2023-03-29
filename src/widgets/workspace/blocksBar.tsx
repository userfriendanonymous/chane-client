import useBlocksStore from "@/hooks/blocksStore"
import Block from "@/widgets/block"
import { useCallback } from "react"

interface Props {
    blocks: Set<string>
}

export default function BlocksBar({blocks}: Props){
    const blocksStore = useBlocksStore()
    const getBlockData = useCallback((id: string) => {
        let data = blocksStore.get(id)
        if (data){
            return {
                content: data.content
            }
        }
    }, [blocksStore])

    let blocksNodes: React.ReactNode[] = []
    blocks.forEach(id => {
        blocksNodes.push(<Block key={id} data={getBlockData(id)}/>)
    })

    return (
        <div className="overflow-y-scroll block-window flex-grow bg-[#EFEFEF] flex-col">
            {blocksNodes}
        </div>
    )
}