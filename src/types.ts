export interface FiatRampRate {
  name: string;
  minPurchaseAmount: {
    amount: number;
    currency: string;
  };
  purchaseFiatPrice: {
    price: {
      amount: Number;
      currencyA: string;
      currencyB: string;
    };
  };
}
