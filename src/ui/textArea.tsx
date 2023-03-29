import clsx from "clsx"
import { forwardRef } from "react"

interface Props extends React.ComponentPropsWithRef<'textarea'> {}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(({className, ...props}, ref) => {
    return (
        <textarea
            ref={ref}
            className={clsx("block-window border-dashed bordered-window outline outline-[0] outline-[#d8d7d73b] focus:outline-[5px] transition-all", className)}
            {...props}
        />
    )
})

export default TextArea