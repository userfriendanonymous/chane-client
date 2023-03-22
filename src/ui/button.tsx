interface Props extends React.ComponentPropsWithoutRef<'button'> {
    width?: string
}

export default function Button({width, ...props}: Props){
    return (
        <button className={`transition-all bg-[#ff5500] disabled:bg-[#ff8d7e] cursor-pointer items-center justify-center sub-window text-white h-[2.5rem] text-[1.1rem] font-medium box-border`}
        style={{
            width: width ? width : '100%',
        }}
            {...props}
        />
    )
}