import useNotificationsStore from "@/hooks/notificationsStore"
import Item from "./item"

export default function Notifications(){
    let data = useNotificationsStore(store => store.notifications)

    return (
        <div className="absolute bottom-[2rem] right-[2rem] z-[10000]">
            {data.map(item => (
                <Item content={item.content} type={item.type} key={item.id}/>
            ))}
        </div>
    )
}