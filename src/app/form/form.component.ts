import { Component, OnInit, OnDestroy } from '@angular/core';

import ExchangeSetup from './form.model';
import { Currency } from '../app.model';
import { ExchangeRateStateService } from '../exchange-rate-state.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  activationSubscriber: Subscription;
  isCurrencyFetched = false;
  exchangeSetup: ExchangeSetup;
  saleCurrency: Currency[] = [];
  purchaseCurrency: Currency[] = [];
  saleCurrencySelected: string;
  purchaseCurrencySelected: string;
  isSaleDropdownOpen = false;
  isPurchaseDropdownOpen = false;
  saleInputValue: string | number = '0.00';
  purchaseInputValue: string | number = '0.00';

  constructor(private exchangeRateStateService: ExchangeRateStateService) {}

  ngOnInit(): void {
    this.activationSubscriber =
      this.exchangeRateStateService.activateEmiter.subscribe(
        (didActivate: boolean) => {
          this.isCurrencyFetched = didActivate;
          this.setInitialState();
        }
      );
  }

  ngOndestroy() {
    this.activationSubscriber.unsubscribe();
  }

  setInitialState() {
    this.saleCurrency = this.exchangeRateStateService.saleCurrency;
    this.purchaseCurrency = this.exchangeRateStateService.purchaseCurrency;
    this.setExchangeInitialSetup();
    this.setSelectedCurrency(environment.SELECT_TYPE.SALE);
    this.setSelectedCurrency(environment.SELECT_TYPE.PURCHASE);
  }

  onSaleSelectChange(event: { id: string }) {
    const currency = this.getCurrencyById(
      environment.SELECT_TYPE.PURCHASE,
      event.id
    );

    this.updateSelectedCurrency(
      environment.SELECT_TYPE.SALE,
      currency.code,
      currency.name
    );
    this.updateExgengeSetup(
      environment.SELECT_TYPE.SALE,
      +currency.purchaseRate
    );
    this.toggleSaleDropdownStatus();
    this.exchangeRateStateService.toggleActiveCurrency(
      environment.SELECT_TYPE.SALE,
      currency.code
    );
    this.calculateExchangeResult();
  }

  onPurchaseSelectChange(event: { id: string }) {
    const currency = this.getCurrencyById(
      environment.SELECT_TYPE.PURCHASE,
      event.id
    );

    this.updateSelectedCurrency(
      environment.SELECT_TYPE.PURCHASE,
      currency.code,
      currency.name
    );
    this.updateExgengeSetup(
      environment.SELECT_TYPE.PURCHASE,
      +currency.saleRate
    );
    this.togglePurchaseDropdownStatus();
    this.exchangeRateStateService.toggleActiveCurrency(
      environment.SELECT_TYPE.PURCHASE,
      currency.code
    );
    this.calculateExchangeResult();
  }

  onSaleInputKeyup(event: any) {
    this.saleInputValue = event.target.value;
    this.calculateExchangeResult();
  }

  onPurchaseInputKeyup(event: any) {
    this.purchaseInputValue = event.target.value;
    this.calculateOppositeExchangeResult();
  }

  onSaleInputFocus(event: any) {
    event.target.select();
  }

  onPurchaseInputFocus(event: any) {
    event.target.select();
  }

  onSaleDropdownOpen() {
    this.toggleSaleDropdownStatus();

    if (this.isPurchaseDropdownOpen) {
      this.isPurchaseDropdownOpen = !this.isPurchaseDropdownOpen;
    }
  }

  onPurchaseDropdownOpen() {
    this.togglePurchaseDropdownStatus();

    if (this.isSaleDropdownOpen) {
      this.isSaleDropdownOpen = !this.isSaleDropdownOpen;
    }
  }

  toggleSaleDropdownStatus() {
    this.isSaleDropdownOpen = !this.isSaleDropdownOpen;
  }

  togglePurchaseDropdownStatus() {
    this.isPurchaseDropdownOpen = !this.isPurchaseDropdownOpen;
  }

  calculateExchangeResult() {
    this.purchaseInputValue =
      Math.round(
        ((+this.saleInputValue * this.exchangeSetup.saleRate) /
          this.exchangeSetup.purchaseRate) *
          100
      ) / 100;
  }

  calculateOppositeExchangeResult() {
    this.saleInputValue =
      Math.round(
        ((+this.purchaseInputValue * this.exchangeSetup.purchaseRate) /
          this.exchangeSetup.saleRate) *
          100
      ) / 100;
  }

  setExchangeInitialSetup() {
    const saleActiveCurrency = this.getActiveCurrency(
      environment.SELECT_TYPE.SALE
    );
    const purchaseActiveCurrency = this.getActiveCurrency(
      environment.SELECT_TYPE.PURCHASE
    );

    this.exchangeSetup = new ExchangeSetup(
      saleActiveCurrency.purchaseRate,
      purchaseActiveCurrency.purchaseRate
    );
  }

  updateExgengeSetup(type: string, value: number) {
    this.exchangeSetup[`${type}Rate`] = value;
  }

  setSelectedCurrency(type: string) {
    const currency = this.getActiveCurrency(type);

    this[`${type}CurrencySelected`] = `${currency.code} ${currency.name}`;
  }

  updateSelectedCurrency(type: string, code: string, name: string) {
    this[`${type}CurrencySelected`] = `${code} ${name}`;
  }

  getActiveCurrency(type: string) {
    return this[`${type}Currency`].find(
      (currency: Currency) => currency.isActive === true
    );
  }

  getCurrencyById(type: string, id: string) {
    return this[`${type}Currency`].find(
      (currency: Currency) => currency.code === id
    );
  }
}
