import { isArray, isObservable, isPrimitive, isPureObject } from "./utils";
import { observableObject } from "./ObservableObject";
import { observableArray } from "./ObservableArray";
import { ObservableValue } from "./ObservableValue/ObservableValue";

export function makeObservable(value) {
  if (isObservable(value)) return value;
  if (isPrimitive(value)) return new ObservableValue(value);
  if (isPureObject(value)) return observableObject(value);
  if (isArray(value)) return observableArray(value);

  return value;
}
