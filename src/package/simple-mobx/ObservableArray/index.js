import { ObservableArray } from "./ObservableArray";
import { ArrayHandlers } from "./arrayHandlers";
import { $$observableAdmin } from "../constants";

function delegateProxy(target) {
  return new Proxy(target, new ArrayHandlers());
}

export function observableArray(target) {
  if (target.hasOwnProperty($$observableAdmin)) return target;

  Object.defineProperty(target, $$observableAdmin, {
    enumerable: false,
    configurable: false,
    writable: false,
    value: new ObservableArray(target),
  });

  return delegateProxy(target);
}
