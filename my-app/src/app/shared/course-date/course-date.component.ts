import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, Output
} from '@angular/core';

@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDateComponent {
  @Input() public creationDate: string;
  @Output() public setDateEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  setDate(): void {
    this.setDateEvent.emit(this.creationDate);
  }
}
