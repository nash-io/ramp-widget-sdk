import { WidgetEnvironment } from "./types";
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
        baseAmount?: number | string;
        targetAmount?: number | string;
        mode?: string;
    }): string;
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
        mode?: 'BUY' | 'SELL';
    }): void;
    addWindowHeightListener(): void;
    removeWindowHeightListener(): void;
}
