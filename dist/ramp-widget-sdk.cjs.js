'use strict';

var envs = {
    LOCAL: "http://localhost:3000",
    PRODUCTION: "https://buy.nash.io",
};
var MODAL_ID = "nash-ramp-modal";
var CLOSE_BUTTON_ID = "nash-fiat-ramp-widget-close-button";
var IFRAME_WRAPPER_ID = "nash-fiat-ramp-widget-iframe-wrapper";
var IFRAME_ID = "nash-fiat-ramp-widget-iframe";
var TARGET_ELEMENT_DATA_ATTR = "data-nash-fiat-ramp-widget";
var BODY_MODAL_OPEN_CLASS_NAME = "nash-fiat-ramp-widget__modal-open";
var MOBILE_BREAKPOINT = "495px";
var CUSTOM_VH_CSS_VAR = "--nash-fiat-ramp-widget-vh";
var STYLE_ELEMENT_ID = "nash-fiat-ramp-widget-style-element";

var closeButton = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjA0NjkgOEwxNC44NzUgMy4yMTg3NUwxNS44NTk0IDIuMjM0MzhDMTYgMi4wOTM3NSAxNiAxLjg1OTM4IDE1Ljg1OTQgMS42NzE4OEwxNC44MjgxIDAuNjQwNjI1QzE0LjY0MDYgMC41IDE0LjQwNjIgMC41IDE0LjI2NTYgMC42NDA2MjVMOC41IDYuNDUzMTJMMi42ODc1IDAuNjQwNjI1QzIuNTQ2ODggMC41IDIuMzEyNSAwLjUgMi4xMjUgMC42NDA2MjVMMS4wOTM3NSAxLjY3MTg4QzAuOTUzMTI1IDEuODU5MzggMC45NTMxMjUgMi4wOTM3NSAxLjA5Mzc1IDIuMjM0MzhMNi45MDYyNSA4TDEuMDkzNzUgMTMuODEyNUMwLjk1MzEyNSAxMy45NTMxIDAuOTUzMTI1IDE0LjE4NzUgMS4wOTM3NSAxNC4zNzVMMi4xMjUgMTUuNDA2MkMyLjMxMjUgMTUuNTQ2OSAyLjU0Njg4IDE1LjU0NjkgMi42ODc1IDE1LjQwNjJMOC41IDkuNTkzNzVMMTMuMjgxMiAxNC40MjE5TDE0LjI2NTYgMTUuNDA2MkMxNC40MDYyIDE1LjU0NjkgMTQuNjQwNiAxNS41NDY5IDE0LjgyODEgMTUuNDA2MkwxNS44NTk0IDE0LjM3NUMxNiAxNC4xODc1IDE2IDEzLjk1MzEgMTUuODU5NCAxMy44MTI1TDEwLjA0NjkgOFoiIGZpbGw9IiMwMDUyRjMiLz4KPC9zdmc+';

var getStyles = function (_a) {
    var width = _a.width, height = _a.height, modal = _a.modal, _b = _a.customVh, customVh = _b === void 0 ? "100%" : _b;
    return "\n  :root {\n    " + CUSTOM_VH_CSS_VAR + ": " + customVh + ";\n  }\n  body." + BODY_MODAL_OPEN_CLASS_NAME + " {\n    overflow: hidden;\n  }\n  #" + MODAL_ID + " {\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    background-color: rgba(27, 31, 47, 0.85);\n  }\n  #" + CLOSE_BUTTON_ID + " {\n    border: 0;\n    top: 16px;\n    padding: 0;\n    right: 16px;\n    cursor: pointer;\n    background: none;\n    position: absolute;\n    & img {\n      width: 24px;\n      height: 24px;\n    }\n  }\n  #" + CLOSE_BUTTON_ID + " img {\n    width: 24px;\n    height: 24px;\n  }\n  #" + IFRAME_ID + " {\n    border: 0;\n  }\n  #" + IFRAME_WRAPPER_ID + " {\n    position: relative;\n    width:" + (typeof width === "number" ? width + "px" : width) + ";\n    height:" + (typeof height === "number" ? height + "px" : height) + ";\n  }\n  " + (modal === true
        ? "\n    [" + TARGET_ELEMENT_DATA_ATTR + "] {\n      border-radius: 8px;\n      overflow:hidden;\n    }\n    #" + IFRAME_WRAPPER_ID + " {\n      background: white;\n    }\n    @media all and (max-width: " + MOBILE_BREAKPOINT + ") {\n      [" + TARGET_ELEMENT_DATA_ATTR + "], #" + IFRAME_WRAPPER_ID + " {\n        top:0;\n        width: 100%;\n        height: 100vh;\n        height: calc(var(" + CUSTOM_VH_CSS_VAR + ", 1vh) * 100);\n        border-radius: 0;\n      }\n    }\n  "
        : "") + "\n";
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var stringifyQuery = function (params) {
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
var setCustomVh = function (styleOptions) {
    if (typeof document !== "undefined") {
        var customVh = window.innerHeight / 100 + "px";
        var styleEl = document.querySelector("#" + STYLE_ELEMENT_ID);
        if (styleEl != null) {
            styleEl.innerHTML = getStyles(__assign(__assign({}, styleOptions), { customVh: customVh }));
        }
    }
};

var NashRamp = /** @class */ (function () {
    function NashRamp(init) {
        if (init.target == null) {
            throw new Error("Please provide the `target` (crypto) parameter");
        }
        if (init.base == null) {
            throw new Error("Please provide the `base` (fiat) parameter");
        }
        if (init.destination == null) {
            throw new Error("Please provide the `destination` (wallet address) parameter");
        }
        this.referrer =
            init.referrer != null
                ? init.referrer
                : typeof window !== "undefined"
                    ? window.location.hostname
                    : undefined;
        this.referrerName = init.referrerName;
        this.redirect = init.redirect;
        this.env = init.env != null ? init.env : "PRODUCTION";
        this.destination = init.destination;
        this.base = init.base;
        this.target = init.target;
    }
    NashRamp.prototype.getIframeUrl = function (options) {
        var queryParams = {
            fromSdk: true,
            fiatSymbol: options.base,
            cryptoSymbol: options.target,
            destination: options.destination,
            referrer: options.referrer,
            referrerName: options.referrerName,
            redirect: options.redirect != null ? encodeURI(options.redirect) : undefined,
        };
        var origin = envs[this.env];
        var query = stringifyQuery(queryParams);
        return origin + "?" + query;
    };
    /**
     * @param  {{width:number;height:number}} options
     * @param  {number|string} options.width - Element width (e.g. "100%"; 320; "320px")
     * @param  {number|string} options.height - Element width (e.g. "100%"; 480; "480px")
     * @callback onClose - Function to be called when the close button is clicked
     */
    NashRamp.prototype.init = function (options) {
        var _this = this;
        // get body
        var body = document.querySelector("body");
        if (body == null) {
            throw new Error("DOM should have a <body />");
        }
        // inject styles
        var style = document.createElement("style");
        style.id = STYLE_ELEMENT_ID;
        var styleProps = {
            width: options.width,
            height: options.height,
            modal: options.modal,
        };
        style.innerHTML = getStyles(styleProps);
        body.appendChild(style);
        setCustomVh(styleProps);
        this.resizeEvent = function () { return setCustomVh(styleProps); };
        this.addWindowHeightListener();
        // get iframe url
        var iframeUrl = this.getIframeUrl({
            target: this.target,
            base: this.base,
            destination: this.destination,
            referrer: this.referrer,
            referrerName: this.referrerName,
            redirect: this.redirect,
            fiatAmount: options.fiatAmount,
        });
        /**
         * If modal option is enabled,
         * render a full-screen wrapper.
         */
        if (options.modal === true) {
            // inject modal wrapper HTML
            var modalWrapper = document.createElement("div");
            modalWrapper.innerHTML = "<div id=\"" + MODAL_ID + "\"><div " + TARGET_ELEMENT_DATA_ATTR + " /></div>";
            body.appendChild(modalWrapper);
            /* add click handler to close modal when clicked outside */
            modalWrapper.onclick = function () {
                if (options.onClose != null) {
                    options.onClose();
                }
                _this.closeModal();
            };
            /* add "modal-open" className to body */
            body.className = body.className + " " + BODY_MODAL_OPEN_CLASS_NAME;
        }
        /**
         * Target element handling:
         * This is where the iframe is injected.
         * If `onClose` is provided or `modal === true`, a close button is rendered over the element.
         */
        var shouldRenderCloseButton = options.onClose != null || options.modal === true;
        // get target element
        var element = document.querySelector("[" + TARGET_ELEMENT_DATA_ATTR + "]");
        if (element != null) {
            // inject wrapper + iframe + close button
            element.innerHTML = "<div id=\"" + IFRAME_WRAPPER_ID + "\">" + (shouldRenderCloseButton
                ? "<button id=\"" + CLOSE_BUTTON_ID + "\"><img src=\"" + closeButton + "\"/></button>"
                : "") + "<iframe id=\"" + IFRAME_ID + "\" src=" + iframeUrl + " width=\"100%\" height=\"100%\" /></div>";
            // handle close button click event
            if (shouldRenderCloseButton) {
                var closeButton_1 = document.getElementById(CLOSE_BUTTON_ID);
                if (closeButton_1 != null) {
                    closeButton_1.onclick = function () {
                        if (options.onClose != null) {
                            options.onClose();
                        }
                        _this.closeModal();
                    };
                }
            }
        }
    };
    NashRamp.prototype.addWindowHeightListener = function () {
        if (typeof window !== "undefined" && this.resizeEvent != null) {
            window.addEventListener("resize", this.resizeEvent);
        }
    };
    NashRamp.prototype.removeWindowHeightListener = function () {
        if (typeof window !== "undefined" && this.resizeEvent != null) {
            window.removeEventListener("resize", this.resizeEvent);
        }
    };
    NashRamp.prototype.closeModal = function () {
        this.removeWindowHeightListener();
        var body = document.querySelector("body");
        var style = document.querySelector("#" + STYLE_ELEMENT_ID);
        if (body != null) {
            body.className = "" + body.className.replace(BODY_MODAL_OPEN_CLASS_NAME, "");
        }
        if (style != null) {
            style.remove();
        }
        var modal = document.getElementById(MODAL_ID);
        if (modal != null) {
            modal.remove();
        }
    };
    return NashRamp;
}());

module.exports = NashRamp;
