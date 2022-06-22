/**
 * Класс глобального состояния
 * Аналогичная сущность в mobx https://github.com/mobxjs/mobx/blob/63698d0681988194bac5fc01851882b417b35f18/packages/mobx/src/core/globalstate.ts#L23
 *
 */
class GlobalState {
  /**
   * Переменная для записи реакции
   * такая же переменная в Mobx https://github.com/mobxjs/mobx/blob/63698d0681988194bac5fc01851882b417b35f18/packages/mobx/src/core/globalstate.ts#L42
   *
   */
  trackingDerivation = null;
}

export const globalState = new GlobalState();
