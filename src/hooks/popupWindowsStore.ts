import { useEffect } from 'react';
import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {ReactNode} from 'react'
type Windows = Map<number, ReactNode>

interface State {
    windows: Windows
    windowsCount: number
    id: number
    use: () => number
    remove: (id: number) => void
    set: (id: number, element: ReactNode) => void
}

export interface IPopupWindow {
    element: ReactNode | undefined
}

const usePopupWindowsStore = create<State>()(immer((set, get) => ({
    windows: new Map(),
    id: 0,
    windowsCount: 0,

    use: () => {
        let id = get().id
        set(state => {
            state.windowsCount++
            state.id++
        })
        return id
    },

    set: (id: number, element: ReactNode) => {
        set(state => {
            state.windows.set(id, element)
        })
    },

    remove: (id: number) => {
        set(state => {
            state.windows.delete(id)
            state.windowsCount--
            if (state.windowsCount == 0) {
                state.id = 0
            }
        })
    }
})))

export default usePopupWindowsStore