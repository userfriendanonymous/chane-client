import ToolBar from "./toolBar"
import SendBar from "./sendBar"
import BlocksBar from "./blocksBar"

export default function MainFeed(){
    return (
        <div className='flex flex-grow flex-col gap-widget'>
            <ToolBar/>
            <BlocksBar/>
            <SendBar/>
        </div>
    )
}