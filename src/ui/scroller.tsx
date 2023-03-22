import styles from '@/styles/scroller.module.css'
import clsx from 'clsx'

interface Props extends React.ComponentPropsWithoutRef<'div'> {}

export function ColumnScroller({className, ...props}: Props){
    return (
        <div {...props} className={clsx(styles.scrollbar, 'pr-[0.6rem] overflow-y-scroll', className)}/>
    )
}

export function RowScroller({className, ...props}: Props){
    return (
        <div {...props} className={clsx(styles.scrollbar, 'pb-[0.6rem] overflow-x-scroll', className)}/>
    )
}