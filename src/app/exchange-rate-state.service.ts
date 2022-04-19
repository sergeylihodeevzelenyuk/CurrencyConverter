import { Subject } from 'rxjs';

import { Currency, FetchedCurrency, CURRENCY_ORDER } from './app.model';

import { environment } from 'src/environments/environment';

export class ExchangeRateStateService {
  activateEmiter = new Subject<boolean>();
  availableCurrency: Currency[] = [
    new Currency(
      environment.CURRENCY_CODE.UAH,
      environment.CURRENCY_NAME[environment.CURRENCY_CODE.UAH],
      1,
      1,
      false,
      CURRENCY_ORDER[environment.CURRENCY_CODE.UAH]
    ),
  ];
  saleCurrency: Currency[] = [];
  purchaseCurrency: Currency[] = [];
  USD: Currency;
  EUR: Currency;
  isFatching: boolean;

  setInitialState() {
    this.sortAvailableCurrency();
    this.setInitialRateSetup(this.saleCurrency, environment.CURRENCY_CODE.USD);
    this.setInitialRateSetup(
      this.purchaseCurrency,
      environment.CURRENCY_CODE.UAH
    );
    this.setPopularCurrency(environment.CURRENCY_CODE.USD);
    this.setPopularCurrency(environment.CURRENCY_CODE.EUR);
  }

  setInitialRateSetup(target: Currency[], ID: string) {
    this.fillTargetArr(target, this.availableCurrency);
    this.setActiveCurrency(target, ID);
  }

  setPopularCurrency(id: string) {
    this[id] = this.availableCurrency.find((item) => item.code === id);
  }

  toggleActiveCurrency(selectType: string, id: string) {
    this[`${selectType}Currency`].forEach((currency: Currency) =>
      currency.code === id
        ? (currency.isActive = true)
        : (currency.isActive = false)
    );
  }

  sortAvailableCurrency() {
    this.availableCurrency.sort((itemA, itemB) => itemA.order - itemB.order);
  }

  fillTargetArr(target: Currency[], currency: Currency[]) {
    currency.forEach((item) => target.push({ ...item }));
  }

  setActiveCurrency(target: Currency[], ID: string) {
    for (let currency of target) {
      if (currency.code === ID) {
        currency.isActive = true;
      }
    }
  }

  modifyCurrency(fetchedCurrency: FetchedCurrency[]) {
    this.editRateWithBaseUSD(fetchedCurrency);

    const availableCurrency = [];

    fetchedCurrency.forEach((item) =>
      availableCurrency.push(
        new Currency(
          item.ccy,
          environment.CURRENCY_NAME[item.ccy]
            ? environment.CURRENCY_NAME[item.ccy]
            : item.ccy,
          +item.sale,
          +item.buy,
          false,
          +CURRENCY_ORDER[environment.CURRENCY_CODE[item.ccy]]
        )
      )
    );

    return availableCurrency;
  }

  editRateWithBaseUSD(currency: FetchedCurrency[]) {
    const usd = currency.find(
      (item) => item.ccy === environment.CURRENCY_CODE.USD
    );

    for (let item of currency) {
      if (item.base_ccy === environment.CURRENCY_CODE.USD) {
        item.sale = String(+item.sale * +usd.sale);
        item.buy = String(+item.buy * +usd.buy);
      }
    }
  }
}
