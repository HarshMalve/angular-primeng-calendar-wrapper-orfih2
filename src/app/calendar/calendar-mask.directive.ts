import { Directive, ElementRef, AfterViewInit, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[calendarMask]'
})
export class CalendarMaskDirective {

  private input: HTMLInputElement;
  private slotChar = 'YYYY-MM-DD';
  @Input() onInputBlur: Function = () => {};
  private value = '';

  constructor(private host: ElementRef) { }

  ngAfterViewInit(): void {
    this.input = (this.host.nativeElement as HTMLElement).querySelector('input[type="text"]');
    this.input.addEventListener('keydown', this.onKeydown.bind(this));
    this.input.addEventListener('focus', this.onFocus.bind(this));
    this.input.addEventListener('blur', (e) => {
      console.log('blur', this.input.value, this.value)
      this.input.value = this.value;
      setTimeout(() => this.input.value = this.value);
      this.onInputBlur({ target: this.input })
    });
  }

  public onFocus(): void {
    if (!this.input.value) {
      this.input.value = this.slotChar;
      this.value = this.slotChar;
      setTimeout(() => {
        this.input.selectionStart = 0;
        this.input.selectionEnd = 0;
      })
    }
  }

  public onKeydown(event: KeyboardEvent): void {
    const { key, keyCode } = event;
    if (this.isSpecialOperation(event) || (!this.isKeyPrintable(event) && keyCode !== 8)) {
      return;
    }
    const target = event.target as HTMLInputElement;
    if (keyCode === 8) {
      const start = target.selectionStart > 0 ? target.selectionStart - 1 : 0;
      const value = target.value.split('');
      value[start] = this.slotChar[start];
      target.value = value.join('');
      target.selectionStart = start;
      target.selectionEnd = start;
      this.value = this.input.value;
      event.preventDefault();
      return;
    }
    if ((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 112)) {
      console.log(target.selectionStart)
      if (!target.value) {
        target.value = this.slotChar;
        target.selectionStart = 0;
        target.selectionEnd = 0;
        this.value = this.input.value;
      }
      let { selectionStart } = target;

      if (selectionStart >= this.slotChar.length) {
        event.preventDefault();
        return;
      }

      const value = target.value.split('');
      if (!!value[selectionStart].match(/^[\-:]/)) {
        selectionStart += 1;
      }
      value[selectionStart] = key;
      target.value = value.join('');
      target.selectionStart = selectionStart + 1;
      target.selectionEnd = selectionStart + 1;
      this.value = this.input.value;
    }
    event.preventDefault();
  }

  private isSpecialOperation(event: KeyboardEvent): boolean {
    const { keyCode, ctrlKey, metaKey } = event;
    // allow ctr-A/C/V/X/Y/Z
    const keysACVXYZ = [65, 67, 86, 88, 89, 90];
    if ((ctrlKey || metaKey) && keysACVXYZ.indexOf(keyCode) >= 0) {
      return true;
    }
    return false;
  }

  private isKeyPrintable(event: KeyboardEvent): boolean {
    const { keyCode } = event;
    return (
      (keyCode > 47 && keyCode < 58)      || // number keys
      keyCode === 32 || keyCode === 13    || // spacebar & return key(s)
      (keyCode > 64 && keyCode < 91)      || // letter keys
      (keyCode > 95 && keyCode < 112)     || // numpad keys
      (keyCode > 185 && keyCode < 193)    || // ;=,-./` (in order)
      (keyCode > 218 && keyCode < 223));      // [\]' (in order)
  }
}
