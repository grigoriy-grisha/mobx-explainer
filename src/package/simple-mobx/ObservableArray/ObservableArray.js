import { isObservable } from "../utils";
import { $$observable } from "../constants";
import { observableValue } from "../ObservableValue";
import { Atom } from "../Atom";

function arrayEnhancer(items) {
  return items.map(observableValue);
}

/**
 * @description класс наблюдаемого значения для массивов
 * Аналогичная сущность из исходников Mobx https://github.com/mobxjs/mobx/blob/63698d0681988194bac5fc01851882b417b35f18/packages/mobx/src/types/observablearray.ts#L119
 *
 */
export class ObservableArray extends Atom {
  constructor(target) {
    super();

    this._target = target;
    this[$$observable] = true;

    this._values = arrayEnhancer(target);
  }

  /**
   * @description Отдает значение по индексу и, если есть глобальный слушатель, то регистрирует его
   */
  get(target, property) {
    this._reportObserved();

    const observableValue = this._getValue(property);
    if (isObservable(observableValue)) return observableValue.get();
    return observableValue;
  }

  /**
   * @description установка значения по индексу
   */
  set(target, property, value) {
    this.spliceWithArray(property, 0, value);
    return true;
  }

  /**
   * @description возвращает значение по индексу из внутреннего объекта значений
   */
  _getValue(property) {
    return this._values[property];
  }

  /**
   * @description
   * с помощью метода splice, можно эмулировать почти любой метод вставки и удаления.
   *
   * Метод оборачивает новые элементы в ObservableValue
   *
   * Этот метод выглядит очень сложным в mobx https://github.com/mobxjs/mobx/blob/63698d0681988194bac5fc01851882b417b35f18/packages/mobx/src/types/observablearray.ts#L213
   * там производится много вещей, но смысл примерно тот же:
   *
   * обернуть значения в observable и добавить их в массив
   * за один раз, так как нативные методы массива могут вызывать геттеры и сеттеры несколько раз,
   * что будет провоцировать лишние вызовы слушателей
   * и затем происходит увеомление слушателей https://github.com/mobxjs/mobx/blob/63698d0681988194bac5fc01851882b417b35f18/packages/mobx/src/types/observablearray.ts#L261
   */
  spliceWithArray(start, deleteCount, ...items) {
    this._values.splice(start, deleteCount || 0, ...arrayEnhancer(items));
    const splicesValues = this._target.splice(start, deleteCount || 0, ...items);

    this._notify();
    return splicesValues;
  }

  /**
   * @description Устанавливаем длину массива и уведомляем слушателей.
   */
  setLength(newLength) {
    const isValuesSetSuccess = Reflect.set(this._values, "length", newLength);
    const isTargetSetSuccess = Reflect.set(this._target, "length", newLength);

    this._notify();

    return isValuesSetSuccess && isTargetSetSuccess;
  }

  getValues() {
    return this._values;
  }
}
