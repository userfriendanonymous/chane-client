import api from '@/core/api'
import {Role} from '@/core/bindings'
import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface State {
    roles: Map<string, RoleState>
    get: (id: string) => RoleState
    enter: (id: string, block: Role) => void
}

export type RoleState = {is: 'ok', data: Role} | {is: 'loading'} | {is: 'error'}

const useRolesStore = create<State>()(immer((set, get) => ({
    roles: new Map(),

    get: (id: string) => {
        let state: State = get()
        let rolesState = state.roles.get(id)
        if (rolesState) {
            return rolesState
        } else {
            set(state => {
                state.roles.set(id, {is: 'loading'})
            })
            api.getRole(id).then(result => {
                if (result.is == 'Ok'){
                    set((state) => {
                        state.roles.set(id, {is: 'ok', data: result.data})
                    })
                } else {
                    set((state) => {
                        state.roles.set(id, {is: 'error'})
                    })
                }
            })
            return {is: 'loading'}
        }
    },

    enter: (id, block) => {
        let state: State = get()
        state.roles.set(id, {is: 'ok', data: block})
    }
})))

export default useRolesStore