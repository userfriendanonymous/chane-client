import api from '@/core/api'
import { Block, Channel, LiveMessage, Role } from '@/core/bindings'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

class Live<M> {
    private listeners: Set<(messsage: M) => void> = new Set()
    constructor(gen: (call: (message: M) => void) => void){
        gen((message) => {
            this.listeners.forEach(fn => {
                fn(message)
            })
            this.listeners.clear()
        })
    }

    listen(fn: (message: M) => void){
        this.listeners.add(fn)
    }
}

type LiveChannel = Live<LiveMessage>

interface State {
    blocks: Map<string, BlockState>
    channels: Map<string, ChannelState>
    roles: Map<string, RoleState>
    liveChannels: Map<string, LiveChannelState>
    getBlock(...p: Parameters<typeof api.getBlock>): BlockState
    getRole(...p: Parameters<typeof api.getRole>): RoleState
    getChannel(...p: Parameters<typeof api.getChannel>): ChannelState
    getLiveChannel(id: string): LiveChannelState

    connectBlockToChannel: typeof api.connectBlockToChannel
    getChannelBlocks: typeof api.getChannelBlocks
    createBlock: typeof api.createBlock
}

type ResourceState<T> = {is: 'ok', data: T} | {is: 'loading'} | {is: 'error'}
export type BlockState = ResourceState<Block>
export type ChannelState = ResourceState<Channel>
export type RoleState = ResourceState<Role>
export type LiveChannelState = ResourceState<LiveChannel>

const useApiStore = create<State>()(immer((set, get) => ({
    blocks: new Map(),
    channels: new Map(),
    roles: new Map(),
    liveChannels: new Map(),

    getBlock(id: string){
        const state = get().blocks.get(id)
        if (state) return state
        else
            set(state => state.blocks.set(id, {is: 'loading'}))
            api.getBlock(id).then(result => {
                if (result.is == 'Ok')
                    set((state) => state.blocks.set(id, {is: 'ok', data: result.data}))
                else set((state) => state.blocks.set(id, {is: 'error'}))
            })
            return {is: 'loading'}
    },

    getRole(id: string){
        const state = get().roles.get(id)
        if (state) return state
        else
            set(state => state.blocks.set(id, {is: 'loading'}))
            api.getBlock(id).then(result => {
                if (result.is == 'Ok')
                    set(state => state.blocks.set(id, {is: 'ok', data: result.data}))
                else set(state => state.blocks.set(id, {is: 'error'}))
            })
            return {is: 'loading'}
    },

    getChannel(id: string){
        const state = get().channels.get(id)
        if (state) return state
        else
            set(state => state.blocks.set(id, {is: 'loading'}))
            api.getChannel(id).then(result => {
                if (result.is == 'Ok')
                    set(state => state.channels.set(id, {is: 'ok', data: result.data}))
                else set(state => state.channels.set(id, {is: 'error'}))
            })
            return {is: 'loading'}
    },

    async getChannelBlocks(...params){
        const result = await api.getChannelBlocks(...params)
        set(state => {
            if (result.is == 'Ok')
                result.data.forEach(block => {
                    state.blocks.set(block.id, {is: 'ok', data: block})
                })
        })
        return result
    },

    async createBlock(...params){
        return await api.createBlock(...params)
    },

    async connectBlockToChannel(...params){
        const result = await api.connectBlockToChannel(...params)

        return result
    },

    getLiveChannel(id){
        const state = get().liveChannels.get(id)
        if (state) return state
        else {
            api.getLiveChannel(
                id,
                () => set(state => state.liveChannels.set(id, {is: 'error'}))
            ).then(channel => set(state => state.liveChannels.set(id, {is: 'ok', data: channel})))
            return {is: 'loading'}
        }
    }
})))

export default useApiStore