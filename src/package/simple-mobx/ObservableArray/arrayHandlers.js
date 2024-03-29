import { $$observableAdmin } from "../constants";

/**
 * Имплементация методов массива
 * Нативные методы массива могут вызывать геттеры и сеттеры у массива несколько раз,
 * что будет провоцировать лишние вызовы слушателей, поэтому нужно реализовать их самостоятельно,
 * Наша реализация вручную добавляет/удаляет элементы за один проход и один раз уведомляет слушателей
 *
 * В mobx реализованы все методы https://github.com/mobxjs/mobx/blob/63698d0681988194bac5fc01851882b417b35f18/packages/mobx/src/types/observablearray.ts#L413
 *
 * Остальные методы так же реализутся с помощью spliceWithArray
 */
const arrayMethods = {
  push(...items) {
    const internalReactiveInstance = this[$$observableAdmin];
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

    if (property === "length") return reactiveField.setLength(value);
    return reactiveField.set(target, property, value);
  }
}
