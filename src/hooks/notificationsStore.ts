import api, { Channel } from '@/core/api'
import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface Notification {
    content: React.ReactNode
    type: 'error' | 'success' | 'warning'
    id: number
}

interface State {
    notifications: Notification[]
    id: number
    push: (content: Notification['content'], type: Notification['type']) => void

}

const useNotificationsStore = create<State>()(immer((set, get) => ({
    notifications: [],
    id: 0,

    push: (content: Notification['content'], type: Notification['type']) => {
        set(state => {
            state.notifications.push({
                content,
                type,
                id: state.id
            })
            if (state.id + 1 < state.notifications.length){
                if (state.id > 0){
                    state.id--
                } else {
                    state.id = state.notifications.length
                }
            } else {
                state.id ++
            }
        })

        setTimeout(() => set(state => {
            const [draft, ...newList] = state.notifications
            state.notifications = newList
            state.id = draft.id
        }), 2500)
}
})))

export default useNotificationsStore