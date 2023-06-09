import useLiveChannel from '@/hooks/liveChannel'
import SideFeed from './sideFeed'
import MainFeed from './mainField'
import { useCallback, useEffect, useRef, useState } from 'react'
import useApiStore from '@/hooks/apiStore'
import useNotificationsStore from '@/hooks/notificationsStore'
import {Block, LiveMessage} from '@/core/bindings'
import {useImmer} from 'use-immer'

interface ChannelState {
    blocks: Array<string>,
    description: string,
    labels: Array<string>,
    roles: Array<{name: string, role: string}>,
}

export type FeedState = {is: 'loading', id: string}
| {is: 'open', id: string, blocks: Set<string>}
| {is: 'closed'}

export type OnOpen = (id: string, live: boolean) => void

export default function Workspace(){
    const [feedState, setFeedState] = useState<FeedState>({is: 'closed'})
    const callRef = useRef(false)
    const api = useApiStore()
    const pushNotification = useNotificationsStore(store => store.push)

    const onLiveMessage = useCallback((message: LiveMessage) => {
        setFeedState(oldState => {
            let state = {...oldState}
            if (state.is != 'open') return state
            if (message.is == 'BlockConnected')
                state.blocks.add(message.data.id)

            else if (message.is == 'BlockDisconnected')
                state.blocks.delete(message.data.id)
    
            return state
        })
    }, [])
    const [liveChannelState, connectLiveChannel, disconnectLiveChannel] = useLiveChannel(onLiveMessage)
    
    const onOpen: OnOpen = useCallback(async (id: string, live: boolean) => {
        setFeedState({is: 'loading', id})

        const result = await api.getChannelBlocks(id, {limit: null, offset: null})

        if (result.is == 'Ok'){
            let blockIds = new Set<string>()
            result.data.forEach(block => {
                blockIds.add(block.id)
            })

            setFeedState(oldState => {
                let state = {...oldState}
                if (state.is == 'loading' && id == state.id){
                    state = {is: 'open', blocks: blockIds, id}
                    if (live) connectLiveChannel(id)
                } else
                    alert(JSON.stringify(state))

                return state
            })
        } else {
            alert(JSON.stringify(result))
        }
    }, [setFeedState, feedState, connectLiveChannel, callRef, setFeedState])

    const onBlockSend = useCallback(async (content: string) => {
        if (feedState.is != 'open') return
        const response = await api.createBlock({content})
        console.log(response)
        if (response.is == 'Ok'){
            let result = await api.connectBlockToChannel({id: feedState.id, block_id: response.data})
            console.log(result)
        }
    }, [feedState])

    return (
        <div className="widget-window flex-grow bordered-window">
            <MainFeed feedState={feedState} liveChannelState={liveChannelState} onOpen={onOpen} onSend={onBlockSend}/>
            <SideFeed/>
        </div>
    )
}