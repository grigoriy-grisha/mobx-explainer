import { $$observableAdmin } from "../constants";

const { observableValue } = require("../ObservableValue");

describe("observableValue", () => {
  it("should be defined", function () {
    expect(observableValue).toBeDefined();
  });

  it("get() should return provided value", function () {
    const providedValue = "hello world";
    const value = observableValue(providedValue);

    expect(value.get()).toBe(providedValue);
  });

  it("set() should change value", function () {
    const providedValue = "hello world";
    const newValue = "hello world";
    const value = observableValue(providedValue);

    value.set(newValue);
    expect(value.get()).toBe(newValue);
  });

  it("array and object value should has symbol key", function () {
    const providedValue = { hello: "hello" };
    const value = observableValue(providedValue);

    expect(Object.getOwnPropertySymbols(value.get())[0]).toBe($$observableAdmin);

    value.set([1, 2, 3, 4]);

    expect(Object.getOwnPropertySymbols(value.get())[0]).toBe($$observableAdmin);

    value.set(42);

    expect(Object.getOwnPropertySymbols(value.get())[0]).not.toBe($$observableAdmin);
  });
});
