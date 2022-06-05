import {globalState} from './globalstate'

export function autorun(callback) {
    globalState.globalAutorunFn = callback;
    callback();
    globalState.globalAutorunFn = null;
}
