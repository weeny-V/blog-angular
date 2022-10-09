import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[Typing]'
})
export class TypingDirective {

  constructor() { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    event.preventDefault();
    const element = event.target as HTMLInputElement;
    // console.log(element.previousElementSibling);
    const button = element.previousElementSibling as HTMLDivElement;
    if (element.localName === 'p' && element.innerText.length > 0) {
      button.style.display='none';
    } else if (element.localName === 'p' && element.innerText.length <= 0) {
      button.style.display = 'flex'
    }
  }
}
