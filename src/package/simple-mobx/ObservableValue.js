import {globalState} from "./globalstate";

/**
 * @description класс наблюдаемого значения Содержит слушатели и само значение
 */
export class ObservableValue {
    constructor(value) {
        this._observers = new Set([]);
        this._value = value;
    }

    /**
     * @description Отдает значение и, если есть глобальный слушатель, то регистрирует его
     */
    get() {
        if (globalState.globalAutorunFn) {
            this.observe(globalState.globalAutorunFn);
        }

        return this._value;
    }

    /**
     * @description Устанавливает новое значение и уведомляет слушателей
     */
    set(newValue) {
        this._value = newValue;
        this._notify();
    }

    /**
     * @description Добавляет слушатель в массив слушателей
     */
    observe(callback) {
        this._observers.add(callback);
    }

    /**
     * @description Удаляет слушатель из массива слушателей
     */
    unsubscribe(callback) {
        this._observers.delete(callback)
    }

    /**
     * @description Уведомляет слушателей об изменениях
     */
    _notify() {
        this._observers.forEach((value) => value());
    }

    toString() {
        return "ObservableValue";
    }
}

