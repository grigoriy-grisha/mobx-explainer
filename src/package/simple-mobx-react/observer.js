import { useLayoutEffect, useRef } from "react";
import { Reaction } from "../simple-mobx";
import { useForceUpdate } from "./useForceUpdate";

/**
 * Аналогичный HOC в mobx https://github.com/mobxjs/mobx-react-lite/blob/master/src/observer.ts#L39
 * @param Component
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
