import {autorun} from "./package/simple-mobx";

export function runExample() {
    function listener() {}

    autorun(listener)
}
