import api from '@/core/api'
import {Block} from '@/core/bindings'
import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface State {
    blocks: Map<string, BlockState>
    get: (id: string) => BlockState
    enter: (id: string, block: Block) => void
}

export type BlockState = {is: 'ok', data: Block} | {is: 'loading'} | {is: 'error'}

const useBlocksStore = create<State>()(immer((set, get) => ({
    blocks: new Map(),

    get: (id: string) => {
        let state: State = get()
        let blockState = state.blocks.get(id)
        if (blockState) {
            return blockState
        } else {
            set(state => {
                state.blocks.set(id, {is: 'loading'})
            })
            api.getBlock(id).then(result => {
                if (result.is == 'Ok'){
                    set((state) => {
                        state.blocks.set(id, {is: 'ok', data: result.data})
                    })
                } else {
                    set((state) => {
                        state.blocks.set(id, {is: 'error'})
                    })
                }
            })
            return {is: 'loading'}
        }
    },

    enter: (id, block) => {
        let state: State = get()
        state.blocks.set(id, {is: 'ok', data: block})
    }
})))

export default useBlocksStore