import { observableArray } from "./package/simple-mobx";

class GlobalExmpleState {
  constructor() {
    this.array = observableArray([1, 2, 3, 4]);
  }
}

export const globalExmpleState = new GlobalExmpleState();
