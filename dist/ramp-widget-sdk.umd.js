(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.NashRamp = factory());
}(this, (function () { 'use strict';

  var envs = {
      LOCAL: "http://localhost:3000",
      PREVIEW: "https://buy-preview.nash.io",
      PRODUCTION: "https://buy.nash.io",
  };
  var IFRAME_WRAPPER_ID = "nash-fiat-ramp-widget-iframe-wrapper";
  var IFRAME_ID = "nash-fiat-ramp-widget-iframe";
  var TARGET_ELEMENT_DATA_ATTR = "data-nash-fiat-ramp-widget";
  var BODY_MODAL_OPEN_CLASS_NAME = "nash-fiat-ramp-widget__modal-open";
  var CUSTOM_VH_CSS_VAR = "--nash-fiat-ramp-widget-vh";
  var STYLE_ELEMENT_ID = "nash-fiat-ramp-widget-style-element";

  var getStyles = function (_a) {
      var width = _a.width, height = _a.height, _b = _a.customVh, customVh = _b === void 0 ? "100%" : _b;
      return "\n  :root {\n    " + CUSTOM_VH_CSS_VAR + ": " + customVh + ";\n  }\n  body." + BODY_MODAL_OPEN_CLASS_NAME + " {\n    overflow: hidden;\n  }\n  #" + IFRAME_ID + " {\n    border: 0;\n  }\n  #" + IFRAME_WRAPPER_ID + " {\n    position: relative;\n    width:" + (typeof width === "number" ? width + "px" : width) + ";\n    height:" + (typeof height === "number" ? height + "px" : height) + ";\n  }\n";
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
      if (typeof document !== "undefined" && typeof window !== "undefined") {
          var customVh = window.innerHeight / 100 + "px";
          var styleEl = document.querySelector("#" + STYLE_ELEMENT_ID);
          if (styleEl != null) {
              styleEl.innerHTML = getStyles(__assign(__assign({}, styleOptions), { customVh: customVh }));
          }
      }
  };

  var NashRamp = /** @class */ (function () {
      function NashRamp(init) {
          this.referrer =
              (init === null || init === void 0 ? void 0 : init.referrer) != null
                  ? init.referrer
                  : typeof window !== "undefined"
                      ? window.location.hostname
                      : undefined;
          this.env = (init === null || init === void 0 ? void 0 : init.env) != null ? init.env : "PRODUCTION";
          this.base = init === null || init === void 0 ? void 0 : init.base;
          this.target = init === null || init === void 0 ? void 0 : init.target;
          this.blockchain = init === null || init === void 0 ? void 0 : init.blockchain;
      }
      NashRamp.prototype.getIframeUrl = function (options) {
          var _a;
          var queryParams = {
              fromSdk: true,
              fiatSymbol: options.base,
              cryptoSymbol: options.target,
              blockchain: (_a = options.blockchain) === null || _a === void 0 ? void 0 : _a.toUpperCase(),
              referrer: options.referrer,
              baseAmount: options.baseAmount,
              targetAmount: options.targetAmount,
              mode: options.mode,
          };
          var origin = envs[this.env];
          var query = stringifyQuery(queryParams);
          return origin + "?" + query;
      };
      /**
       * @param  {{width:number|string;height:number|string;baseAmount:number|string;targetAmount:number|string;mode:`BUY`|`SELL`;}} options
       * @param  {number|string} options.width - Element width (e.g. "100%"; 320; "320px")
       * @param  {number|string} options.height - Element width (e.g. "100%"; 480; "480px")
       * @param  {number|string} options.baseAmount - Initializes the widget with a fixed base amount.
       * @param  {number|string} options.targetAmount - Initializes the widget with a fixed target amount.
       * @param  {`BUY`|`SELL`} options.mode - Initializes the widget on Buy or Sell mode.
       */
      NashRamp.prototype.init = function (options) {
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
              referrer: this.referrer,
              redirect: this.redirect,
              blockchain: this.blockchain,
              baseAmount: options.baseAmount,
              targetAmount: options.targetAmount,
              mode: options.mode,
          });
          /**
           * Target element handling:
           * This is where the iframe is injected.
           */
          // get target element
          var element = document.querySelector("[" + TARGET_ELEMENT_DATA_ATTR + "]");
          if (element != null) {
              // inject wrapper + iframe + close button
              element.innerHTML = "<div id=\"" + IFRAME_WRAPPER_ID + "\"><iframe id=\"" + IFRAME_ID + "\" src=" + iframeUrl + " width=\"100%\" height=\"100%\" allow=\"camera\" allowfullscreen /></div>";
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
      return NashRamp;
  }());

  return NashRamp;

})));
