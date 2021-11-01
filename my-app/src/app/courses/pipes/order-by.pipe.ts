import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../interfaces/course';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: Course[], field: string, type: 'asc'|'desc' = 'asc'): Course[] {
    array.sort( (a: Course, b: Course): number => {
      const neg = -1;
      let sort = 0;
      if (field === 'creationDate') {
        const aDate = Date.parse(a.creationDate);
        const bDate = Date.parse(b.creationDate);
        if (aDate <= bDate) {
          sort = neg;
        } else {
          sort = 1;
        }
      }
      return sort;
    });
    if (type === 'asc') {
      return array;
    } else {
      return array.reverse();
    }
  }

}
