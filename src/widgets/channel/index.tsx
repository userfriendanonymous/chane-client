import { Channel as IChannel } from "@/core/api"


interface Props {
    data: undefined | IChannel
}

export default function Channel({data}: Props){
    return (
        !data ? // to fix this lol
        <div className="w-[13rem] flex-col block-window border-[1px] border-[#e8e8e8]">
            <div className='h-[8rem] rounded-block overflow-clip'>
                <img 
                    className="w-full h-[100%] object-contain"
                    src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b12627c3-a10f-4e40-88a0-75650dc1a4d8/dd4wnxx-65e06825-e779-4185-a24c-0e3cc5924a31.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IxMjYyN2MzLWExMGYtNGU0MC04OGEwLTc1NjUwZGMxYTRkOFwvZGQ0d254eC02NWUwNjgyNS1lNzc5LTQxODUtYTI0Yy0wZTNjYzU5MjRhMzEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.HpvIscbMJ7i-0h9RPdQsRnGeoemXHSum-CxL533VSzU'}
                />
            </div>

            <div className="text-[1.1rem] font-medium">
                Cool People Channel!
            </div>
        </div>

        :
        <div>Loading...</div>
    )
}