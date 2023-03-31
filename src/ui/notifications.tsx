import useNotificationsStore from "@/hooks/notificationsStore"
import Item from "./notification"

export default function Notifications(){
    let data = useNotificationsStore(store => store.notifications)
    let elements: React.ReactNode[] = []
    data.forEach((item, key) => elements.push(
        <Item content={item.content} type={item.type} key={key}/>
    ))

    return (
        <div className="absolute bottom-[2rem] right-[2rem] z-[10000]">
            {elements}
        </div>
    )
}