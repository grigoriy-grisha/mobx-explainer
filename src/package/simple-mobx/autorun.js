import {Reaction} from "./Reaction";

/**
 * @description функция для упрощения работы с Reaction
 */
export function autorun(callback) {
    const reaction =  new Reaction(callback)
    reaction.track()

    return reaction.getDispose()
}
