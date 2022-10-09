import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[NewParagraph]'
})
export class NewParagraphDirective {
  @Input() paragraph!: HTMLElement;
  @Input() content!: HTMLElement;
  @Input() customBtn!: HTMLElement;
  @Input() menu!: HTMLElement;

  constructor() { }

  @HostListener('keyup', ['$event']) onEnter(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    let openOrClose = true;
    if (event.key === 'Enter') {
      if (target.parentNode!.nextSibling !== null) {
        const childElem = target.parentNode!.nextSibling.lastChild as HTMLElement;
        childElem.focus();
      } else {
        console.log('not sibling')
        const newParagraph = this.paragraph.cloneNode() as HTMLDivElement; // container of all paragraph
        newParagraph.style.display = 'flex';
        const newButtonContainer = this.customBtn.cloneNode() as HTMLDivElement; // container of button
        newButtonContainer.style.display = 'flex'

        const newButton = document.createElement('button'); // button
        newButton.classList.add('flex', 'p-0.5', 'rounded-full', 'border', 'border-black', 'mr-2.5');

        const newMenu = this.menu.cloneNode(true) as HTMLUListElement;
        newMenu.style.display = 'none';
        newMenu.classList.add('flex', 'bg-white');

        const addButton = document.createElement('span');  // menu add button
        addButton.innerText = 'add';
        addButton.classList.add('material-symbols-outlined');
        addButton.addEventListener('click', changeHideClass)

        const closeButton = document.createElement('span');  // menu close button
        closeButton.innerText = 'close';
        closeButton.style.display = 'none'
        closeButton.classList.add('material-symbols-outlined');
        closeButton.addEventListener('click', changeHideClass);

        const newField = document.createElement('p')
        newField.setAttribute('contenteditable', 'true');
        newField.classList.add('w-full', 'text', 'text-xl', 'border', 'focus:outline-none', 'max-w-[900px]');
        newField.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        })

        newButton.appendChild(addButton); //add to button add button
        newButton.appendChild(closeButton); // add to button close button
        newButtonContainer.appendChild(newButton); // add to button container button
        newButtonContainer.appendChild(newMenu);
        newParagraph.appendChild(newButtonContainer); //add to paragraph button container
        newParagraph.appendChild(newField);
        target.after(newParagraph); // add whole paragraph to dom
        newField.focus();

        function changeHideClass() {
          if (openOrClose) {
            closeButton.style.display = 'flex'
            addButton.style.display = 'none'
            newMenu.style.display = 'flex';
            openOrClose = false;
          } else {
            closeButton.style.display = 'none'
            addButton.style.display = 'flex'
            newMenu.style.display = 'none';
            openOrClose = true;
          }
        }
      }
    }
  }

}
