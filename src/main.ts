import {
  envs,
  TARGET_ELEMENT_DATA_ATTR,
  IFRAME_ID,
  IFRAME_WRAPPER_ID,
  STYLE_ELEMENT_ID,
} from "./constants";
import { WidgetEnvironment } from "./types";
import getStyles from "./assets/styles";
import { setCustomVh, stringifyQuery } from "./utils";

export { IFRAME_ID }

export default class NashRamp {
  referrer: string | undefined;
  referrerName: string | undefined;
  redirect: string | undefined;
  env: WidgetEnvironment | undefined;
  base: string | undefined;
  target: string | undefined;
  blockchain: string | undefined;
  resizeEvent: (() => void) | undefined;

  constructor(init?: {
    referrer?: string;
    env?: WidgetEnvironment;
    base?: string;
    target?: string;
    blockchain?: string;
  }) {
    this.referrer =
      init?.referrer != null
        ? init.referrer
        : typeof window !== "undefined"
        ? window.location.hostname
        : undefined;
    this.env = init?.env != null ? init.env : "PRODUCTION";
    this.base = init?.base;
    this.target = init?.target;
    this.blockchain = init?.blockchain
  }

  getIframeUrl(options: {
    target?: string;
    base?: string;
    referrer?: string;
    redirect?: string;
    blockchain?: string;
    fiatAmount?: number;
  }): string {
    const queryParams: Record<string, any> = {
      fromSdk: true,
      fiatSymbol: options.base,
      cryptoSymbol: options.target,
      blockchain: options.blockchain?.toUpperCase(),
      referrer: options.referrer,
      fiatAmount: options.fiatAmount,
    };
    const origin = envs[this.env!];
    const query = stringifyQuery(queryParams);
    return `${origin}?${query}`;
  }
  /**
   * @param  {{width:number;height:number}} options
   * @param  {number|string} options.width - Element width (e.g. "100%"; 320; "320px")
   * @param  {number|string} options.height - Element width (e.g. "100%"; 480; "480px")
   */
  init(options: {
    width: number | string;
    height: number | string;
    fiatAmount?: number;
  }) {
    // get body
    const body = document.querySelector("body");
    if (body == null) {
      throw new Error("DOM should have a <body />");
    }
    // inject styles
    const style = document.createElement("style");
    style.id = STYLE_ELEMENT_ID;
    const styleProps = {
      width: options.width,
      height: options.height,
    };
    style.innerHTML = getStyles(styleProps);
    body.appendChild(style);
    setCustomVh(styleProps);
    this.resizeEvent = () => setCustomVh(styleProps);
    this.addWindowHeightListener();
    // get iframe url
    const iframeUrl = this.getIframeUrl({
      target: this.target!,
      base: this.base!,
      referrer: this.referrer,
      redirect: this.redirect,
      blockchain: this.blockchain,
      fiatAmount: options.fiatAmount,
    });
    /**
     * Target element handling:
     * This is where the iframe is injected.
     */
    // get target element
    const element = document.querySelector(`[${TARGET_ELEMENT_DATA_ATTR}]`);
    if (element != null) {
      // inject wrapper + iframe + close button
      element.innerHTML = `<div id="${IFRAME_WRAPPER_ID}"><iframe id="${IFRAME_ID}" src=${iframeUrl} width="100%" height="100%" /></div>`;
    }
  }
  addWindowHeightListener() {
    if (typeof window !== "undefined" && this.resizeEvent != null) {
      window.addEventListener("resize", this.resizeEvent);
    }
  }
  removeWindowHeightListener() {
    if (typeof window !== "undefined" && this.resizeEvent != null) {
      window.removeEventListener("resize", this.resizeEvent);
    }
  }
}
