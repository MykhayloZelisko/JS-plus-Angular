import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.scss']
})
export class CourseDurationComponent implements OnInit {
  @Input() duration: number;

  constructor() { }

  ngOnInit(): void {
  }

}
