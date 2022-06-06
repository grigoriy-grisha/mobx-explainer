import {useEffect, useMemo, useState} from 'react'
import {autorun} from "./package/simple-mobx";
import {observableObject} from "./package/simple-mobx";

function ObservableObjectExample() {
    const observableHelloWold = useMemo(() => observableObject({hello:'hello'}), [])
    const [value, setValue] = useState(() => observableHelloWold.hello)

    useEffect(() => {
        autorun(() => setValue(observableHelloWold.hello))
    }, [])

    return <div>
        <input type="text" value={value} onChange={event => observableHelloWold.hello = event.target.value}/>
        <div>{value}</div>
    </div>
}

export default ObservableObjectExample
