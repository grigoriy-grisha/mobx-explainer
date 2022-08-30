import { useLayoutEffect, useRef } from "react";

import { Reaction } from "../simple-mobx";
import { useForceUpdate } from "./useForceUpdate";

/**
 * Аналогичный HOC в mobx https://github.com/mobxjs/mobx-react-lite/blob/master/src/observer.ts#L39
 * @param Component
 *
 * В reactionTrackingRef содержится наша реакция, ее мы создаем только на маунт компонента
 * В Реакцию передали forceUpdate, это функция,
 * которая возращается с кастомного хука функция при вызове принудительно перерендерит компонент,
 * если изменятся наблюдаемые значения.
 *
 * В useLayoutEffect мы отписываемся от наблюдаемых значений, когда компонент умрет.
 *
 * Далее, создаем переменную в которую будем записывать jsx из компонента
 * И в метод track передаем функцию, в которой вызывается наш компонент,
 * именно тут и произойдет связка реакции с наблюдаемыми значениями, которые используются в компоненте
 */
export function observer(Component) {
  return (props) => {
    const reactionTrackingRef = useRef(null);
    const forceUpdate = useForceUpdate();

    if (!reactionTrackingRef.current) {
      reactionTrackingRef.current = new Reaction(forceUpdate);
    }

    useLayoutEffect(() => () => reactionTrackingRef.current.dispose(), []);

    let rendering;
    reactionTrackingRef.current.track(() => {
      rendering = Component(props);
    });

    return rendering;
  };
}
