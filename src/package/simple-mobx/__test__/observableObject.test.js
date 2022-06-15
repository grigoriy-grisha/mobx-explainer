import { observableObject } from "../ObservableObject";

const helloPropertyValue = "hello";
const newHelloPropertyValue = "new hello";

describe("observableObject", () => {
  it("observableObject must be defined", () => {
    expect(observableObject).toBeDefined();
  });

  it("providedObject must be equal observable value", () => {
    const providedObject = { hello: helloPropertyValue };
    const observable = observableObject(providedObject);

    expect(providedObject).toStrictEqual(observable);
  });

  it("must be get value", () => {
    const providedObject = { hello: helloPropertyValue };
    const observable = observableObject(providedObject);

    expect(observable.hello).toBe(helloPropertyValue);
  });

  it("must be set new value", () => {
    const providedObject = { hello: helloPropertyValue };
    const observable = observableObject(providedObject);

    observable.hello = newHelloPropertyValue;

    expect(observable.hello).toBe(newHelloPropertyValue);
  });
});
