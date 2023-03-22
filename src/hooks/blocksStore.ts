import api, { Block } from '@/core/api'
import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface State {
    blocks: Map<string, Block>
    get: (id: string) => Block | undefined
    enter: (id: string, block: Block) => void
}

const useBlocksStore = create<State>()(immer((set, get) => ({
    blocks: new Map(),

    get: (id: string) => {
        let state: State = get()
        let block = state.blocks.get(id)
        if (block) {
            return block
        } else {
            api.getBlock(id).then(result => {
                if (result.type == 'success'){
                    set((state: State) => {
                        state.blocks.set(id, result.data)
                    })
                }
            })
        }
    },

    enter: (id, block) => {
        let state: State = get()
        state.blocks.set(id, block)
    }
})))

export default useBlocksStore