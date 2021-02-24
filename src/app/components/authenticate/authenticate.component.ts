import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { DoctorService } from '../../services/doctor.service';
import { Router } from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  submitted: boolean = false;
  authenticateForm: FormGroup;
  OTPData: any;
  appUserData: any;
  errMsg: string;
  OTPMsg: string;
  registerStatus: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private userService: UserService,
    private doctorService: DoctorService,
    private router: Router,
  ) {

    this.OTPData = {
      OTP: "",
      Email: ""
    }
  }
  ngOnInit(): void {
    this.registerStatus = this.cookieService.get('registerStatus');

    this.authenticateForm = this.formBuilder.group({
      OTP: ['', Validators.required]
    });
  }
  get OTPControl() {
    return this.authenticateForm.controls;
  }
  hideOtpMsg(evnt: any) {
    this.OTPMsg = "";
    this.errMsg = "";
  }
  reset() {
    this.submitted = false;
    this.authenticateForm.reset();
  }
  authenticateFun() {
    this.submitted = true;
    if (this.authenticateForm.invalid) {
      return;
    }
    if (this.registerStatus && this.registerStatus != null && this.registerStatus != undefined) {
      if (this.registerStatus == 1) {
        this.OTPData.Email = this.cookieService.get('appUserEmail');
        this.doctorService.authenticate({ data: this.OTPData }).subscribe((apiResponse: any) => {
          if (apiResponse.status == true) {
            this.router.navigate(["/login"]);
            swal({
              title: "Hospital Successfully Registered"
            });
          } else {
            this.errMsg = "Reset code is invalid or expired";
          }
        });
      } else {
        this.OTPData.Email = this.cookieService.get('appUserEmail');
        this.userService.authenticate({ data: this.OTPData }).subscribe((apiResponse: any) => {
          if (apiResponse.status == true) {
            this.router.navigate(["/login"]);
            swal({
              title: "User Successfully Registered"
            });
          } else {
            this.errMsg = "Reset code is invalid or expired";
          }
        });
      }
    }
  }
  resendCodeFun() {
    this.errMsg = "";
    if (this.registerStatus == 1) {
      this.doctorService.authenticateAgain({ data: { Email: this.cookieService.get('appUserEmail') } }).subscribe((apiResponse: any) => {
        if (apiResponse.status == true) {
          this.OTPMsg = "OTP sent successfully";
        } else {
          this.errMsg = "Reset code is invalid or expired";
        }
      });
    } else {
      this.userService.authenticateAgain({ data: { Email: this.cookieService.get('appUserEmail') } }).subscribe((apiResponse: any) => {
        if (apiResponse.status == true) {
          this.OTPMsg = "OTP sent successfully";
        } else {
          this.errMsg = "Reset code is invalid or expired";
        }
      });
    }
  }
}