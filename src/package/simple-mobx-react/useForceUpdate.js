import { useState } from "react";

export function useForceUpdate() {
  const [, updateState] = useState({});
  return () => updateState({});
}
