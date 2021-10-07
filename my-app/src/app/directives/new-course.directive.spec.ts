/* eslint-disable no-magic-numbers */
import { ElementRef } from '@angular/core';
import { NewCourseDirective } from './new-course.directive';

describe('NewCourseDirective', () => {
  const elMock: ElementRef = {
    nativeElement: {
      style: {
        border: null
      }
    }
  } as ElementRef;
  const directive = new NewCourseDirective(elMock);

  it('should return blue border', () => {
    const currentDate = Date.now();
    const futureDate = currentDate + 86400000;
    directive.value = new Date(futureDate).toDateString();
    directive.ngOnChanges();
    expect(elMock.nativeElement.style.border).toBe(
      'solid 2px blue'
    );
  });

  it('should return green border', () => {
    const currentDate = Date.now();
    const pastDate = currentDate - 20000000;
    directive.value = new Date(pastDate).toDateString();
    directive.ngOnChanges();
    expect(elMock.nativeElement.style.border).toBe(
      'solid 2px green'
    );
  });

  it('should return none border', () => {
    const currentDate = Date.now();
    const pastDate = currentDate - 2000000000;
    directive.value = new Date(pastDate).toDateString();
    directive.ngOnChanges();
    expect(elMock.nativeElement.style.border).toBe(
      'none'
    );
  });
});
