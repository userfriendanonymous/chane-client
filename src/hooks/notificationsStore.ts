import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface Notification {
    content: React.ReactNode
    type: 'error' | 'success' | 'warning'
}

interface State {
    notifications: Map<number, Notification>
    id: number
    push: (item: Notification) => void
}

const useNotificationsStore = create<State>()(immer((set, get) => ({
    notifications: new Map(),
    id: 0,

    push: (item: Notification) => {
        let id: number
        set(state => {
            id = state.id
            state.notifications.set(id, item)
            state.id++
        })

        setTimeout(() => set(state => {
            state.notifications.delete(id)
            console.log(state.notifications, id)
            if (state.notifications.size == 0){
                state.id = 0
            }
        }), 2500)
}
})))

export default useNotificationsStore