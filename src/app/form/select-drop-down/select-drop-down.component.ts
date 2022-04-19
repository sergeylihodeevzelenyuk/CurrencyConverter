import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from 'src/app/app.model';

@Component({
  selector: 'app-select-drop-down',
  templateUrl: './select-drop-down.component.html',
  styleUrls: ['./select-drop-down.component.css'],
})
export class SelectDropDownComponent {
  @Input() isDropdownOpen: boolean;
  @Input() currencyList: Currency[];

  @Output() currencySelected = new EventEmitter<{ id: string }>();

  onSelectChange(event: any) {
    this.currencySelected.emit({ id: event.target.id });
  }
}
