import {useEffect, useMemo, useRef, useState} from 'react'
import {autorun, observableObject} from "./package/simple-mobx";

function ObservableObjectExample() {
  const observableHelloWold = useMemo(() => observableObject({hello: 'hello'}), [])
  const [value, setValue] = useState(() => observableHelloWold.hello)
  const disposerRef = useRef()

  useEffect(() => {
    disposerRef.current = autorun(() => setValue(observableHelloWold.hello))
  }, [])

  return <div>
    <input type="text" value={value} onChange={event => observableHelloWold.hello = event.target.value}/>
    <div>{value}</div>
    <div onClick={disposerRef.current}>dispose</div>
  </div>
}

export default ObservableObjectExample
