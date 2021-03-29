import { envs } from "./constants";
import { WidgetEnvironment } from "./types";

export default class NashRamp {
  destination: string | undefined;
  referrer: string | undefined;
  redirect: string | undefined;
  env: WidgetEnvironment | undefined;
  base: string | undefined;
  target: string | undefined;
  constructor(init: {
    referrer?: string;
    redirect?: string;
    env: WidgetEnvironment;
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
    this.referrer = init.referrer;
    this.redirect = init.redirect;
    this.env = init.env;
    this.destination = init.destination;
    this.base = init.base;
    this.target = init.target;
  }

  getIframeUrl(options: {
    target: string;
    base: string;
    destination: string;
    referrer?: string;
    redirect?: string;
  }): string {
    return `${envs[this.env!]}?fromSdk=true&fiatSymbol=${
      options.base
    }&cryptoSymbol=${options.target}&destination=${options.destination}${
      options.referrer != null ? `&referrer=${options.referrer}` : ""
    }${
      options.redirect != null ? `&redirect=${encodeURI(options.redirect)}` : ""
    }`;
  }
  /**
   * @param  {{width:number;height:number}} options
   * @param  {number|string} options.width - Element width (e.g. "100%"; 320; "320px")
   * @param  {number|string} options.height - Element width (e.g. "100%"; 480; "480px")
   */
  init(options: { width: number | string; height: number | string }) {
    const iframeUrl = this.getIframeUrl({
      target: this.target!,
      base: this.base!,
      destination: this.destination!,
    });
    const element = document.querySelector(`[data-nash-fiat-ramp]`);
    if (element != null) {
      element.innerHTML = `<iframe style="border:0;" src=${iframeUrl} width="${options.width}" height="${options.height}" />`;
    }
  }
}
