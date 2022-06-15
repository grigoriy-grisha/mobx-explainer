import { observableObject } from "../ObservableObject";
import { autorun } from "../autorun";

describe("observableObject autorun", () => {
  it("observableObject must be defined", function () {
    expect(observableObject).toBeDefined();
  });

  it("autorun must be defined", function () {
    expect(autorun).toBeDefined();
  });

  it("listener must be called", function () {
    const value = observableObject({ hello: "hello" });
    const listener = jest.fn(() => value.hello);

    autorun(listener);

    value.hello = "new hello";

    expect(listener).toBeCalledTimes(2);
  });

  it("listener must not be called before dispose autorun", function () {
    const value = observableObject({ hello: "hello" });
    const listener = jest.fn(() => value.hello);

    const dispose = autorun(listener);

    value.hello = "new hello";

    expect(listener).toBeCalledTimes(2);

    dispose();

    value.hello = "new hello 1";
    value.hello = "new hello 2";
    value.hello = "new hello 3";

    expect(listener).toBeCalledTimes(2);
  });
});
