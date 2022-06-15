import { $$observableAdmin } from "../constants";

export function hasAdminSymbol(value) {
  return Object.getOwnPropertySymbols(value).includes($$observableAdmin);
}
