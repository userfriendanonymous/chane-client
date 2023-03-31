import api from "@/core/api"
import useAuthStore from "@/hooks/authStore"
import Notifications from "@/ui/notifications"
import PopupWindows from "@/ui/popupWindows"
import SidePanel from "@/widgets/sidePanel"
import { useEffect } from "react"
import Activities from "../activities"
import PageWrapper from "./wrapper"
import {enableMapSet} from 'immer'
enableMapSet()

interface Props {
    children: React.ReactNode
}

export default function Page({children}: Props){
    let authStore = useAuthStore(store => ({isChecked: store.isChecked, check: store.check}))
    useEffect(() => {
        authStore.check()
    }, [])

    return (
        <PageWrapper>
            <SidePanel/>
            <Notifications/>
            <PopupWindows/>
            {children}
            <Activities/>
        </PageWrapper>
    )
}