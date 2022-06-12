import { makeObservable } from "./package/simple-mobx/makeObservable";

class GlobalExmpleState {
  constructor() {
    this.array = makeObservable([1, 2, 3, 4]);
  }
}

export const globalExmpleState = new GlobalExmpleState();
