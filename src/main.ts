import { GRAPHQL_API, NASH_CREATE_PURCHASE_URL } from "./constants";
import { FiatRampRate } from "./types";

export default class NashRamp {
  rates: FiatRampRate[] | undefined;
  referrer: string | undefined;
  redirect: string | undefined;
  constructor(init: { referrer?: string; redirect?: string }) {
    this.referrer = init.referrer;
    this.redirect = init.redirect;
  }
  /**
   * @param  {string} fiatSymbol - The fiat currency used to get the rates (e.g. "EUR")
   * @returns Promise
   */
  async getRates(fiatSymbol: string): Promise<FiatRampRate[] | void> {
    try {
      const response = await fetch(GRAPHQL_API, {
        method: "POST",
        body: `{\"query\":\"query getRates($fiatSymbol: String) {\\n  fiatRampRatesAndAssets(fiatSymbol: $fiatSymbol, settlementType: PERSONAL_WALLET, side: BUY) {\\n    name\\n    minPurchaseAmount {\\n      amount\\n      currency\\n    }\\n    purchaseFiatPrice {\\n      price {\\n        amount\\n        currencyA\\n        currencyB\\n      }\\n    }\\n    saleFiatPrice {\\n      price {\\n        amount\\n        currencyA\\n        currencyB\\n      }\\n    }\\n  }\\n}\",\"variables\":{\"fiatSymbol\":\"${fiatSymbol}\"},\"operationName\":\"getRates\"}`,
      });
      const result = JSON.parse(await response.json());
      const ratesResult = result.data.fiatRampRatesAndAssets as FiatRampRate[];
      this.rates = ratesResult;
      return ratesResult;
    } catch (e) {
      console.error("Could not get rates", e);
    }
  }
  /**
   * @param  {Object} options - Options
   * @param  {string} options.target - The crypto currency to be purchased (e.g. "BTC")
   * @param  {string} options.base - The fiat currency used to purchase (e.g. "EUR")
   * @param  {number} options.amount - The fiat amount to be spent (e.g. 100)
   * @param  {string} options.destination - The destination where the purchased crytpo will be sent to (e.g. "PERSONAL_WALLET")
   * @returns string
   */
  getPurchaseUrl(options: {
    target: string;
    base: string;
    amount: number;
    destination: string;
  }) {
    const { target, base, amount, destination } = options;
    return `${NASH_CREATE_PURCHASE_URL}?target=${target}&base=${base}&amount=${amount}&destination=${destination}${
      this.referrer != null ? `referrer=${this.referrer}` : ""
    }${this.redirect != null ? `redirect=${encodeURI(this.redirect)}` : ""}`;
  }
}
