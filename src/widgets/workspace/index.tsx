import useLiveChannel from '@/hooks/liveChannel'
import MainFeed from './mainFeed'
import SideFeed from './sideFeed'
import {Block} from '@/core/api'
import { useEffect, useState } from 'react'

interface ChannelState {
    blocks: Array<string>,
    description: string,
    labels: Array<string>,
    roles: Array<{name: string, role: string}>,
}


export default function Workspace(){
    return (
        <div className="widget-window flex-grow bg-[#F4F4F4]">
            <MainFeed/>
            <SideFeed/>
        </div>
    )
}