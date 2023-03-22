import api, { Channel } from '@/core/api'
import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface State {
    channels: Map<string, Channel>
    get: (id: string) => Channel | undefined
    enter: (id: string, channel: Channel) => void
}

const useChannelsStore = create<State>()(immer((set, get) => ({
    channels: new Map(),

    get: (id: string) => {
        let state: State = get()
        let channel = state.channels.get(id)
        if (channel) {
            return channel
        } else {
            api.getChannel(id).then(result => {
                if (result.type == 'success'){
                    set((state: State) => {
                        state.channels.set(id, result.data)
                    })
                }
            })
        }
    },

    enter: (id, channel) => {
        let state: State = get()
        state.channels.set(id, channel)
    }
})))

export default useChannelsStore