import { observableValue } from "../ObservableValue";
import { $$observable } from "../constants";
import { isFunction } from "../utils";

export class ObservableObject {
  constructor(target) {
    this._target = target;

    /**
     * создаем объект значений, это копия объекта,
     * приходящего из вне, только все значения обернуты в ObservableValue
     */
    this._values = Object.fromEntries(Object.entries(target).map(([key, value]) => [key, observableValue(value)]));

    this[$$observable] = true;
  }

  /**
   * @description Метод-делегат, который возвращает значение из ObservableValue,
   * если такой вообще есть в this._values
   */
  get(target, property) {
    if (!this._hasProperty(property)) return;

    if (isFunction(target[property])) return target[property];

    return this._values[property].get();
  }

  /**
   * @description  Метод-делегат, который устанавливает
   * значения для ObservableValue и для внешнего объекта
   */
  set(target, property, value) {
    if (this._hasProperty(property)) {
      this._values[property].set(value);
      return true;
    }

    if (isFunction(target[property])) {
      target[property] = value;
      return true;
    }

    this._values[property] = observableValue(value);

    target[property] = value;

    return true;
  }

  _hasProperty(property) {
    return property in this._target;
  }
}
