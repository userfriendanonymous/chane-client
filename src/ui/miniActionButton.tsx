interface Props extends React.ComponentPropsWithoutRef<'div'> {}

export default function MiniActionButton({...props}: Props){
    return (
        <div className='bg-[#E9E9E9] rounded-full flex items-center justify-center w-[1.7rem] h-[1.7rem]'
            {...props}
        >

        </div>
    )
}