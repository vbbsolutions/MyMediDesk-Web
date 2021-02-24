import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import swal from "sweetalert";
import { environment } from '../../services/URL';

@Component({
  selector: 'app-app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css']
})
export class AppSidebarComponent implements OnInit {
  loginId: any;
  userList: any = {};
  FirstName: any;
  LastName: any;
  ImageURL: any;
  LogingMemberType: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser')) == null || JSON.parse(this.cookieService.get('AppUser')) == "" ? null : JSON.parse(this.cookieService.get('AppUser'));
    this.LogingMemberType = obj.data[0].UserLog.LogingMemberType;
    this.loginId = obj.data[0].Id;
    if (this.loginId) {
      this.getUserById();
    }
  }
  getUserById() {
    this.userService.getUserById(this.loginId).subscribe((userResponse: any) => {
      if (userResponse.status == true && userResponse.data.length > 0 && userResponse.data != null && userResponse.data != undefined) {
        this.userList = userResponse.data[0];
        this.ImageURL = environment.rootUrl + '/loadfile/users/' + this.userList.ImageURL;
      }
    }, (err: any) => {
      swal({
        title: "There is a Network Issue Please check your Internet connection"
      });
    });
  }
  logout() {
    this.cookieService.delete('AppUser');
    this.cookieService.delete('slotId');
    this.cookieService.delete('appUserEmail');
    this.cookieService.delete('UserStatus');
    this.cookieService.delete('loginStatus');
    this.cookieService.delete('registerStatus');
    this.cookieService.delete('appointmentSlotId');
    this.cookieService.delete('appointmentId');
    this.cookieService.delete('doctorGmail');
    this.cookieService.delete('editdoctorId');
    this.cookieService.deleteAll();
    this.router.navigate(["/login"]);
  }
}