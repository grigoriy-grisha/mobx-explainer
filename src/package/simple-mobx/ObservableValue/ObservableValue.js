import { observableArray } from "../ObservableArray";
import { observableObject } from "../ObservableObject";

import { globalState } from "../globalstate";
import { $$observable } from "../constants";
import { isArray, isObservable, isPrimitive, isPureObject } from "../utils";
import { Atom } from "../Atom";

/**
 * @description оборачивает значения в observable контейнера
 */
function enhancer(value) {
  if (isObservable(value)) return value;
  if (isPrimitive(value)) return value;
  if (isPureObject(value)) return observableObject(value);
  if (isArray(value)) return observableArray(value);
  return value;
}

/**
 * @description класс наблюдаемого значения Содержит слушатели и само значение
 */
export class ObservableValue extends Atom {
  constructor(value) {
    super();

    this[$$observable] = true;

    this._value = enhancer(value);
  }

  /**
   * @description Отдает значение и, если есть глобальный слушатель, то регистрирует его
   */
  get() {
    this._reportObserved();

    return this._value;
  }

  /**
   * @description Устанавливает новое значение и уведомляет слушателей
   */
  set(newValue) {
    this._value = newValue;
    this._notify();
  }
}
