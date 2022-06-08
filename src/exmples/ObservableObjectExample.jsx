import { useMemo } from "react";
import { observableObject } from "../package/simple-mobx";
import { observer } from "../package/simple-mobx-react";

function ObservableObjectExample() {
  const observableHelloWold = useMemo(() => observableObject({ hello: "hello" }), []);

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
