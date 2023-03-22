import clsx from "clsx"
import { forwardRef } from "react"

interface Props extends React.ComponentPropsWithRef<'input'>{}

export default forwardRef<HTMLInputElement, Props>(({className, ...props}, ref) => {
    return (
        <input ref={ref} className={clsx("bg-[#f0f0f0] items-center justify-center sub-window text-[#000000] h-[2.5rem] box-border")}
            {...props}
        />
    )
})