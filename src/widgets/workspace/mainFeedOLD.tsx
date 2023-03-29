import ToolBar from "./toolBar"
import SendBar from "./sendBar"
import BlocksBar from "./blocksBar"
import useLiveChannel from "@/hooks/liveChannel"
import { useCallback, useEffect, useState } from "react"
import { useQuery } from "react-query"
import api from "@/core/api"
import {LiveMessage} from '@/core/bindings'
import useBlocksStore from "@/hooks/blocksStore"
import useNotificationsStore from "@/hooks/notificationsStore"

interface Props {
    channelId: string
}

export default function MainFeed({channelId}: Props){
    const [blocks, setBlocks] = useState<Set<string>>(new Set())
    const [isPreloaded, setIsPreloaded] = useState(false)
    const enterBlocksStore = useBlocksStore(state => state.enter)
    const pushNotification = useNotificationsStore(store => store.push)

    const onLiveMessage = useCallback((message: LiveMessage) => {
        if (message.is == 'BlockConnected'){
            let newBlocks = new Set(blocks)
            newBlocks.add(message.data.id)

        } else if (message.is == 'BlockDisconnected'){
            let newBlocks = new Set(blocks)
            newBlocks.delete(message.data.id)
        }
    }, [])
    const [connect, state] = useLiveChannel(onLiveMessage)

    // useLiveChannel(
    //     () => {
    //         api.getChannelBlocks(channelId).then(result => {
    //             if (result.type == 'success') {
    //                 let blockIds: Set<string> = new Set()
    //                 result.data.forEach(block => {
    //                     blockIds.add(block.id)
    //                     enterBlocksStore(block.id, block)
    //                 })
    //                 setBlocks(blockIds)
    //             } else {
    //                 pushNotification('Failed to get initial blocks; you may not have permissions for them or network error', 'error')
    //             }
    //         })
    //     },

    //     () => {
    //         pushNotification('Disconnected from websocket', 'error')
    //         setStatus('out')
    //     },

    //     message => {
    //         if (message.topic == 'block_connected'){
    //             setBlocks(blocks => {
    //                 let blocksClone = new Set(blocks)
    //                 blocksClone.add(message.data.id)
    //                 return blocksClone
    //             })
    //         } else if (message.topic == 'block_disconnected'){
    //             setBlocks(blocks => {
    //                 let blocksClone = new Set(blocks)
    //                 blocksClone.delete(message.data.id)
    //                 return blocksClone
    //             })
    //         }
    //     }
    // )

    const onBlockSend = useCallback(async (content: string) => {
        if (state.is != 'open'){return}
        const response = await api.createBlock({content})
        if (response.is == 'ok'){
            if (response.data.is == 'Ok'){
                api.connectBlockToChannel({id: state.id, block_id: response.data.data})
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