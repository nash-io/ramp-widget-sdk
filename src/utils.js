var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import getStyles from "./assets/styles";
import { STYLE_ELEMENT_ID } from "./constants";
export var stringifyQuery = function (params) {
    return Object.keys(params).reduce(function (prev, key, index) {
        var value = params[key];
        if (value == null) {
            return prev;
        }
        return "" + prev + (index > 0 ? "&" : "") + key + "=" + params[key];
    }, "");
};
// set vh (viewport height) for better full-height on mobile
// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
export var setCustomVh = function (styleOptions) {
    if (typeof document !== "undefined") {
        var customVh = window.innerHeight / 100 + "px";
        var styleEl = document.querySelector("#" + STYLE_ELEMENT_ID);
        if (styleEl != null) {
            styleEl.innerHTML = getStyles(__assign(__assign({}, styleOptions), { customVh: customVh }));
        }
    }
};
