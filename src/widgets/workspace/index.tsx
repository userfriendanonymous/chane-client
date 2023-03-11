import MainFeed from './mainFeed'
import SideFeed from './sideFeed'

export default function Workspace(){
    return (
        <div className="flex flex-grow gap-widget p-widget rounded-section bg-[#F4F4F4]">
            <MainFeed/>
            <SideFeed/>
        </div>
    )
}