import { observableArray } from "../ObservableArray";
import { observableObject } from "../ObservableObject";

import { $$observable } from "../constants";
import { isArray, isObservable, isPrimitive, isPureObject } from "../utils";
import { Atom } from "../Atom";

/**
 * @description оборачивает значение в observable контейнеры
 */
function enhancer(value) {
  if (isObservable(value)) return value;
  if (isPrimitive(value)) return value;
  if (isPureObject(value)) return observableObject(value);
  if (isArray(value)) return observableArray(value);

  return value;
}

/**
 * @description класс самого примитивного наблюдаемого значения
 * Содержит слушатели и само значение
 * в исходниках находится тут https://github.com/mobxjs/mobx/blob/63698d0681988194bac5fc01851882b417b35f18/packages/mobx/src/types/observablevalue.ts#L62
 * У нас не реализованы приведения в примитивные типы
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
    if (newValue === this._value) return;

    this._value = enhancer(newValue);

    this._notify();
  }
}
