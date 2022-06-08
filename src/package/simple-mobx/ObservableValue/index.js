import { ObservableValue } from "./ObservableValue";

export function observableValue(value) {
  return new ObservableValue(value);
}
