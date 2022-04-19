import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExchangeRateStateService } from './exchange-rate-state.service';
import { FetchServise } from './fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ExchangeRateStateService, FetchServise],
})
export class AppComponent implements OnInit {
  errorSubscribe: Subscription;
  error = '';

  constructor(private fetchService: FetchServise) {}

  ngOnInit(): void {
    this.fetchService.fetchRates();

    this.errorSubscribe = this.fetchService.error.subscribe(
      (catchedError: string) => {
        this.error = catchedError;
      }
    );
  }

  ngOnDestroy() {
    this.errorSubscribe.unsubscribe();
  }
}
