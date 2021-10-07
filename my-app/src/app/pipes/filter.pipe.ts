import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../interfaces/course';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Course[], filter: string | undefined): Course[] {
    if (!filter) {
      return items;
    }
    return items.filter(item => item.title.toLowerCase().includes(filter.toLowerCase() ) );
  }

}
