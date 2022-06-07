import {useLayoutEffect, useRef} from "react";
import {Reaction} from "../simple-mobx";
import {useForceUpdate} from "./useForceUpdate";

export function observer(Component) {
  return (props) => {
    const reactionTrackingRef = useRef(null)
    const forceUpdate = useForceUpdate()

    if (!reactionTrackingRef.current) {
      reactionTrackingRef.current = new Reaction(forceUpdate)
    }

    useLayoutEffect(() => () => reactionTrackingRef.current.dispose(), [])

    let rendering
    reactionTrackingRef.current.track(() => {
        rendering = Component(props)
    })

    return rendering
  }
}
