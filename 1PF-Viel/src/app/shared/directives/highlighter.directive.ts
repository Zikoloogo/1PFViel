import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlighter]',
  standalone: false
})
export class HighlighterDirective {

  constructor(private element :ElementRef<HTMLElement>) {
    this.modifyStyles()
   }

  modifyStyles() :void{
    this.element.nativeElement.style.backgroundColor = 'sand';
  }
}
