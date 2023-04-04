import { useReducer, useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { ReactNode } from 'react'
import usePopupWindowsStore from "./popupWindowsStore"

type InstanceFn = (id: number) => ReactNode

export default function usePopupWindowsManager(): {spawn: () => number, remove: (id: number) => void, instance: (fn: InstanceFn) => any} {
    const store = usePopupWindowsStore(store => ({set: store.set, use: store.use, remove: store.remove}))
    const [windows, setWindows] = useState<Set<number>>(new Set())
    const [windowFn, setWindowFn] = useState<InstanceFn>(() => null)

    const spawn = useCallback(() => {
        let id = store.use()
        console.log('spawn: ' + id)
        let newWindows = new Set(windows)
        newWindows.add(id)
        setWindows(newWindows)
        return id
    }, [store.use, windows])

    const remove = useCallback((id: number) => {
        store.remove(id)
        let newWindows = new Set(windows)
        newWindows.delete(id)
        setWindows(newWindows)
    }, [store.remove, windows])
    
    useEffect(() => {
        windows.forEach(id => {
            store.set(id, windowFn(id))
        })
    }, [windowFn, windows])

    return {spawn, remove, instance: (fn: InstanceFn) => {
        if (windowFn != fn)
            setWindowFn(() => fn)
    }}
}