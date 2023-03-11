import Head from 'next/head'
import Image from 'next/image'
import Workspace from '@/widgets/workspace'
import SidePanel from '@/widgets/sidePanel'

export default function Home() {
    return (
    <>
        <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <div className='h-[100vh] w-full flex gap-widget p-widget'>
            <SidePanel/>
            <Workspace/>
        </div>
    </>
    )
}
