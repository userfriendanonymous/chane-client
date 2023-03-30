import styles from '@/styles/scroller.module.css'
import clsx from 'clsx'

interface Props extends React.ComponentPropsWithoutRef<'div'> {}

export function ColumnScroller({className, children, ...props}: Props){
    return (
        <div {...props} className={clsx('relative', className)}>
            <div className={clsx(styles.scrollbar, 'pr-[0.6rem] overflow-y-scroll absolute top-0 bottom-0 left-0 right-0')}>
                {children}
            </div>
        </div>
    )
}

export function RowScroller({className, children, ...props}: Props){
    return (
        <div {...props} className={clsx('relative', className)}>
            <div className={clsx(styles.scrollbar, 'pb-[0.6rem] overflow-x-scroll absolute top-0 bottom-0 left-0 right-0')}>
                {children}
            </div>
        </div>
    )
}