import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseData } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseFormComponent {
  @Input() set data(data: CourseData) {
    this.initForm(data);
  }
  @Output() public cancelEvent: EventEmitter<void> = new EventEmitter();
  @Output() public saveEvent: EventEmitter<CourseData> = new EventEmitter();
  public titleMessage: string;
  public descriptionMessage: string;
  public courseForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  cancel(): void {
    this.cancelEvent.emit();
  }

  setDate(date: string): void {
    this.data.creationDate = date;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.courseForm.controls[controlName];
    const result = control.invalid;
    this.showMessage(controlName);
    return result;
  }

  initForm(data: CourseData): void {
    this.courseForm = this._fb.group({
      title: [
        data?.title ? data.title : null,
        [
          Validators.required,
          Validators.maxLength(+'50')
        ]
      ],
      description: [
        data?.description ? data.description : null,
        [
          Validators.required,
          Validators.maxLength(+'500')
        ]
      ],
      creationDate: [
        data?.creationDate ? data.creationDate : null,
      ],
      duration: [
        data?.duration ? data.duration : null,
      ],
      authors: [
        data?.authors ? data.authors : [],
      ]
    });
  }

  saveCourse(): void {
    const data = this.courseForm.getRawValue();
    this.saveEvent.emit(data);
  }

  private showMessage(controlName: string): void {
    const control = this.courseForm.controls[controlName];
    const titleLength = 50;
    const descriptionLength = 500;
    const maxLength = controlName === 'title' ? titleLength : descriptionLength;
    if (!control.value && controlName === 'description') {
      this.descriptionMessage = `This field can't be empty`;
    } else if (!control.value && controlName === 'title') {
      this.titleMessage = `This field can't be empty`;
    } else if (control.value.length > maxLength && controlName === 'title') {
      this.titleMessage = `This field must be shorter than ${maxLength} synbols`;
    } else if (control.value.length > maxLength && controlName === 'description') {
      this.descriptionMessage = `This field must be shorter than ${maxLength} synbols`;
    }
  }
}
