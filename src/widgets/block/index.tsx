interface Props {
    data: {content: string} | undefined
}

export default function Block({data}: Props){
    return (
        <div className="rounded-block p-block flex flex-col bg-[#D9D9D9]">
        {
            data ?
            <>
                <div className="text-sSub">
                    Mich / 12:51
                </div>
                <div className="text-sBlock">
                    {data.content}
                </div>
            </>

            :
            <div>Loading...</div>
        }
        </div>
    )
}