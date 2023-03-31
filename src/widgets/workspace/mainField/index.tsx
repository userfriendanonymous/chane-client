import useLiveChannel from "@/hooks/liveChannel"
import { useCallback, useEffect, useState } from "react"
import { useQuery } from "react-query"
import api from "@/core/api"
import {LiveMessage} from '@/core/bindings'
import useBlocksStore from "@/hooks/blocksStore"
import useNotificationsStore from "@/hooks/notificationsStore"
import {FeedState, OnOpen} from '../index'
import {State as LiveChannelState} from '@/hooks/liveChannel'
import Open from "./open"
import Closed from './closed'
import Loading from './loading'

interface Props {
    feedState: FeedState
    liveChannelState: LiveChannelState
    onOpen: OnOpen
    onSend: (content: string) => void
}

export default function MainFeed({feedState, liveChannelState, onOpen, onSend}: Props){
    console.log(feedState)
    return (
        <div className='flex flex-grow flex-col gap-widget'>
            {
                feedState.is == 'open' ?
                <Open blocks={feedState.blocks} liveChannelState={liveChannelState} onSend={onSend}/>
                :feedState.is == 'loading' ?
                <Loading/>
                :
                <Closed onOpen={onOpen}/>
            }
        </div>
    )
}