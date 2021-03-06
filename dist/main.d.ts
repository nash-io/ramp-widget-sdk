import { WidgetEnvironment } from "./types";
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
    });
    getIframeUrl(options: {
        target: string;
        base: string;
        destination: string;
        referrer?: string;
        referrerName?: string;
        redirect?: string;
        fiatAmount?: number;
    }): string;
    /**
     * @param  {{width:number;height:number}} options
     * @param  {number|string} options.width - Element width (e.g. "100%"; 320; "320px")
     * @param  {number|string} options.height - Element width (e.g. "100%"; 480; "480px")
     * @callback onClose - Function to be called when the close button is clicked
     */
    init(options: {
        width: number | string;
        height: number | string;
        modal?: boolean;
        fiatAmount?: number;
        onClose?: () => void;
    }): void;
    addWindowHeightListener(): void;
    removeWindowHeightListener(): void;
    closeModal(): void;
}
