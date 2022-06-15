import { autorun } from "../autorun";
import { globalState } from "../globalstate";

describe("autorun", () => {
  it("should be defined", function () {
    expect(autorun).toBeDefined();
  });

  it("trackingDerivation must be available inside the function", function () {
    const listener = jest.fn(() => {
      expect(globalState.trackingDerivation).not.toBe(null);
    });

    expect(globalState.trackingDerivation).toBe(null);
    autorun(listener);
    expect(globalState.trackingDerivation).toBe(null);
  });

  it("autorun should return dispose function", () => {
    const dispose = autorun(() => {});

    expect(typeof dispose).toBe("function");
  });
});
