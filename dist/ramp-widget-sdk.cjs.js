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

var closeButton = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjA0NjkgOEwxNC44NzUgMy4yMTg3NUwxNS44NTk0IDIuMjM0MzhDMTYgMi4wOTM3NSAxNiAxLjg1OTM4IDE1Ljg1OTQgMS42NzE4OEwxNC44MjgxIDAuNjQwNjI1QzE0LjY0MDYgMC41IDE0LjQwNjIgMC41IDE0LjI2NTYgMC42NDA2MjVMOC41IDYuNDUzMTJMMi42ODc1IDAuNjQwNjI1QzIuNTQ2ODggMC41IDIuMzEyNSAwLjUgMi4xMjUgMC42NDA2MjVMMS4wOTM3NSAxLjY3MTg4QzAuOTUzMTI1IDEuODU5MzggMC45NTMxMjUgMi4wOTM3NSAxLjA5Mzc1IDIuMjM0MzhMNi45MDYyNSA4TDEuMDkzNzUgMTMuODEyNUMwLjk1MzEyNSAxMy45NTMxIDAuOTUzMTI1IDE0LjE4NzUgMS4wOTM3NSAxNC4zNzVMMi4xMjUgMTUuNDA2MkMyLjMxMjUgMTUuNTQ2OSAyLjU0Njg4IDE1LjU0NjkgMi42ODc1IDE1LjQwNjJMOC41IDkuNTkzNzVMMTMuMjgxMiAxNC40MjE5TDE0LjI2NTYgMTUuNDA2MkMxNC40MDYyIDE1LjU0NjkgMTQuNjQwNiAxNS41NDY5IDE0LjgyODEgMTUuNDA2MkwxNS44NTk0IDE0LjM3NUMxNiAxNC4xODc1IDE2IDEzLjk1MzEgMTUuODU5NCAxMy44MTI1TDEwLjA0NjkgOFoiIGZpbGw9IiMwMDUyRjMiLz4KPC9zdmc+';

var getStyles = function (_a) {
    var width = _a.width, height = _a.height, modal = _a.modal;
    return "\n  body." + BODY_MODAL_OPEN_CLASS_NAME + " {\n    overflow: hidden;\n  }\n  #" + MODAL_ID + " {\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    background-color: rgba(27, 31, 47, 0.85);\n  }\n  #" + CLOSE_BUTTON_ID + " {\n    border: 0;\n    top: 16px;\n    padding: 0;\n    right: 16px;\n    cursor: pointer;\n    background: none;\n    position: absolute;\n    & img {\n      width: 24px;\n      height: 24px;\n    }\n  }\n  #" + CLOSE_BUTTON_ID + " img {\n    width: 24px;\n    height: 24px;\n  }\n  #" + IFRAME_ID + " {\n    border: 0;\n  }\n  #" + IFRAME_WRAPPER_ID + " {\n    position: relative;\n    width:" + (typeof width === "number" ? width + "px" : width) + ";\n    height:" + (typeof height === "number" ? height + "px" : height) + ";\n  }\n  " + (modal === true
        ? "\n    [" + TARGET_ELEMENT_DATA_ATTR + "] {\n      border-radius: 8px;\n      overflow:hidden;\n    }\n    #" + IFRAME_WRAPPER_ID + " {\n      background: white;\n    }\n    @media all and (max-width: " + MOBILE_BREAKPOINT + ") {\n      [" + TARGET_ELEMENT_DATA_ATTR + "], #" + IFRAME_WRAPPER_ID + " {\n        width: 100%;\n        height: 100%;\n        border-radius: 0;\n      }\n    }\n  "
        : "") + "\n";
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
        style.innerHTML = getStyles({
            width: options.width,
            height: options.height,
            modal: options.modal,
        });
        body.appendChild(style);
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
    NashRamp.prototype.closeModal = function () {
        var body = document.querySelector("body");
        if (body != null) {
            body.className = "" + body.className.replace(BODY_MODAL_OPEN_CLASS_NAME, "");
        }
        var modal = document.getElementById(MODAL_ID);
        if (modal != null) {
            modal.remove();
        }
    };
    return NashRamp;
}());

module.exports = NashRamp;
