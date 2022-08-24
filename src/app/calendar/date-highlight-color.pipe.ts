import { Pipe, PipeTransform } from '@angular/core';

interface TemplateDate {
  day: number,
  month: number,
  year: number
}

@Pipe({
  name: 'dateHighlightColor'
})
export class DateHighlightColor implements PipeTransform {
  transform({ day, month, year }: TemplateDate, highlights: Array<{ date: Date, color: string }>): string {
    const highlight = highlights.find(({ date }) => {
      return year === date.getFullYear() && month === date.getMonth() && day === date.getDate();
    });
    return highlight ? highlight.color : '';
  }
}