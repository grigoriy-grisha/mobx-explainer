import { Reaction } from "../Reaction";
import { globalState } from "../globalstate";
import { observableValue } from "../ObservableValue";

describe("nested Reactions", () => {
  it("global state should has current reaction", () => {
    const reaction1 = new Reaction(() => {});
    const reaction2 = new Reaction(() => {});

    reaction1.track(() => {
      expect(globalState.trackingDerivation).toBe(reaction1);

      reaction2.track(() => {
        expect(globalState.trackingDerivation).toBe(reaction2);
      });

      expect(globalState.trackingDerivation).toBe(reaction1);
    });
  });

  it("reaction should run autorun function", () => {
    const autorunFn1 = jest.fn();
    const autorunFn2 = jest.fn();

    const reaction1 = new Reaction(autorunFn1);
    const reaction2 = new Reaction(autorunFn2);

    const observableValue1 = observableValue(1);
    const observableValue2 = observableValue(1);

    reaction1.track(() => {
      reaction2.track(() => observableValue2.get());

      observableValue1.get();
    });

    observableValue1.set(observableValue1.get() + 1);
    observableValue2.set(observableValue2.get() + 1);

    expect(autorunFn1).toBeCalledTimes(1);
    expect(autorunFn2).toBeCalledTimes(1);
  });
});
