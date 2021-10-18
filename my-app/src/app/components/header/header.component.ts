import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  public isAuthenticated: boolean;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.isAuthenticated = this._authService.isAuthenticated();
  }

  logout(): void {
    this._authService.logout();
    console.log('Logout');
  }
}
