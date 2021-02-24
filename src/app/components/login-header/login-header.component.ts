import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent implements OnInit {
  loginId: number;
  loginStatus: number;

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    var obj = this.cookieService.get('AppUser') == null || this.cookieService.get('AppUser') == "" ? null : JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = obj == null ? 0 : (obj.data[0].Id);
    this.loginStatus = parseInt(this.cookieService.get('loginStatus'));
  }
  appointmentAlert() {
    alert("Please Login the Account");
  }

}
