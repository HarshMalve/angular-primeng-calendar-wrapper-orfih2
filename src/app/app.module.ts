import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from './calendar/calendar.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, CalendarModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
