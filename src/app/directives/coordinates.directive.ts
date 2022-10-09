import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[Coordinates]',
})
export class CoordinatesDirective {
  @Input() panel!: HTMLUListElement;

  constructor() { }

  @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    const points = this.getSelectionCoordsAndText(event);
    if (points && points.text !== '') {
      // console.log(points.text)
      const xOffset = document.documentElement.scrollLeft;
      const yOffset = document.documentElement.scrollTop;
      this.panel.style.display = 'flex'
      this.panel.style.left = `${points!.left + xOffset - 50}px`;
      this.panel.style.top = `${points!.top + yOffset - 45}px`;
    } else {
      this.panel.style.display = 'none';
    }
  }

  getSelectionCoordsAndText(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.localName !== 'span') {
      const text = window.getSelection()!.toString();
      const range = document.createRange()
      const anchorNode = window.getSelection()!.anchorNode;
      const aOffset = window.getSelection()!.anchorOffset;
      const focusNode = window.getSelection()!.focusNode;
      const fOffset = window.getSelection()!.focusOffset;
      range.setStart( anchorNode!, aOffset );
      range.setEnd( focusNode!, fOffset );
      const rect = range.getBoundingClientRect();

      return {
        left: rect.left,
        top: rect.top,
        text,
      };
    } else {
      return undefined;
    }
  }

}
