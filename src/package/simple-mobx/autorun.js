import { Reaction } from "./Reaction";

/**
 * @description функция для упрощения работы с Reaction
 * Аналигочная функция в исходниках mobx https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/api/autorun.ts#L36
 * Там код намного сложнее, есть несколько типов autorun
 */
export function autorun(callback) {
  const reaction = new Reaction(callback);
  reaction.track(callback);

  return reaction.getDispose();
}
