import {useEffect, useMemo, useState} from 'react'
import {autorun} from "./package/simple-mobx";
import {observable} from "./package/simple-mobx/observable";

function ObservableObjectExample() {
    const observableHelloWold = useMemo(() => observable({hello:'hello'}), [])
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
