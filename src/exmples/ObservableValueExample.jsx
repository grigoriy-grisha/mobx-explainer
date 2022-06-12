import { useMemo } from "react";
import { observer } from "../package/simple-mobx-react";
import { makeObservable } from "../package/simple-mobx/makeObservable";

function ObservableValueExample() {
  const observableHelloWold = useMemo(() => makeObservable("hello world"), []);

  return (
    <div>
      <input
        type="text"
        value={observableHelloWold.get()}
        onChange={(event) => observableHelloWold.set(event.target.value)}
      />
      <div>{observableHelloWold.get()}</div>
    </div>
  );
}

export default observer(ObservableValueExample);
