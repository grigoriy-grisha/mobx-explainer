import { observableObject } from "../ObservableObject";
import { observableArray } from "../ObservableArray";

import { autorun } from "../autorun";

import { expectListenerWasUpdated } from "./utils";

describe("observableArray", () => {
  it("observableArray must be defined", function () {
    expect(observableObject).toBeDefined();
  });

  it("autorun must be defined", function () {
    expect(autorun).toBeDefined();
  });

  it("listener must be called", function () {
    const observable = observableArray([1, 2, 3, 4, 5]);
    const listener = jest.fn(() => observable[0]);

    autorun(listener);

    observable[0] = "new hello";

    expectListenerWasUpdated(listener);
  });

  it("listener must not be called before dispose autorun", function () {
    const observable = observableArray([1, 2, 3, 4, 5]);
    const listener = jest.fn(() => observable[0]);

    const dispose = autorun(listener);

    observable[0] = "new hello";

    const expectListenerIsNoWastUpdated = expectListenerWasUpdated(listener);

    dispose();

    observable[0] = "new hello 1";
    observable[0] = "new hello 2";
    observable[0] = "new hello 3";

    expectListenerIsNoWastUpdated();
  });

  it("set new length", function () {
    const observable = observableArray([1, 2, 3, 4, 5]);
    const listener = jest.fn(() => observable[0]);

    autorun(listener);

    observable.length = 10;

    expectListenerWasUpdated(listener);
  });
});
