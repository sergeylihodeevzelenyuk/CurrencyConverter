export const environment = {
  production: true,
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
