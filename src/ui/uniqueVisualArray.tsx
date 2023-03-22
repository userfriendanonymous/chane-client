import VisualArray from "./visualArray"

interface Props {
    setItems: (f: ((array: string[]) => string[])) => any
    items: string[]
    placeholder: string
    text: string
}

export default function UniqueVisualArray({setItems: setArray, items: array, placeholder, text}: Props){
    function onAdded(item: string){
        if (array.includes(item)){

        } else {
            setArray(items => [...items, item])
        }
    }

    function onRemoved(id: number){
        setArray(items => {
            let copy = [...items]
            copy.splice(id, 1)
            return copy
        })
    }

    return (
        <VisualArray text={text} placeholder={placeholder} items={array} onAdded={onAdded} onRemoved={onRemoved}/>
    )
}