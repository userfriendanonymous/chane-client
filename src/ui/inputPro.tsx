import { forwardRef } from 'react'
import Input from './input'
import clsx from 'clsx'
import { BiSend } from 'react-icons/bi'

interface Props extends React.ComponentPropsWithRef<'input'> {
    icon: React.ReactNode
    onSubmitted: (event: React.MouseEvent) => void
}

const InputPro = forwardRef<HTMLInputElement, Props>(({className, onSubmitted, icon, ...props}, ref) => {
    return (
        <div className='h-[2.5rem] flex items-center'>
            <input ref={ref} {...props} className={clsx('bg-[#f0f0f0] p-sub rounded-l-sub h-[100%] flex-grow box-border', className)}/>
            <div onClick={onSubmitted} className='rounded-r-sub flex items-center h-[100%] w-[2.3rem] justify-center border-[1px] box-border border-[#dcdcdc] cursor-pointer'>
                {icon}
            </div>
        </div>
    )
})

export default InputPro