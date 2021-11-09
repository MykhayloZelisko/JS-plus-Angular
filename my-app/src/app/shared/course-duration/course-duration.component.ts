import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDurationComponent {
  @Input() public duration: number;
  @Output() public setDurationEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  setDuration(): void {
    this.setDurationEvent.emit(this.duration);
  }
}
