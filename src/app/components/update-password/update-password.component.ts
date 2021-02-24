import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match-validator';
import swal from "sweetalert";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  updatePwdForm: FormGroup;
  submitted: boolean = false;
  updatePwd: any;
  check: any;
  result: any;
  updatePwdData: any;
  doctorStatus: any;
  userStatus: any;
  appUserData: any;
  errMsg: string;
  loginStatus: any;
  UserId: any;
  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.updatePwdData = {
      MobileNumber: "",
      Password: ""
    }
  }
  ngOnInit(): void {
    this.loginStatus = this.cookieService.get('loginStatus');
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.UserId = (obj.data[0].Id);

    this.appUserData = JSON.parse(this.cookieService.get('AppUser'));
    this.updatePwdData.MobileNumber = this.appUserData.data[0].MobileNumber;
    this.updatePwdData.Email = this.appUserData.data[0].Email;
    this.doctorStatus = this.cookieService.get('DoctorStatus');
    this.userStatus = this.cookieService.get('UserStatus');

    this.updatePwdForm = this.formBuilder.group({
      Password: ['', Validators.required],
      NewPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      ConfirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('NewPassword', 'ConfirmPassword')
    });
  }
  get update() {
    return this.updatePwdForm.controls;
  }
  hideErrMsg(evnt: any) {
    this.errMsg = "";
  }
  onReset() {
    this.updatePwdData.Password = "";
    this.updatePwdData.NewPassword = "";
    this.updatePwdData.ConfirmPassword = "";
    this.errMsg = "";
  }
  numbersOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  updatePwdFun() {
    if (this.loginStatus == "1") {
      this.submitted = true;
      if (this.updatePwdForm.invalid) {
        return;
      }
      this.doctorService.updatePassword({ data: this.updatePwdData }, this.UserId).subscribe((updateResponse: any) => {
        if (updateResponse.status == true) {
          this.router.navigate(["/login"]);
          swal({
            title: "Password Changed Successfully"
          });
        } else {
          this.errMsg = "Incorrect Old Password";
        }
      })
    }
    if (this.loginStatus == "2") {
      this.submitted = true;
      if (this.updatePwdForm.invalid) {
        return;
      }
      this.userService.updatePassword({ data: this.updatePwdData }, this.UserId).subscribe((updateResponse: any) => {
        if (updateResponse.status == true) {
          this.router.navigate(["/login"]);
          swal({
            title: "Password Changed Successfully"
          });
        } else {
          this.errMsg = "Incorrect Old Password";
        }
      })
    }
  }
}