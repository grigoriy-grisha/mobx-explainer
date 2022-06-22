import {useMemo} from "react";
import {makeObservable} from "../../package/simple-mobx/makeObservable";
import {observer} from "../../package/simple-mobx-react";

function Counter() {
  const count = useMemo(() => makeObservable(0), [])
  return <div style={{display: 'flex', justifyContent: 'center'}}>
    <button
      className="btn waves-effect waves-light"
      name="action"
      onClick={() => {
        count.set(count.get() - 1)
      }}
    >
      -
    </button>
    <div style={{padding: 5}}>{count.get()}</div>
    <button
      className="btn waves-effect waves-light"
      name="action"
      onClick={() => {
        count.set(count.get() + 1)
      }}
    >
      +
    </button>
  </div>
}

export default observer(Counter)
