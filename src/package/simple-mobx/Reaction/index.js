import { globalState } from "../globalstate";

/**
 * @description Сущность реакции, содержащаяя коллбек, который привязан к наблюдаемым значенмиям.
 * Реакция содержит список наблюдаемых значений, от котрых зависит.
 * Это нужно для взаимной отписки при вызове метода dispose
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
   *  @description Запуск коллбека с записью текущего контекста в глобальную перменную
   *  Чтобы наблюдаемые значения могли перехватить реакцию и сохранить себе в слушатели
   *  @param trackedCallback коллбэк, вызываюийся для привзяки реакции к наблюдаемым значениям
   */
  track(trackedCallback) {
    if (this._disposed) return;
    globalState.trackingContext = this;
    trackedCallback();
    globalState.trackingContext = null;
  }

  /**
   * @description  Запуск переданного коллбека
   */
  run() {
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
