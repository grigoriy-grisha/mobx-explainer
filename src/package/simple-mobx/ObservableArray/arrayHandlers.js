import {$$observableAdmin} from "../constants";

/**
 * Имплементация методов массива
 * методы массива могут вызывать геттеры и сеттеры у массива несколько раз,
 * что будет провоцировать лишние вызовы слушателей, поэтому нужно сделать надстройку над методами,
 * Вручную добавить значения в массив, и один раз вызвать уведомление слушаетелей
 */
const arrayMethods = {
  push(...items) {
    const internalReactiveInstance = (this)[$$observableAdmin];
    internalReactiveInstance.spliceWithArray(internalReactiveInstance.getValues().length, 0, ...items);
    return internalReactiveInstance.getValues().length;
  },
};

export class ArrayHandlers {
  get(target, property, _) {
    const arrayMethod = arrayMethods[property];
    if (arrayMethod) return arrayMethod.bind(target);

    return target[$$observableAdmin].get(target, property);
  }

  set(target, property, value) {
    const reactiveField = target[$$observableAdmin];

    if (property === 'length') return reactiveField.setLength(value);
    return reactiveField.set(target, property, value);
  }
}
