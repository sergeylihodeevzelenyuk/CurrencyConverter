import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-arrow',
  templateUrl: './svg-arrow.component.html',
  styleUrls: ['./svg-arrow.component.css'],
})
export class SvgArrowComponent implements OnInit {
  @Input() active: boolean;

  constructor() {}

  ngOnInit(): void {}
}
