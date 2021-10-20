import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.scss']
})
export class CourseDateComponent implements OnInit {
  @Input() creationDate: string;

  constructor() { }

  ngOnInit(): void {
  }

}
