import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  public show: Observable<boolean>;

  constructor(private _loadingService: LoadingService) { }

  ngOnInit(): void {
    this.show = this._loadingService.show;
  }

}
