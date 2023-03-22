import api from '@/core/api'
import { WritableDraft } from 'immer/dist/internal'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import Cookie from 'js-cookie'

export type AuthState = {
    is: 'valid',
    name: string
} | {
    is: 'invalid'
}

interface AuthStore {
    state: AuthState
    invalidate: () => void
    validate: (name: string) => void
    isChecked: boolean
    check: () => void
    setState: (state: WritableDraft<AuthStore>, newState: AuthState, noReset?: boolean) => void
}

const useAuthStore = create<AuthStore>()(immer((set, get) => ({
    state: {is: 'invalid'},
    isChecked: false,

    invalidate: () => {
        set(state => {
            state.setState(state, {is: 'invalid'})
        })
    },

    setState: (state: AuthStore, newState, noReset) => {
        state.state = newState

        if (!noReset){
            try {
                localStorage.setItem('auth-info', JSON.stringify(newState))
            } catch(error){}
        }

        if (newState.is == 'invalid'){
            Cookie.remove('key-token', { path: '/api/auth', expires: 0 })
        }
    },

    validate: (name) => set(state => {
        state.setState(state, {
            is: 'valid',
            name
        })
    }),

    check: () => {
        let state = get()
        if (!state.isChecked){
            set(state => {
                state.isChecked = true
            })

            let auth: AuthState = {is: 'invalid'}
            let isFound = false
            try {
                let result = JSON.parse(localStorage.getItem('auth-info') ?? '')
                if (result.is == 'valid'){
                    auth = {is: 'valid', name: result.name ?? '???'}
                    isFound = true
                } else if (result.is == 'invalid'){
                    isFound = true
                }
            } catch(error){

            }

            if (isFound){
                set(state => {
                    state.setState(state, auth)
                })
                return
            }

            api.getMyAuth().then(result => {
                if (result.type == 'success'){
                    set(state => {
                        state.setState(state, result.data)
                    })
                } else {
                } 
            })
        }
    }
})))

export default useAuthStore