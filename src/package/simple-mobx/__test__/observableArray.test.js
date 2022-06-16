import { observableArray } from "../ObservableArray";

describe("observableArray", () => {
  it("to be defined", () => {
    expect(observableArray).toBeDefined();
  });

  it("providedObject must be equal observable value", () => {
    const providedObject = [1, 2, 3, 4, 5];
    const observable = observableArray(providedObject);

    expect(providedObject).toEqual(observable);
  });

  it("must be get value by index", () => {
    const providedObject = [1, 2, 3, 4, 5];
    const observable = observableArray(providedObject);

    expect(observable[0]).toBe(1);
  });

  it("must be set new value", () => {
    const providedObject = [1, 2, 3, 4, 5];
    const observable = observableArray(providedObject);

    observable[0] = 42;

    expect(observable[0]).toBe(42);
  });
});
