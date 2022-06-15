import { observableValue } from "../ObservableValue";
import { hasAdminSymbol } from "./utils";

describe("observableValue", () => {
  it("should be defined", function () {
    expect(observableValue).toBeDefined();
  });

  it("get() must return provided value", function () {
    const providedValue = "hello world";
    const value = observableValue(providedValue);

    expect(value.get()).toBe(providedValue);
  });

  it("set() must change value", function () {
    const providedValue = "hello world";
    const newValue = "hello world";
    const value = observableValue(providedValue);

    value.set(newValue);
    expect(value.get()).toBe(newValue);
  });

  it("array and object value must has 'admin' symbol key", function () {
    const providedValue = { hello: "hello" };
    const value = observableValue(providedValue);

    expect(hasAdminSymbol(value.get())).toBe(true);

    value.set([1, 2, 3, 4]);

    expect(hasAdminSymbol(value.get())).toBe(true);

    value.set(42);

    expect(hasAdminSymbol(value.get())).toBe(false);
  });
});
