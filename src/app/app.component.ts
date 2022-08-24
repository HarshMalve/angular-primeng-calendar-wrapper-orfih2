import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  value = new Date();
  highlights = [
    { date: new Date(2022, 8, 18), color: 'red' },
    { date: new Date(2019, 2, 10), color: 'orange' },
    { date: new Date(2019, 2, 13), color: 'aqua' },
    { date: new Date(), color: 'teal' },
    { date: new Date(2019, 2, 29), color: 'green' },
  ];
  min = new Date(2019, 0, 1);
  max = new Date();
  disabled = [new Date(2019, 2, 13), new Date(2019, 2, 2)];
}
