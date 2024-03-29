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
    baseAmount?: number | string;
    targetAmount?: number | string;
    mode?: string;
  }): string {
    const queryParams: Record<string, any> = {
      fromSdk: true,
      fiatSymbol: options.base,
      cryptoSymbol: options.target,
      blockchain: options.blockchain?.toUpperCase(),
      referrer: options.referrer,
      baseAmount: options.baseAmount,
      targetAmount: options.targetAmount,
      mode: options.mode,
    };
    const origin = envs[this.env!];
    const query = stringifyQuery(queryParams);
    return `${origin}?${query}`;
  }
  /**
   * @param  {{width:number|string;height:number|string;baseAmount:number|string;targetAmount:number|string;mode:`BUY`|`SELL`;}} options
   * @param  {number|string} options.width - Element width (e.g. "100%"; 320; "320px")
   * @param  {number|string} options.height - Element width (e.g. "100%"; 480; "480px")
   * @param  {number|string} options.baseAmount - Initializes the widget with a fixed base amount.
   * @param  {number|string} options.targetAmount - Initializes the widget with a fixed target amount.
   * @param  {`BUY`|`SELL`} options.mode - Initializes the widget on Buy or Sell mode.
   */
  init(options: {
    width: number | string;
    height: number | string;
    baseAmount?: number | string;
    targetAmount?: number | string;
    mode?: 'BUY'|'SELL';
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
      baseAmount: options.baseAmount,
      targetAmount: options.targetAmount,
      mode: options.mode,
    });
    /**
     * Target element handling:
     * This is where the iframe is injected.
     */
    // get target element
    const element = document.querySelector(`[${TARGET_ELEMENT_DATA_ATTR}]`);
    if (element != null) {
      // inject wrapper + iframe + close button
      element.innerHTML = `<div id="${IFRAME_WRAPPER_ID}"><iframe id="${IFRAME_ID}" src=${iframeUrl} width="100%" height="100%" allow="camera" allowfullscreen /></div>`;
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
