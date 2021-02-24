import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { HospitalService } from '../../services/hospital.service';
import { CookieService } from 'ngx-cookie-service';
import swal from "sweetalert";
import { Router } from "@angular/router";

@Component({
  selector: 'app-hospital-profile-authenticate',
  templateUrl: './hospital-profile-authenticate.component.html',
  styleUrls: ['./hospital-profile-authenticate.component.css']
})
export class HospitalProfileAuthenticateComponent implements OnInit {
  submitted: boolean = false;
  authenticateForm: FormGroup;
  otpData: any;
  emailData: any;
  loginId: any;
  otpMsg: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.otpData = {
      OTP: ""
    }
  }
  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser')) == null || JSON.parse(this.cookieService.get('AppUser')) == "" ? null : JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = obj.data[0].Id == null || obj.data[0].Id == undefined ? 0 : obj.data[0].Id;
    this.emailData = JSON.parse(this.cookieService.get('setemailData'));
    this.authenticateForm = this.formBuilder.group({
      OTP: ['', [Validators.required, Validators.maxLength(6)]]
    });
  }
  get OTPControl() {
    return this.authenticateForm.controls;
  }
  numbersOnly(event: any): boolean {
    this.otpMsg = false;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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
    if (this.emailData.Id && this.emailData.Email && this.emailData.NewMobileNumber && this.loginId) {
      var emailUpdateDateData = {
        Id: this.emailData.Id,
        NewEmail: this.emailData.Email,
        NewMobileNumber: this.emailData.NewMobileNumber,
        OTP: this.otpData.OTP
      }
      this.hospitalService.reAuthenticate({ data: emailUpdateDateData }, this.loginId).subscribe((reAuthenticateRes: any) => {
        if (reAuthenticateRes.status == true) {
          this.router.navigate(["hospital/profile"]);
          swal({
            title: "Email or Phone Number Successfully Updated"
          });
        } else {
          swal({
            title: "Please Enter Proper OTP"
          });
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      });
    } else {
      swal({
        title: "Oops Error!!!"
      });
    }
  }
  resendOTP() {
    this.otpMsg = false;
    if (this.emailData.Email && this.loginId) {
      var resendData = {
        Email: this.emailData.Email,
        Id: this.loginId
      }
      this.hospitalService.authenticateAgain({ data: resendData }).subscribe((emailDataRes: any) => {
        if (emailDataRes.status == true) {
          this.otpMsg = true;
        } else {
          swal({
            title: "Account already authenticated"
          });
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      });
    }
  }
}