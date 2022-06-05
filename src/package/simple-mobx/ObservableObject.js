import {ObservableValue} from "./ObservableValue";

export class ObservableObject {
    constructor(target) {


        /**
         * создаем объект значений, это копия объекта,
         * приходящего из вне, только все значения обернуты в ObservableObject
         */
        this._values = Object.fromEntries(
            Object.entries(target).map(([key, value]) => [
                key,
                new ObservableValue(value)
            ])
        );
    }

    /**
     * @description Метод-делегат, который возвращает значение из ObservableValue,
     * если такой вообще есть в this._values
     */
    get(target, property) {
        if (!(property in this._values)) return;
        if (this._values[property].toString() !== "ObservableValue") {
            return this._values[property];
        }

        return this._values[property].get();
    }


    /**
     * @description  Метод-делегат, который устанавливает
     * значения для ObservableValue и для внешнего объекта
     */
    set(target, property, value) {
        if (property in this._values) {
            this._values[property].set(value);
        }

        target[property] = value;

        return true;
    }
}

