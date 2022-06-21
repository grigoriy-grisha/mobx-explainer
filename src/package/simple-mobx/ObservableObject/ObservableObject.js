import { observableValue } from "../ObservableValue";
import { $$observable } from "../constants";
import { isFunction, isObservable } from "../utils";

/**
 * @description observable значение, предаставляющее наблюдаемый объект
 * в mobx содержиться тут https://github.com/mobxjs/mobx/blob/63698d0681988194bac5fc01851882b417b35f18/packages/mobx/src/types/observableobject.ts#L90
 * у нас много метдов не реализовано, такие как has, delete,ownKeys и др
 */
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

    if (isObservable(this._values[property])) {
      return this._values[property].get();
    }

    return this._values[property];
  }

  /**
   * @description  Метод-делегат, который устанавливает
   * значения для ObservableValue и для внешнего объекта
   */
  set(target, property, value) {
    if (this._hasProperty(property)) {
      if (isObservable(this._values[property])) {
        this._values[property].set(value);
        return true;
      }

      this._values[property] = value;

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
