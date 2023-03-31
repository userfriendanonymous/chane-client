import { useEffect } from 'react';
import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {ReactNode} from 'react'
import useGlobalState from './globalState'
import GlobalState from '@/core/globalState'

type Windows = Map<string, IPopupWindow>

interface State {
    windows: Windows
    id: number
}

const globalState = new GlobalState<State>({
    windows: new Map(),
    id: 0
})

export interface IPopupWindow {
    element: ReactNode
}

export default function usePopupWindowsStore(): [Windows, (key: string, item: IPopupWindow) => void] {
    let [state, changeState, setState] = useGlobalState(globalState)

    // useEffect(() => {
    //     changeState(state => {
    //         state.windows.clear()
    //         state.id = 0
    //     })
    // }, [state.id])
    
    const set = (key: string, item: IPopupWindow) => {
        changeState(state => {
            state.windows.set(key, item)
            state.id++
        })
    }

    return [state.windows, set]
}

// const usePopupWindowsStore = create<State>()(immer((set, get) => ({
//     windows: new Map(),
//     id: 0,

//     push: (item: IPopupWindow) => {
//         let id = get().id
//         set(state => {
//             state.windows.set(id, item)
//             console.log(id)
//             state.id++
//         })
//         return id
//     },

//     remove: (id: number) => {
//         set(state => {
//             console.log(state.windows.delete(id), id)
//             if (state.windows.size == 0) {
//                 state.id = 0
//             }
//         })
//     }
// })))

// export default usePopupWindowsStore