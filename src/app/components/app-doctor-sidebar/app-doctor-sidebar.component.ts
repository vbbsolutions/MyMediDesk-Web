import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { HospitalService } from '../../services/hospital.service';
import { environment } from '../../services/URL';
import swal from "sweetalert";

@Component({
  selector: 'app-app-doctor-sidebar',
  templateUrl: './app-doctor-sidebar.component.html',
  styleUrls: ['./app-doctor-sidebar.component.css']
})
export class AppDoctorSidebarComponent implements OnInit {
  LogingMemberType: any;
  loginId: any;
  hospitalList: any;
  ImageURL: any;
  hospitalName: any;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser')) == null || JSON.parse(this.cookieService.get('AppUser')) == "" ? null : JSON.parse(this.cookieService.get('AppUser'));
    this.hospitalName = obj.data[0].Name;
    this.LogingMemberType = obj.data[0].UserLog.LogingMemberType;
    this.loginId = obj.data[0].Id;
    if (this.loginId) {
      this.gethospitalById();
    }
  }
  gethospitalById() {
    this.hospitalService.getHospitalById(this.loginId).subscribe((hospitalResponse: any) => {
      if (hospitalResponse.status.status == true && hospitalResponse.status.data.length > 0 && hospitalResponse.status.data.length != null && hospitalResponse.status.data.length != undefined) {
        this.hospitalList = hospitalResponse.status.data;
        this.ImageURL = environment.rootUrl + '/loadfile/hospitals/' + this.hospitalList[0].ImageUrl;
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