import { ObservableObject } from "./ObservableObject";
import { $$observableAdmin } from "../constants";

/**
 * @description функция создает прокси и делегирует ему ObservableObject
 */
export function observableObject(target) {
  if (target.hasOwnProperty($$observableAdmin)) return target;

  Object.defineProperty(target, $$observableAdmin, {
    enumerable: false,
    configurable: false,
    writable: false,
    value: new ObservableObject(target),
  });

  return new Proxy(target, {
    get(...args) {
      return target[$$observableAdmin].get(...args);
    },
    set(...args) {
      return target[$$observableAdmin].set(...args);
    },
  });
}
