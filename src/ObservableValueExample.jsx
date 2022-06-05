import {useEffect, useMemo, useState} from 'react'
import {ObservableValue} from "./package/simple-mobx/ObservableValue";
import {autorun} from "./package/simple-mobx";

 function ObservableValueExample() {
    const observableHelloWold = useMemo(() => new ObservableValue("hello world"), [])
    const [value, setValue] = useState(() => observableHelloWold.get())

    useEffect(() => {
        autorun(() => setValue(observableHelloWold.get()))
    }, [])

    return <div>
        <input type="text" value={value} onChange={event => observableHelloWold.set(event.target.value)}/>
        <div>{value}</div>
    </div>
}

export default ObservableValueExample
