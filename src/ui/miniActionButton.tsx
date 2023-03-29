interface Props extends React.ComponentPropsWithoutRef<'div'> {}

export default function MiniActionButton({...props}: Props){
    return (
        <div className='bordered-window rounded-full flex items-center justify-center w-[1.7rem] h-[1.7rem]'
            {...props}
        >

        </div>
    )
}