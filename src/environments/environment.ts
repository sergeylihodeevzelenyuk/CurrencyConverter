// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL: 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11',

  CURRENCY_CODE: {
    USD: 'USD',
    EUR: 'EUR',
    CHF: 'CHF',
    GBP: 'GBP',
    PLN: 'PLN',
    PLZ: 'PLZ',
    SEK: 'SEK',
    CAD: 'CAD',
    CZK: 'CZK',
    UAH: 'UAH',
    BTC: 'BTC',
    RUR: 'RUR',
  },

  CURRENCY_NAME: {
    USD: 'Долар США',
    EUR: 'Євро',
    CHF: 'Швейцарський Франк',
    GBP: 'Британський Фунт',
    PLN: 'Польський Злотий',
    PLZ: 'Польський Злотий',
    SEK: 'Шведська Крона',
    CAD: 'Канадський Долар',
    CZK: 'Чеська Крона',
    UAH: 'Українська гривня',
    BTC: 'Биткойн',
    RUR: 'Военный корабль',
  },

  SELECT_TYPE: {
    SALE: 'sale',
    PURCHASE: 'purchase',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
