import { envs } from "./constants";
import { WidgetEnvironment } from "./types";
import closeButton from "./assets/close-button.svg";
export default class NashRamp {
  destination: string | undefined;
  referrer: string | undefined;
  referrerName: string | undefined;
  redirect: string | undefined;
  env: WidgetEnvironment | undefined;
  base: string | undefined;
  target: string | undefined;
  constructor(init: {
    referrer?: string;
    referrerName?: string;
    redirect?: string;
    env?: WidgetEnvironment;
    base: string;
    target: string;
    destination: string;
  }) {
    if (init.target == null) {
      throw new Error("Please provide the `target` (crypto) parameter");
    }
    if (init.base == null) {
      throw new Error("Please provide the `base` (fiat) parameter");
    }
    if (init.destination == null) {
      throw new Error(
        "Please provide the `destination` (wallet address) parameter"
      );
    }
    this.referrer =
      init.referrer ?? typeof window !== "undefined"
        ? window.location.hostname
        : undefined;
    this.referrerName = init.referrer;
    this.redirect = init.redirect;
    this.env = init.env ?? "PRODUCTION";
    this.destination = init.destination;
    this.base = init.base;
    this.target = init.target;
  }

  getIframeUrl(options: {
    target: string;
    base: string;
    destination: string;
    referrer?: string;
    referrerName?: string;
    redirect?: string;
    fiatAmount?: number;
  }): string {
    return `${envs[this.env!]}?fromSdk=true&fiatSymbol=${
      options.base
    }&cryptoSymbol=${options.target}&destination=${options.destination}${
      options.fiatAmount != null ? `&fiatAmount=${options.fiatAmount}` : ""
    }${options.referrer != null ? `&referrer=${options.referrer}` : ""}${
      options.referrerName != null
        ? `&referrerName=${options.referrerName}`
        : ""
    }${
      options.redirect != null ? `&redirect=${encodeURI(options.redirect)}` : ""
    }`;
  }
  /**
   * @param  {{width:number;height:number}} options
   * @param  {number|string} options.width - Element width (e.g. "100%"; 320; "320px")
   * @param  {number|string} options.height - Element width (e.g. "100%"; 480; "480px")
   * @callback onClose - Function to be called when the close button is clicked
   */
  init(options: {
    width: number | string;
    height: number | string;
    fiatAmount?: number;
    onClose?: () => void;
  }) {
    const iframeUrl = this.getIframeUrl({
      target: this.target!,
      base: this.base!,
      destination: this.destination!,
      fiatAmount,
    });
    const element = document.querySelector(`[data-nash-fiat-ramp-widget]`);
    if (element != null) {
      element.innerHTML = `<div style="position:relative;width:${
        typeof options.width === "number" ? options.width + "px" : options.width
      };height:${
        typeof options.height === "number"
          ? options.height + "px"
          : options.height
      };">${
        options.onClose != null
          ? `<button data-nash-fiat-ramp-widget-close-button style="cursor:pointer;background:none;border:0;padding:0;position:absolute;right:16px;top:16px;"><img src="${closeButton}" style="width:24px;height:24px;" /></button>`
          : ""
      }<iframe style="border:0;" src=${iframeUrl} width="100%" height="100%" /></div>`;
      if (options.onClose != null) {
        const closeButton = document.querySelector(`[data-nash-fiat-ramp]`);
        closeButton?.addEventListener("click", options.onClose);
      }
    }
  }
}
