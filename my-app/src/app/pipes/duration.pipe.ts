import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    let duration = '';
    const minsInHour = 60;
    if (value >= minsInHour) {
      duration = `${Math.trunc(value / minsInHour)} h ${value % minsInHour} min`;
    } else if (value > 0) {
      duration = `${value} min`;
    }
    return duration;
  }

}
