import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBindAncestorClass]'
})
export class BindAncestorClassDirective {
  @Input() appBindAncestorClass: string;
  @Input() ancestorSelector: string;

  @Input() set bindClassWhen(cond: boolean) {
    const parent: HTMLElement = this.host && this.host.nativeElement.closest(this.ancestorSelector);
    if (parent && this.appBindAncestorClass) {
      if (cond) {
        parent.classList.add(this.appBindAncestorClass);
      } else {
        parent.classList.remove(this.appBindAncestorClass);
      }
    }
  }

  constructor(private host: ElementRef) {}
}