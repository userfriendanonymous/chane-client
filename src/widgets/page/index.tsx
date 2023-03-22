import api from "@/core/api"
import useAuthStore from "@/hooks/authStore"
import Notifications from "@/widgets/notifications"
import SidePanel from "@/widgets/sidePanel"
import { useEffect } from "react"
import PageWrapper from "./wrapper"

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
            {children}
        </PageWrapper>
    )
}