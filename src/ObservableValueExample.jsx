import {useEffect, useMemo, useRef, useState} from 'react'
import {autorun, observableValue} from "./package/simple-mobx";

function ObservableValueExample() {
  const observableHelloWold = useMemo(() => observableValue("hello world"), [])
  const [value, setValue] = useState(() => observableHelloWold.get())
  const disposerRef = useRef()

  useEffect(() => {
    disposerRef.current = autorun(() => setValue(observableHelloWold.get()))
  }, [])

  return <div>
    <input type="text" value={value} onChange={event => observableHelloWold.set(event.target.value)}/>
    <div>{value}</div>
    <div onClick={disposerRef.current}>dispose</div>
  </div>
}

export default ObservableValueExample
