import api, { Result, User } from "@/core/api"
import Button from "@/ui/button"
import Page from "@/widgets/page"
import { GetServerSideProps } from "next"
import { AppContext } from "next/app"
import { useRouter } from "next/router"
import { BiChat, BiFlag } from "react-icons/bi"
import ChannelWidget from '@/widgets/channel'
import { RowScroller } from "@/ui/scroller"

interface Props {
    result: Result<User, string>
}

export default function({result}: Props){
    return (
        <Page>
        {
            result.type == 'error' ?
            <div className="flex-col widget-window bordered-window h-[100%] flex-grow">
                <div className="widget-window bordered-window w-full h-fit justify-between">
                    <div className="flex gap-[1.5rem] items-center">
                        <div className="w-[5.5rem] h-[5.5rem] overflow-clip rounded-block">
                            <img
                                className="w-[100%] h-[100%] object-contain"
                                src='data:image/jpeg;base64,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'
                            />
                        </div>

                        <div>
                            <div className="text-[1.8rem] font-medium">CoolUsername123</div>
                            <div className="text-[1.2rem]">Joined 2 years ago</div>
                        </div>
                    </div>

                    <div className="w-[10rem] gap-block flex flex-col">
                        <Button>Chat <BiChat/></Button>
                        <Button>Report <BiFlag/></Button>
                    </div>
                </div>

                <div className="widget-window flex-col bordered-window w-full h-fit justify-between">
                    <div className='text-[1.4rem] font-medium text-center'>About me</div>
                    <div className="text-[1.1rem] block-window bg-[#f3f3f3]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </div>
                </div>

                <div className="widget-window flex-col bordered-window w-full h-fit justify-between">
                    <div className='text-[1.4rem] font-medium text-center'>Recently connected channels</div>
                    <div className="w-[100%]">
                    <RowScroller className="">
                        <div className="gap-block flex">
                        <ChannelWidget data={undefined}/>
                        <ChannelWidget data={undefined}/>
                        <ChannelWidget data={undefined}/>
                        <ChannelWidget data={undefined}/>
                        </div>
                    </RowScroller>
                    </div>
                </div>
            </div>
            :null

        }
        </Page>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    if (typeof context.query.name == 'string'){
        const result = await api.getUser(context.query.name)
        return {
            props: {
                result
            }
        }
    }
    return {
        props: {
            result: {type: 'error', data: 'Invalid query'}
        }
    }
}