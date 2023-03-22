import api from '@/core/api'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

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
    setState: (state: AuthState, noReset?: boolean) => void
}

const useAuthStore = create<AuthStore>()(immer((set, get) => ({
    state: {is: 'invalid'},
    isChecked: false,

    invalidate: () => {
        set(state => {
            state.setState({is: 'invalid'})
        })
    },

    setState: (newState, noReset) => {
        set(state => {
            state.state = newState
        })
    
        if (!noReset){
            try {
                localStorage.setItem('auth-info', JSON.stringify(newState))
            } catch(error){}
        }
    },

    validate: (name) => set(state => {
        state.setState({
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
                    console.log(auth)
                    isFound = true
                } else if (result.is == 'invalid'){
                    isFound = true
                }
            } catch(error){

            }

            if (isFound){
                set(state => {
                    state.setState(auth)
                })
                return
            }

            api.getMyAuth().then(result => {
                if (result.type == 'success'){
                    set(state => {
                        state.setState(result.data)
                    })
                } else {
                }
            })
        }
    }
})))

export default useAuthStore