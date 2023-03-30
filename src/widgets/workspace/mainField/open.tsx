import api from "@/core/api"
import { State as LiveChannelState } from "@/hooks/liveChannel"
import React, { useCallback } from "react"
import BlocksBar from "../blocksBar"
import InputField from "../inputField"
import SendBar from "../sendBar"
import ToolBar from "../toolBar"

interface Props {
    blocks: Set<string>
    liveChannelState: LiveChannelState
    onSend: (content: string) => void
}

export default function Open({blocks, liveChannelState, onSend}: Props){
    return (
        <div className="flex-col flex h-[100%] gap-widget">
            <ToolBar/>
            <BlocksBar blocks={blocks}/>
            {/* {
                liveChannelState == 'open' ?
                <div>Open</div>
                :liveChannelState == 'closed' ?
                <div>Closed</div>
                :
                <div>Loading</div>
            } */}
            
            <SendBar onSend={onSend}/>
        </div>
    )
}