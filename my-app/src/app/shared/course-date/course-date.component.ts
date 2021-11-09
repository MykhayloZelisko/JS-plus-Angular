import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDateComponent {
  @ViewChild('creationDateField') creationDateField: ElementRef;
  @Input() public creationDate: string;
  @Output() public setDateEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  setDate(): void {
    this.setDateEvent.emit(this.creationDateField.nativeElement.value);
  }
}
