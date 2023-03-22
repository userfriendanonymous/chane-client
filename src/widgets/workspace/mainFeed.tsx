import ToolBar from "./toolBar"
import SendBar from "./sendBar"
import BlocksBar from "./blocksBar"
import useLiveChannel from "@/hooks/liveChannel"
import { useCallback, useEffect, useState } from "react"
import { useQuery } from "react-query"
import api, { Block } from "@/core/api"
import useBlocksStore from "@/hooks/blocksStore"

interface Props {
    channelId: string
}

export default function MainFeed({channelId}: Props){
    const [blocks, setBlocks] = useState<Set<string>>(new Set())
    const [isPreloaded, setIsPreloaded] = useState(false)
    const enterBlocksStore = useBlocksStore(state => state.enter)

    useEffect(() => {
        api.getChannelBlocks(channelId).then(result => {
            if (result.type == 'success') {
                let blockIds: Set<string> = new Set()
                result.data.forEach(block => {
                    blockIds.add(block.id)
                    enterBlocksStore(block.id, block)
                })
                setBlocks(blockIds)
            }
        })
    }, [])

    useLiveChannel(message => {
        if (message.topic == 'block_connected'){
            setBlocks(blocks => {
                let blocksClone = new Set(blocks)
                blocksClone.add(message.data.id)
                return blocksClone
            })
        } else if (message.topic == 'block_disconnected'){
            setBlocks(blocks => {
                let blocksClone = new Set(blocks)
                blocksClone.delete(message.data.id)
                return blocksClone
            })
        }
    })

    const onBlockSend = useCallback(async (content: string) => {
        const response = await api.createBlock(content)
        if (response.type == 'success'){
            const result = await api.connectBlockToChannel(channelId, response.data)
            if (result.type == 'success'){

            } else {

            }
        }
    }, [])
    
    return (
        <div className='flex flex-grow flex-col gap-widget'>
            <ToolBar/>
            <BlocksBar blocks={blocks}/>
            <SendBar onSend={onBlockSend}/>
        </div>
    )
}