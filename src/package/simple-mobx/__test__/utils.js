import { $$observableAdmin } from "../constants";

export function hasAdminSymbol(value) {
  return Object.getOwnPropertySymbols(value).includes($$observableAdmin);
}

export function expectListenerWasUpdated(fn) {
  expect(fn).toBeCalledTimes(2);
  return () => expect(fn).toBeCalledTimes(2);
}
