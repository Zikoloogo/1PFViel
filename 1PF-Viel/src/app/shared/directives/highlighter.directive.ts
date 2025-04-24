import { Directive, ElementRef } from '@angular/core';

@Directive({
  standalone: false,
  selector: '[appHighlighter]',
  
})
export class HighlighterDirective {

  constructor(private element :ElementRef<HTMLElement>) {this.modifyStyles()};

  modifyStyles() :void{
    this.element.nativeElement.style.color = 'red';
  }
}
