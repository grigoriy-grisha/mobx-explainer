import {globalState} from "../globalstate";
import {isObservable, isPrimitive} from "../utils";
import {$$observable} from "../constants";
import {observableValue} from "../ObservableValue";
import {Atom} from "../Atom";


function arrayEnhancer(items) {
  return items.map((targetElement) => {
    if (isPrimitive(targetElement)) return targetElement;
    return observableValue(targetElement);
  });
}
/**
 * @description класс наблюдаемого значения для массивов
 */
export class ObservableArray extends Atom{
  constructor(target) {
    super()

    this._target = target
    this[$$observable] = true

    this._values = arrayEnhancer(target)
  }

  /**
   * @description Отдает значение и, если есть глобальный слушатель, то регистрирует его
   */
  get(target, property) {
    const executableCallback = globalState.trackingContext;
    if (executableCallback) this.observe(executableCallback);

    const observableValue = this._getValue(property);
    if (isObservable(observableValue)) return observableValue.get();
    return observableValue
  }

  /**
   * @description установка значения по ключу(индексу)
   */
  set(target, property, value) {
    this.spliceWithArray(property, 0, value);
    return true;
  }

  /**
   * @description возвращает значение по ключу(индексу) из внутреннего объекта значений
   */
  _getValue(property) {
    return this._values[property];
  }

  /**
   * @description надстройка над методов splice
   * с помощью метода splice, можно эмулировать почти любой метод вставки и удаления.
   *
   * Метод оборачивает новые элементы в ObservableValue
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


