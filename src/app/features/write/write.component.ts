import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component( {
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
} )
export class WriteComponent implements OnInit, AfterViewInit {
  addButtonClicked: boolean = false;
  paragraphs: HTMLElement[] = [];

  @ViewChild('panel') private panel!: ElementRef;
  @ViewChild('content' ) private content!: ElementRef;
  @ViewChild('paragraph') private paragraph!: ElementRef;
  @ViewChild('customBtn') private customBtn!: ElementRef;
  @ViewChild('dropMenu') public dropMenu!: ElementRef;
  @ViewChild('add') public add!: ElementRef;
  @ViewChild('close') public close!: ElementRef;
  @ViewChild('something') private something!: ElementRef;

  constructor() {

  }


  ngOnInit(): void {
    window.addEventListener('keyup', (event) => {

    })
  }

  ngAfterViewInit() {
    this.paragraphs = [...this.content.nativeElement.children].filter( ( elem: HTMLElement ) => elem.localName === 'p' );
  }

  onClick() {
    this.add.nativeElement.classList.toggle('hide');
    this.close.nativeElement.classList.toggle('hide');
    this.dropMenu.nativeElement.classList.toggle('hide');
  }

  defaultEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }
}

