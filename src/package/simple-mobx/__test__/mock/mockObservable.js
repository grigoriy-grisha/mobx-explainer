import { Atom } from "../../Atom";

export class MockObservable extends Atom {
  get() {
    this._reportObserved();
  }

  set() {
    this._notify();
  }
}
