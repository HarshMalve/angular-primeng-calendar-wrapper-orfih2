import { Component, forwardRef, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]
})
export class CalendarComponent implements ControlValueAccessor {

  @ViewChild('calendar') _calendar: Calendar;

  _fr = {
    firstDayOfWeek: 0,
    dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    dayNamesMin: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    monthNames: [ "Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre" ],
    monthNamesShort: [ "Jan", "Fév", "Mar", "Avr", "Mai", "Juin","Juil", "Août", "Sep", "Oct", "Nov", "Déc" ],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'yyyy-mm-dd'
  };

  @Input() id: string = undefined;
  @Input() required = false;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() monthNavigation = false;
  @Input() yearNavigation = false;
  @Input() yearRange = '2000:2030';
  @Input() displayMode: 'time' | 'date' | 'both' = 'date';
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() disabledDates: Array<Date> = [];
  @Input() disabledDays: Array<number> = [];
  @Input() highlightedDates: Array<{ date: Date, color: string }> = [];

  private onChange = [(_: Date) => {}];
  private onTouch = [() => {}];

  @Input()
  get value(): Date {
    return this._value;
  }
  set value(value: Date) {
    if (value !== this._value) {
      this._value = value;
      this.onChange.forEach(fn => fn(value));
    }
  }
  private _value: Date = undefined;

  @Output() valueChange = new EventEmitter<Date>();

  registerOnChange(fn: any): void {
    this.onChange.push(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouch.push(fn);
  }

  writeValue(value: Date): void {
    this.value = value;
  }

  _focus(): void {
    setTimeout(() => this._calendar.showOverlay())
  }

  _onInputBlur = ((e) => {
    console.log(e.target.value)
    this._calendar.onUserInput(e);
    console.log('blur')
  }).bind(this);
}