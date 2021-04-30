import {
  CLOSE_BUTTON_ID,
  envs,
  MODAL_ID,
  TARGET_ELEMENT_DATA_ATTR,
  IFRAME_ID,
  IFRAME_WRAPPER_ID,
  BODY_MODAL_OPEN_CLASS_NAME,
  STYLE_ELEMENT_ID,
} from "./constants";
import { WidgetEnvironment } from "./types";
import closeButton from "./assets/close-button.svg";
import getStyles from "./assets/styles";
import { setCustomVh, stringifyQuery } from "./utils";
export default class NashRamp {
  destination: string | undefined;
  referrer: string | undefined;
  referrerName: string | undefined;
  redirect: string | undefined;
  env: WidgetEnvironment | undefined;
  base: string | undefined;
  target: string | undefined;
  resizeEvent: (() => void) | undefined;

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

  getIframeUrl(options: {
    target: string;
    base: string;
    destination: string;
    referrer?: string;
    referrerName?: string;
    redirect?: string;
    fiatAmount?: number;
  }): string {
    const queryParams: Record<string, any> = {
      fromSdk: true,
      fiatSymbol: options.base,
      cryptoSymbol: options.target,
      destination: options.destination,
      referrer: options.referrer,
      referrerName: options.referrerName,
      redirect:
        options.redirect != null ? encodeURI(options.redirect) : undefined,
    };
    const origin = envs[this.env!];
    const query = stringifyQuery(queryParams);
    return `${origin}?${query}`;
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
    mobileBreakpoint?: string;
    modal?: boolean;
    fiatAmount?: number;
    onClose?: () => void;
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
      modal: options.modal,
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
      destination: this.destination!,
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
      const modalWrapper = document.createElement("div");
      modalWrapper.innerHTML = `<div id="${MODAL_ID}"><div ${TARGET_ELEMENT_DATA_ATTR} /></div>`;
      body.appendChild(modalWrapper);
      /* add click handler to close modal when clicked outside */
      modalWrapper.onclick = () => {
        if (options.onClose != null) {
          options.onClose();
        }
        this.closeModal();
      };
      /* add "modal-open" className to body */
      body.className = `${body.className} ${BODY_MODAL_OPEN_CLASS_NAME}`;
    }
    /**
     * Target element handling:
     * This is where the iframe is injected.
     * If `onClose` is provided or `modal === true`, a close button is rendered over the element.
     */
    const shouldRenderCloseButton =
      options.onClose != null || options.modal === true;
    // get target element
    const element = document.querySelector(`[${TARGET_ELEMENT_DATA_ATTR}]`);
    if (element != null) {
      // inject wrapper + iframe + close button
      element.innerHTML = `<div id="${IFRAME_WRAPPER_ID}">${
        shouldRenderCloseButton
          ? `<button id="${CLOSE_BUTTON_ID}"><img src="${closeButton}"/></button>`
          : ""
      }<iframe id="${IFRAME_ID}" src=${iframeUrl} width="100%" height="100%" /></div>`;
      // handle close button click event
      if (shouldRenderCloseButton) {
        const closeButton = document.getElementById(CLOSE_BUTTON_ID);
        if (closeButton != null) {
          closeButton.onclick = () => {
            if (options.onClose != null) {
              options.onClose();
            }
            this.closeModal();
          };
        }
      }
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
  closeModal() {
    this.removeWindowHeightListener();
    const body = document.querySelector("body");
    const style = document.querySelector(`#${STYLE_ELEMENT_ID}`);
    if (body != null) {
      body.className = `${body.className.replace(
        BODY_MODAL_OPEN_CLASS_NAME,
        ""
      )}`;
    }
    if (style != null) {
      style.remove();
    }
    const modal = document.getElementById(MODAL_ID);
    if (modal != null) {
      modal.remove();
    }
  }
}
