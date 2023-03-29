import api from "@/core/api"
import { State as LiveChannelState } from "@/hooks/liveChannel"
import React, { useCallback } from "react"
import BlocksBar from "../blocksBar"
import InputField from "../inputField"

interface Props {
    blocks: Set<string>
    liveChannelState: LiveChannelState
    onSend: (content: string) => void
}

export default function Open({blocks, liveChannelState, onSend}: Props){
    return (
        <div>
            <BlocksBar blocks={blocks}/>
            {
                liveChannelState == 'open' ?
                <div>Open</div>
                :liveChannelState == 'closed' ?
                <div>Closed</div>
                :
                <div>Loading</div>
            }
            <InputField onSend={onSend}/>
        </div>
    )
}