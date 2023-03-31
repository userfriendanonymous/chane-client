import GlobalState from "../core/globalState"
import {useState, useEffect, useCallback} from 'react'

type SetStateCall<S, T> = (draft: S) => T

export default function useGlobalState<StateType>(state: GlobalState<StateType>): [StateType, <T>(call: SetStateCall<StateType, T>) => T, (state: StateType) => void] {
    const [, rerender] = useState()

    useEffect(() => {
        state.use(rerender)

        return (() => {
            state.unuse(rerender)
        })
    }, [])

    function change<T>(call: SetStateCall<StateType, T>): T {
        let value = {...state.value}
        let result = call(value)
        state.set(value)
        return result
    }

    function set(value: StateType) {
        state.set(value)
    }

    return [state.value, change, set]
}