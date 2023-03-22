export interface Props extends React.ComponentPropsWithoutRef<'div'> {
    icon: React.ReactNode,
    text: string,
    children?: React.ReactNode,
}

export default function Button({icon, text, children, ...props}: Props){
    return (
        <div className="relative">
            <div className='cursor-pointer sub-window bg-[#f0f0f0] h-[3rem] items-center overflow-x-clip relative' {...props}>
                <div className="absolute w-[1000px] flex items-center gap-[0.53rem]">
                    <div className="w-[2rem] h-[2rem] flex items-center justify-center rounded-full bg-white">
                        {icon}
                    </div>
                    <div className="text-[1rem] font-semibold">
                        {text}
                    </div>
                </div>
            </div>
            
            {children}
        </div>
    )
}