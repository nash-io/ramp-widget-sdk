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
    });
    getIframeUrl(options: {
        target: string;
        base: string;
        destination: string;
        referrer?: string;
        redirect?: string;
    }): string;
    /**
     * @param  {{width:number;height:number}} options
     * @param  {number|string} options.width - Element width (e.g. "100%"; 320; "320px")
     * @param  {number|string} options.height - Element width (e.g. "100%"; 480; "480px")
     */
    init(options: {
        width: number | string;
        height: number | string;
        onClose?: () => void;
    }): void;
}
