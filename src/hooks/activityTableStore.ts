import api from '@/core/api'
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import localStorageSync from '@/core/localStorageSync'
import {Activity} from '@/core/bindings'

interface Store {
    activities: Activity[]
    check: () => void
}


const useActivityTableStore = create<Store>()(immer((set, get) => ({
    activities: [],
    check: () => {
        
    },

    push: () => {
        
    }
})))