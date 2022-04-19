export interface FetchedCurrency {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

export class Currency {
  constructor(
    public code: string,
    public name: string,
    public saleRate: number,
    public purchaseRate: number,
    public isActive: boolean,
    public order: number
  ) {}
}

export enum CURRENCY_ORDER {
  UAH = 1,
  EUR,
  USD,
  GBP,
  PLN,
  PLZ,
  CZK,
  CHF,
  SEK,
  CAD,
  BTC,
  RUR,
}
