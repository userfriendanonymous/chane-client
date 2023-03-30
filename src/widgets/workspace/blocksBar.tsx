import useBlocksStore from "@/hooks/blocksStore"
import { ColumnScroller } from "@/ui/scroller"
import Block from "@/widgets/block"
import { useCallback } from "react"

interface Props {
    blocks: Set<string>
}

export default function BlocksBar({blocks}: Props){
    const blocksStore = useBlocksStore()

    console.log(blocksStore.blocks)
    let blocksNodes: React.ReactNode[] = []
    blocks.forEach(id => {
        blocksNodes.push(<Block key={id} state={blocksStore.get(id)}/>)
    })

    return (
        <div className="flex-grow overflow-clip rounded-widget">
            <ColumnScroller className="h-[100%] block-window bordered-window">
                <div className="block-window flex-col">
                    {blocksNodes}
                </div>
            </ColumnScroller>
        </div>
    )
}