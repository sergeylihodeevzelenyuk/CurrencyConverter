import { Component, Input, OnInit } from '@angular/core';

import { FetchServise } from '../fetch.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() error: '';

  constructor(private fetchService: FetchServise) {}

  ngOnInit(): void {}
}
