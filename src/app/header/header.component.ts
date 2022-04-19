import { Component, OnInit, OnDestroy } from '@angular/core';

import { ExchangeRateStateService } from '../exchange-rate-state.service';

import { Currency } from '../app.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  activationSubscriber: Subscription;
  isCurrencyFetched = false;
  usd: Currency;
  eur: Currency;

  constructor(private exchangeRateStateService: ExchangeRateStateService) {}

  ngOnInit(): void {
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
    this.usd = this.exchangeRateStateService.USD;
    this.eur = this.exchangeRateStateService.EUR;
  }
}
