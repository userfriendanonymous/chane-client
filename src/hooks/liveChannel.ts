import { useCallback, useEffect, useState } from "react"

type LiveMesssage = {
    topic: 'block_connected',
    data: {id: string}
} | {
    topic: 'block_disconnected',
    data: {id: string}
} | {
    topic: 'labels_changed'
} | {
    topic: 'description_changed'
} | {
    topic: 'block_pinned',
    data: {id?: string}
} | {
    topic: 'block_changed',
    data: {id: string}
}

export default function useLiveChannel(onMessage: (message: LiveMesssage) => void){
    const [liveChannelWs, setLiveChannelWs] = useState<WebSocket | undefined>()
    useEffect(() => {
        if (!liveChannelWs){
            const ws = new WebSocket('ws://localhost:5000/api/live')
            ws.onmessage = (event) => {
                onMessage(event.data)
            }
            setLiveChannelWs(ws)

            let interval = setInterval(() => {
                if (ws.OPEN == ws.readyState) {
                    ws.send('')
                } else {
                    clearInterval(interval)
                }
            }, 1000)
        }

        return () => {
            liveChannelWs?.close()
        }
    }, [onMessage])
}