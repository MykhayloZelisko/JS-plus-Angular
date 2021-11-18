import { ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CourseData } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseFormComponent {
  @Input() public data: CourseData;
  @Output() public cancelEvent: EventEmitter<void> = new EventEmitter();
  @Output() public saveEvent: EventEmitter<CourseData> = new EventEmitter();

  constructor() { }

  cancel(): void {
    this.cancelEvent.emit();
  }

  setDate(date: string): void {
    this.data.creationDate = date;
  }

  setDuration(duration: number): void {
    this.data.duration = duration;
  }

  saveCourse(): void {
    this.saveEvent.emit(this.data);
  }
}
