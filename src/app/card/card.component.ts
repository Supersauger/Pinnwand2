import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `<div>Card: {{'test'}}</div>`,
  styleUrls: ['./card.component.css'],
  styles: [`
  :host {
    display: block;
    padding: 32px;
    border: 1px solid black;
    border-radius: 8px;
  }
  `]
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
