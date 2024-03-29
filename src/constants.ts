import { WidgetEnvironment } from "./types";

export const GRAPHQL_API = "http://app.nash.io/api/graphql";

export const NASH_CREATE_PURCHASE_URL =
  "https://nash.io/app/create-base-purchase";

export const envs: Record<WidgetEnvironment, string> = {
  LOCAL: "http://localhost:3000",
  PREVIEW: "https://buy-preview.nash.io",
  PRODUCTION: "https://buy.nash.io",
};

export const IFRAME_WRAPPER_ID = "nash-fiat-ramp-widget-iframe-wrapper";

export const IFRAME_ID = "nash-fiat-ramp-widget-iframe";

export const TARGET_ELEMENT_DATA_ATTR = "data-nash-fiat-ramp-widget";

export const BODY_MODAL_OPEN_CLASS_NAME = "nash-fiat-ramp-widget__modal-open";

export const MOBILE_BREAKPOINT = "495px";

export const CUSTOM_VH_CSS_VAR = "--nash-fiat-ramp-widget-vh";

export const STYLE_ELEMENT_ID = "nash-fiat-ramp-widget-style-element";
