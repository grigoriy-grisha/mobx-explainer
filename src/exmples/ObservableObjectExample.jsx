import { useMemo } from "react";
import { observer } from "../package/simple-mobx-react";
import { makeObservable } from "../package/simple-mobx/makeObservable";

function ObservableObjectExample() {
  const observableHelloWold = useMemo(() => makeObservable({ hello: "hello" }), []);

  return (
    <div>
      <input
        type="text"
        value={observableHelloWold.hello}
        onChange={(event) => (observableHelloWold.hello = event.target.value)}
      />
      <div>{observableHelloWold.hello}</div>
    </div>
  );
}

export default observer(ObservableObjectExample);
