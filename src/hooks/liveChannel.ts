import api from '@/core/api'
import { useCallback, useState } from "react"
import {LiveMessage} from '@/core/bindings'

export type State = 'open' | 'closed' | 'loading'

export default function useLiveChannel(onMessage: (message: LiveMessage) => void): [State, (id: string) => void, () => void] {
    const [state, setState] = useState<State>('closed')
    const [close, setClose] = useState<() => void | undefined>()
    const connect = useCallback((id: string) => {
        setState('loading')
        let closeFn = api.live(
            id,
            (message) => {
                onMessage(message)
            },
            () => {
                setState(state => {
                    if (state != 'loading'){return state}
                    return 'open'
                })
            },
            () => {
                setState('loading')
            }
        )
        setClose(() => closeFn) 
    }, [setState, state])

    const disconnect = useCallback(() => {
        if (close){
            close()
        }
    }, [])

    return [state, connect, disconnect]
}