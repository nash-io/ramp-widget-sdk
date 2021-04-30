import { CLOSE_BUTTON_ID, envs, MODAL_ID, TARGET_ELEMENT_DATA_ATTR, IFRAME_ID, IFRAME_WRAPPER_ID, BODY_MODAL_OPEN_CLASS_NAME, STYLE_ELEMENT_ID, } from "./constants";
import closeButton from "./assets/close-button.svg";
import getStyles from "./assets/styles";
import { setCustomVh, stringifyQuery } from "./utils";
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
export default NashRamp;
