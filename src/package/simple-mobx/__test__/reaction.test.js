import { Reaction } from "../Reaction";
import { MockObservable } from "./mock/mockObservable";
import { globalState } from "../globalstate";
import { autorun } from "../autorun";

describe("reaction", () => {
  it("should be defined", () => {
    expect(Reaction).toBeDefined();
  });

  it("callback must be fired", () => {
    const callback = jest.fn();
    const reaction = new Reaction(callback);

    reaction.run();

    expect(callback).toBeCalled();
  });

  it("callback must not be fired before dispose reaction", () => {
    const callback = jest.fn();
    const reaction = new Reaction(callback);

    reaction.dispose();
    reaction.run();

    expect(callback).not.toBeCalled();
  });

  it("reaction must add Observer", () => {
    const callback = jest.fn();
    const mockObservable = new MockObservable();
    const reaction = new Reaction(callback);

    reaction.addObserver(mockObservable);

    expect(reaction._observers.has(mockObservable)).toBe(true);
  });

  it("reaction must remove Observer", () => {
    const callback = jest.fn();
    const mockObservable = new MockObservable();
    const reaction = new Reaction(callback);

    reaction.addObserver(mockObservable);

    expect(reaction._observers.has(mockObservable)).toBe(true);

    reaction.removeObserver(mockObservable);

    expect(reaction._observers.has(mockObservable)).toBe(false);
  });

  it("trackingDerivation must be available inside the function", function () {
    const reaction = new Reaction(() => {});

    const listener = jest.fn(() => {
      expect(globalState.trackingDerivation).not.toBe(null);
    });

    expect(globalState.trackingDerivation).toBe(null);
    reaction.track(listener);
    expect(globalState.trackingDerivation).toBe(null);
  });

  it("reaction must be register to observableValue", function () {
    const mockObservable = new MockObservable();
    const reaction = new Reaction(() => {});

    const listener = jest.fn(() => mockObservable.get());

    reaction.track(listener);

    expect(reaction._observers.has(mockObservable)).toBe(true);
    expect(mockObservable._observers.has(reaction)).toBe(true);
  });

  it("reaction must be removed from observableValue", function () {
    const mockObservable = new MockObservable();
    const reaction = new Reaction(() => {});

    const listener = jest.fn(() => mockObservable.get());

    reaction.track(listener);

    expect(reaction._observers.has(mockObservable)).toBe(true);
    expect(mockObservable._observers.has(reaction)).toBe(true);

    reaction.dispose();

    expect(reaction._observers.has(mockObservable)).toBe(false);
    expect(mockObservable._observers.has(reaction)).toBe(false);
  });

  it("reaction must be executed before set observableValue", function () {
    const mockObservable = new MockObservable();
    const listener = jest.fn(() => mockObservable.get());

    const reaction = new Reaction(listener);

    reaction.track(listener);

    mockObservable.set()

    expect(listener).toBeCalledTimes(2)
  });

  it("reaction must not be executed before dispose", function () {
    const mockObservable = new MockObservable();
    const listener = jest.fn(() => mockObservable.get());
    const reaction = new Reaction(listener);

    reaction.track(listener);

    mockObservable.set()

    expect(listener).toBeCalledTimes(2)

    reaction.dispose()

    mockObservable.set()

    expect(listener).toBeCalledTimes(2)
  });
});
