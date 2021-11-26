import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggle(): void {
    this.show.next(!this.show.value);
  }
}
