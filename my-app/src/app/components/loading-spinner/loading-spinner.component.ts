import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStoreState } from 'src/app/app-store/app-store.state';
import { selectShow } from 'src/app/app-store/loader/loader.selector';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  public show: Observable<boolean>;

  constructor(private _store: Store<AppStoreState>) { }

  ngOnInit(): void {
    this.show = this._store.select(selectShow);
  }

}
