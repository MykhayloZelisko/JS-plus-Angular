import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDurationComponent implements OnInit {
  @Input() public duration: number;
  @Output() public setDurationEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setDuration(): void {
    this.setDurationEvent.emit(this.duration);
  }
}
