import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[newCourse]'
})
export class NewCourseDirective implements OnChanges {
  @Input('newCourse') value: string;

  constructor(private _el: ElementRef) {}

  ngOnChanges(): void {
    this.updateElementBorderStyle();
  }

  private updateElementBorderStyle(): void {
    const msInTwoWeeks = 1209600000;

    const currentDate = Date.now();
    const creationDate = Date.parse(this.value);
    const pastDate = currentDate - msInTwoWeeks;

    if (currentDate < creationDate) {
      this._el.nativeElement.style.border = 'solid 2px blue';
    } else if (creationDate < currentDate && creationDate >= pastDate) {
      this._el.nativeElement.style.border = 'solid 2px green';
    } else {
      this._el.nativeElement.style.border = 'none';
    }
  }
}
