import {useMemo} from 'react'
import {observableValue} from "./package/simple-mobx";
import {observer} from "./package/simple-mobx-react";

function ObservableValueExample() {
  const observableHelloWold = useMemo(() => observableValue("hello world"), [])

  return <div>
    <input type="text" value={observableHelloWold.get()} onChange={event => observableHelloWold.set(event.target.value)}/>
    <div>{observableHelloWold.get()}</div>
  </div>
}

export default observer(ObservableValueExample)
