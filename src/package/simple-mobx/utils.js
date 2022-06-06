import {$$observable} from "./constants";

export function isObservable(arg) {
  if (!!arg) return !!arg[$$observable]
  return false
}

export function is(Ctor, val) {
  return (val != null && val.constructor === Ctor) || val instanceof Ctor;
}

export function isFunction(arg) {
  return is(Function, arg);
}

export function isArray(arg) {
  return is(Array, arg);
}

export function isPureObject(arg) {
  return is(Object, arg) && !Array.isArray(arg);
}

export function isPrimitive(arg) {
  return !isPureObject(arg) && !isFunction(arg) && !isArray(arg);
}
