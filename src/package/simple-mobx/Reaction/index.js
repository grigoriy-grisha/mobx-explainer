import { globalState } from "../globalstate";

/**
 * @description Сущность реакции, содержащаяя коллбек, который привязан к наблюдаемым значенмиям.
 * Реакция содержит список наблюдаемых значений, от котрых зависит.
 * Это нужно для взаимной отписки при вызове метода dispose
 *
 * В исходниках находится тут https://github.com/mobxjs/mobx/blob/63698d0681988194bac5fc01851882b417b35f18/packages/mobx/src/core/reaction.ts#L53
 *
 */
export class Reaction {
  constructor(callback) {
    this._callback = callback;
    this._observers = new Set([]);
    this._disposed = false;
  }

  /**
   * @description  Добавление наблюдаемого значения
   */
  addObserver(observer) {
    this._observers.add(observer);
  }

  /**
   * @description  Удаление наблюдаемого значения
   */
  removeObserver(observer) {
    this._observers.delete(observer);
  }

  /**
   *  @description Запуск трекаемого коллбека с записью текущего контекста в глобальную переменную
   *  Чтобы наблюдаемые значения могли перехватить реакцию и сохранить себе в слушатели
   *  @param trackedCallback коллбэк, вызывающийся для привзяки реакции к наблюдаемым значениям
   */
  track(trackedCallback) {
    if (this._disposed) return;

    /**
     * Сохранение прошлой реакции нужно для поддержки вложенных реакций
     */
    const prevDerivation = globalState.trackingDerivation;

    globalState.trackingDerivation = this;
    trackedCallback();
    globalState.trackingDerivation = prevDerivation;
  }

  /**
   * @description  Запуск переданного коллбека
   */
  run() {
    if (this._disposed) return;
    return this._callback();
  }

  /**
   * @description  Выполняет подготовку реакции к отписке
   *  вызывает метод для взаимных отписок
   */
  dispose() {
    this._disposed = true;
    this._clearObservers();
  }

  /**
   * @description  Получение метода dispose, с привязкой контекста
   */
  getDispose() {
    return this.dispose.bind(this);
  }

  /**
   * @description  Вызов взаимной отписки наблюдаемых значений
   */
  _clearObservers() {
    this._observers.forEach((observer) => observer.dispose(this));
  }
}
