import { WidgetEnvironment } from "./types";

export const GRAPHQL_API = "http://app.nash.io/api/graphql";

export const NASH_CREATE_PURCHASE_URL =
  "https://nash.io/app/create-base-purchase";

export const envs: Record<WidgetEnvironment, string> = {
  LOCAL: "http://localhost:3000",
  PRODUCTION: "http://widget.nash.io",
};
