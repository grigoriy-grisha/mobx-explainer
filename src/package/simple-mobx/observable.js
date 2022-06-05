import {ObservableObject} from "./ObservableObject";

const $Reactive = Symbol("$Reactive");

/**
 * @description функция создает прокси и делегирует ему ObservableObject
 */
export function observable(target) {
    Object.defineProperty(target, $Reactive, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: new ObservableObject(target)
    });

    return new Proxy(target, {
        get(...args) {
            return target[$Reactive].get(...args);
        },
        set(...args) {
            return target[$Reactive].set(...args);
        }
    });
}
