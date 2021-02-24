import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { DoctorService } from '../../services/doctor.service';
import { Router } from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: 'app-doctor-authenticate',
  templateUrl: './doctor-authenticate.component.html',
  styleUrls: ['./doctor-authenticate.component.css']
})
export class DoctorAuthenticateComponent implements OnInit {
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
    this.OTPData.Email = this.cookieService.get('doctorGmail');
    if (this.OTPData.Email) {
      this.doctorService.doctorAuthenticate({ data: this.OTPData }).subscribe((apiResponse: any) => {
        if (apiResponse.status == true) {
          this.router.navigate(["/hospital/DoctorList"]);
          swal({
            title: "Doctor Successfully Registered"
          });
        } else {
          this.errMsg = "Reset code is invalid or expired";
        }
      });
    }
  }
  resendCodeFun() {
    this.OTPData.Email = this.cookieService.get('doctorGmail');
    if (this.OTPData.Email) {
      this.errMsg = "";
      this.doctorService.doctorAuthenticateAgain({ data: { Email: this.OTPData.Email } }).subscribe((apiResponse: any) => {
        if (apiResponse.status == true) {
          this.OTPMsg = "OTP sent successfully";
        } else {
          this.errMsg = "Reset code is invalid or expired";
        }
      });
    } else {
      swal({
        title: "Invalid Email"
      });
    }
  }
}