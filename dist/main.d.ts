import { IFRAME_ID } from "./constants";
import { WidgetEnvironment } from "./types";
export { IFRAME_ID };
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
    });
    getIframeUrl(options: {
        target?: string;
        base?: string;
        referrer?: string;
        redirect?: string;
        blockchain?: string;
        fiatAmount?: number;
    }): string;
    /**
     * @param  {{width:number;height:number}} options
     * @param  {number|string} options.width - Element width (e.g. "100%"; 320; "320px")
     * @param  {number|string} options.height - Element width (e.g. "100%"; 480; "480px")
     */
    init(options: {
        width: number | string;
        height: number | string;
        fiatAmount?: number;
    }): void;
    addWindowHeightListener(): void;
    removeWindowHeightListener(): void;
}
