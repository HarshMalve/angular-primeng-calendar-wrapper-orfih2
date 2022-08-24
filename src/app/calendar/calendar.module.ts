import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { CalendarComponent } from './calendar.component';
import { DateHighlightColor } from './date-highlight-color.pipe';
import { LetDirective } from './let.directive';
import { BindAncestorClassDirective } from './bind-ancestor-class.directive';
import { CalendarMaskDirective } from './calendar-mask.directive';

@NgModule({
  imports: [CommonModule, FormsModule, PrimeNgCalendarModule],
  declarations: [CalendarComponent, DateHighlightColor, LetDirective, BindAncestorClassDirective, CalendarMaskDirective],
  exports: [CalendarComponent],
})
export class CalendarModule { }