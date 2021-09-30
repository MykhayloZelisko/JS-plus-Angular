import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-search',
  templateUrl: './add-search.component.html',
  styleUrls: ['./add-search.component.scss']
})
export class AddSearchComponent implements OnInit {
  public value: string;

  constructor() { }

  ngOnInit(): void {
  }

  search(): void {
    console.log(this.value);
  }

}
