import { Atom } from "../Atom";
import { MockReaction } from "./mock/mockReaction";
import { globalState } from "../globalstate";

function runReactions(atom) {
  atom._notify();
}

function reportObserved(atom) {
  atom._reportObserved();
}

describe("atom", () => {
  it("should be defined", () => expect(Atom).toBeDefined());

  it("atom should add reaction to observers", () => {
    const atom = new Atom();

    const reaction = new MockReaction();

    atom.observe(reaction);

    expect(atom._observers.has(reaction)).toBe(true);
    expect(reaction.addObserver).toBeCalled();
  });

  it("atom should remove reaction from observers", () => {
    const atom = new Atom();

    const reaction = new MockReaction();

    atom.observe(reaction);

    atom.dispose(reaction);

    expect(atom._observers.size).toBe(0);
    expect(reaction.removeObserver).toBeCalled();
  });

  it("atom should run all reactions", () => {
    const atom = new Atom();

    const reaction1 = new MockReaction();
    const reaction2 = new MockReaction();

    atom.observe(reaction1);
    atom.observe(reaction2);

    runReactions(atom);

    expect(reaction1.run).toBeCalled();
    expect(reaction2.run).toBeCalled();
  });

  it("register reaction across tracing derivations", () => {
    const atom = new Atom();
    const reaction = new MockReaction();

    globalState.trackingDerivation = reaction;
    reportObserved(atom);
    globalState.trackingDerivation = null;

    expect(atom._observers.has(reaction)).toBe(true);
    expect(reaction.addObserver).toBeCalled();

    runReactions(atom);

    expect(reaction.run).toBeCalled();
  });
});
