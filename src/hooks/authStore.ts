import api from '@/core/api'
import { WritableDraft } from 'immer/dist/internal'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import Cookie from 'js-cookie'
import {AuthMe} from '@/core/bindings'

interface AuthStore {
    state: AuthMe
    invalidate: () => void
    validate: (name: string) => void
    isChecked: boolean
    check: () => void
    setState: (state: WritableDraft<AuthStore>, newState: AuthMe, noReset?: boolean) => void
}

const useAuthStore = create<AuthStore>()(immer((set, get) => ({
    state: {is: 'Invalid'},
    isChecked: false,

    invalidate: () => {
        set(state => {
            state.setState(state, {is: 'Invalid'})
        })
    },

    setState: (state: AuthStore, newState, noReset) => {
        state.state = newState

        if (!noReset){
            try {
                localStorage.setItem('auth-info', JSON.stringify(newState))
            } catch(error){}
        }

        if (newState.is == 'Invalid'){
            Cookie.remove('key-token', { path: '/api/auth', expires: 0 })
        }
    },

    validate: (name) => set(state => {
        state.setState(state, {
            is: 'Valid',
            data: {name}
        })
    }),

    check: () => {
        let state = get()
        if (!state.isChecked){
            set(state => {
                state.isChecked = true
            })

            let auth: AuthMe = {is: 'Invalid'}
            let isFound = false
            try {
                auth = JSON.parse(localStorage.getItem('auth-info') ?? '')
                isFound = true
            } catch(error){
                console.error(error)
            }

            console.log(auth)

            if (isFound){
                set(state => {
                    state.setState(state, auth)
                })
                return
            }

            api.getMyAuth().then(result => {
                set(state => {
                    state.setState(state, result)
                })
            })
        }
    }
})))

export default useAuthStore