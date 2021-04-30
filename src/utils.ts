import getStyles, { GetStylesProps } from "./assets/styles";
import { STYLE_ELEMENT_ID } from "./constants";

export const stringifyQuery = (params: Record<string, any>): string =>
  Object.keys(params).reduce((prev, key, index) => {
    const value = params[key];
    if (value == null) {
      return prev;
    }
    return `${prev}${index > 0 ? "&" : ""}${key}=${params[key]}`;
  }, "");

// set vh (viewport height) for better full-height on mobile
// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
export const setCustomVh = (styleOptions: GetStylesProps) => {
  if (typeof document !== "undefined") {
    const customVh = window.innerHeight / 100 + "px";
    const styleEl = document.querySelector(`#${STYLE_ELEMENT_ID}`);
    if (styleEl != null) {
      styleEl.innerHTML = getStyles({ ...styleOptions, customVh });
    }
  }
};
