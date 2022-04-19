import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ExchangeRateStateService } from './exchange-rate-state.service';
import { FetchedCurrency } from './app.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FetchServise {
  error = new Subject<string>();

  constructor(
    private exchangeRateStateService: ExchangeRateStateService,
    private http: HttpClient
  ) {}

  fetchRates() {
    {
      this.http
        .get<FetchedCurrency[]>(environment.URL)
        .pipe(
          map((responceData) =>
            this.exchangeRateStateService.modifyCurrency(responceData)
          )
        )
        .subscribe(
          (currency) => {
            this.exchangeRateStateService.fillTargetArr(
              this.exchangeRateStateService.availableCurrency,
              currency
            );
            this.exchangeRateStateService.setInitialState();
            this.exchangeRateStateService.activateEmiter.next(true);
          },
          (error) => {
            this.error.next(error.statusText);
          }
        );
    }
  }
}
