var envs = {
    LOCAL: "http://localhost:3000",
    PRODUCTION: "https://buy.nash.io",
};

var closeButton = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjA0NjkgOEwxNC44NzUgMy4yMTg3NUwxNS44NTk0IDIuMjM0MzhDMTYgMi4wOTM3NSAxNiAxLjg1OTM4IDE1Ljg1OTQgMS42NzE4OEwxNC44MjgxIDAuNjQwNjI1QzE0LjY0MDYgMC41IDE0LjQwNjIgMC41IDE0LjI2NTYgMC42NDA2MjVMOC41IDYuNDUzMTJMMi42ODc1IDAuNjQwNjI1QzIuNTQ2ODggMC41IDIuMzEyNSAwLjUgMi4xMjUgMC42NDA2MjVMMS4wOTM3NSAxLjY3MTg4QzAuOTUzMTI1IDEuODU5MzggMC45NTMxMjUgMi4wOTM3NSAxLjA5Mzc1IDIuMjM0MzhMNi45MDYyNSA4TDEuMDkzNzUgMTMuODEyNUMwLjk1MzEyNSAxMy45NTMxIDAuOTUzMTI1IDE0LjE4NzUgMS4wOTM3NSAxNC4zNzVMMi4xMjUgMTUuNDA2MkMyLjMxMjUgMTUuNTQ2OSAyLjU0Njg4IDE1LjU0NjkgMi42ODc1IDE1LjQwNjJMOC41IDkuNTkzNzVMMTMuMjgxMiAxNC40MjE5TDE0LjI2NTYgMTUuNDA2MkMxNC40MDYyIDE1LjU0NjkgMTQuNjQwNiAxNS41NDY5IDE0LjgyODEgMTUuNDA2MkwxNS44NTk0IDE0LjM3NUMxNiAxNC4xODc1IDE2IDEzLjk1MzEgMTUuODU5NCAxMy44MTI1TDEwLjA0NjkgOFoiIGZpbGw9IiMwMDUyRjMiLz4KPC9zdmc+';

var NashRamp = /** @class */ (function () {
    function NashRamp(init) {
        var _a, _b;
        if (init.target == null) {
            throw new Error("Please provide the `target` (crypto) parameter");
        }
        if (init.base == null) {
            throw new Error("Please provide the `base` (fiat) parameter");
        }
        if (init.destination == null) {
            throw new Error("Please provide the `destination` (wallet address) parameter");
        }
        this.referrer =
            ((_a = init.referrer) !== null && _a !== void 0 ? _a : typeof window !== "undefined")
                ? window.location.hostname
                : undefined;
        this.referrerName = init.referrer;
        this.redirect = init.redirect;
        this.env = (_b = init.env) !== null && _b !== void 0 ? _b : "PRODUCTION";
        this.destination = init.destination;
        this.base = init.base;
        this.target = init.target;
    }
    NashRamp.prototype.getIframeUrl = function (options) {
        return envs[this.env] + "?fromSdk=true&fiatSymbol=" + options.base + "&cryptoSymbol=" + options.target + "&destination=" + options.destination + (options.referrer != null ? "&referrer=" + options.referrer : "") + (options.referrerName != null
            ? "&referrerName=" + options.referrerName
            : "") + (options.redirect != null ? "&redirect=" + encodeURI(options.redirect) : "");
    };
    /**
     * @param  {{width:number;height:number}} options
     * @param  {number|string} options.width - Element width (e.g. "100%"; 320; "320px")
     * @param  {number|string} options.height - Element width (e.g. "100%"; 480; "480px")
     * @callback onClose - Function to be called when the close button is clicked
     */
    NashRamp.prototype.init = function (options) {
        var iframeUrl = this.getIframeUrl({
            target: this.target,
            base: this.base,
            destination: this.destination,
        });
        var element = document.querySelector("[data-nash-fiat-ramp-widget]");
        if (element != null) {
            element.innerHTML = "<div style=\"position:relative;width:" + (typeof options.width === "number" ? options.width + "px" : options.width) + ";height:" + (typeof options.height === "number"
                ? options.height + "px"
                : options.height) + ";\">" + (options.onClose != null
                ? "<button data-nash-fiat-ramp-widget-close-button style=\"cursor:pointer;background:none;border:0;padding:0;position:absolute;right:16px;top:16px;\"><img src=\"" + closeButton + "\" style=\"width:24px;height:24px;\" /></button>"
                : "") + "<iframe style=\"border:0;\" src=" + iframeUrl + " width=\"100%\" height=\"100%\" /></div>";
            if (options.onClose != null) {
                var closeButton_1 = document.querySelector("[data-nash-fiat-ramp]");
                closeButton_1 === null || closeButton_1 === void 0 ? void 0 : closeButton_1.addEventListener("click", options.onClose);
            }
        }
    };
    return NashRamp;
}());

export default NashRamp;
