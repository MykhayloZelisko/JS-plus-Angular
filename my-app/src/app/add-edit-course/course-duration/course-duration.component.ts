import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.scss']
})
export class CourseDurationComponent implements OnInit {
  @Input() public duration: number;
  @Output() public getDurationEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getDuration(): void {
    this.getDurationEvent.emit(this.duration);
  }
}
