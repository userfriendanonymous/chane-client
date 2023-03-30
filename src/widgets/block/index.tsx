import { BlockState } from '@/hooks/blocksStore'
interface Props {
    state: BlockState
}

export default function Block({state}: Props){
    return (
        <div className="rounded-block p-block flex flex-col bg-[#ebebeb]">
        {
            state.is == 'ok' ?
            <>
                <div className="text-sSub">
                    {state.data.owner} / {state.data.id}
                </div>
                <div className="text-sBlock">
                    {state.data.content}
                </div>
            </>

            :
            <div>Loading...</div>
        }
        </div>
    )
}