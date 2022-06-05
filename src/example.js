import {autorun} from "./package/simple-mobx";
import {ObservableValue} from "./package/simple-mobx/ObservableValue";

export function runExample() {
    const observableHelloWold = new ObservableValue("hello world")

    function listener() {
        console.log(observableHelloWold.get())
        console.log('change')
    }

    autorun(listener)

    observableHelloWold.set('NANOMACHINES SON!')
}
