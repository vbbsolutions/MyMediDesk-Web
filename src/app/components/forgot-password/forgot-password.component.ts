import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { MustMatch } from './must-match-validator'
import swal from "sweetalert";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userOtpForm: FormGroup;
  userPwdResetForm: FormGroup;
  EmailData: any;
  userPwdResetData: any;
  submitted: boolean = false;
  emailFormStatus: boolean = false;
  otpFormStatus: boolean = true;
  userOtpRes: any;
  otpRes: string;
  emailMsg: string;
  registerStatus: any = 2;

  constructor(
    private doctorService: DoctorService,
    private userService: UserService,
    private router: Router,
    private emailBuilder: FormBuilder,
    private resetPwdBuilder: FormBuilder,

  ) {
    this.EmailData = {
      Email: ""
    }
    this.userPwdResetData = {
      OTP: "",
      NewPassword: "",
    }
  }
  ngOnInit(): void {
    this.userOtpForm = this.emailBuilder.group({
      Email: ['', [Validators.required, Validators.email]]
    });
    this.userPwdResetForm = this.resetPwdBuilder.group({
      Token: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      NewPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      ConfirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('NewPassword', 'ConfirmPassword')
    });
  }
  get email() {
    return this.userOtpForm.controls;
  }
  get otp() {
    return this.userPwdResetForm.controls;
  }
  onEmailReset() {
    this.submitted = false;
    this.emailMsg = "";
    this.userOtpForm.reset();
  }
  registerStatusFun(recRegisterStatus: any) {
    this.registerStatus = recRegisterStatus;
    this.submitted = false;
    this.EmailData.Email = "";
    this.emailMsg = "";
  }
  onOtpReset() {
    this.submitted = false;
    this.userPwdResetForm.reset();
  }
  hideOtpMsg(evnt: any) {
    this.otpRes = "";
  }
  clearEmailMsg(evnt: any) {
    this.emailMsg = "";
  }
  sendUserOtp() {
    this.emailMsg = "";
    this.submitted = true;
    if (this.userOtpForm.invalid) {
      return;
    }
    if (this.registerStatus == 1) {
      this.emailMsg = "Please Wait... Checking...";
      this.doctorService.EmailData({ data: this.EmailData }).subscribe((userOtpRes: any) => {
        if (userOtpRes.status == true) {
          this.emailFormStatus = true;
          this.otpFormStatus = false;
          this.otpRes = "OTP Sent to your registered Email";
        } else {
          this.emailMsg = "Sorry, This Email is not registered.";
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      })
    } else {
      this.emailMsg = "Please Wait... Checking...";
      this.userService.EmailData({ data: this.EmailData }).subscribe((userOtpRes: any) => {
        if (userOtpRes.status == true) {
          this.emailFormStatus = true;
          this.otpFormStatus = false;
          this.otpRes = "OTP Sent to your registered Email";
        } else {
          this.emailMsg = "Sorry, This Email is not registered.";
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      })
    }
    this.submitted = false;
  }


  userResetPwd() {
    this.submitted = true;
    if (this.userPwdResetForm.invalid) {
      return;
    }
    if (this.registerStatus == 1) {
      this.userPwdResetData.Email = this.EmailData.Email;
      this.doctorService.passwordReset({ data: this.userPwdResetData }).subscribe((userResetResponse: any) => {
        if (userResetResponse.status == true) {
          this.router.navigate(["/login"]);
          swal({
            title: "Successfully password has been reset..!!!"
          });
        } else {
          swal({
            title: "Invalid OTP Please Try again!!!"
          });
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      })
    } else {
      this.userPwdResetData.Email = this.EmailData.Email;
      this.userService.passwordReset({ data: this.userPwdResetData }).subscribe((userResetResponse: any) => {
        if (userResetResponse.status == true) {
          this.router.navigate(["/login"]);
          swal({
            title: "Successfully password has been reset..!!!"
          });
        } else {
          swal({
            title: "Invalid OTP Please Try again!!!"
          });
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      })
    }
  }
  resendOTP() {
    this.otpRes = "";
    if (this.registerStatus == 1) {
      this.emailMsg = "Please Wait... Checking...";
      this.doctorService.EmailData({ data: this.EmailData }).subscribe((userOtpRes: any) => {
        if (userOtpRes.status == true) {
          this.otpRes = "OTP Sent to your registered Email";
        } else {
          this.emailMsg = "Sorry, This Email is not registered.";
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      })
    } else {
      this.emailMsg = "Please Wait... Checking...";
      this.userService.EmailData({ data: this.EmailData }).subscribe((userOtpRes: any) => {
        if (userOtpRes.status == true) {
          this.otpRes = "OTP Sent to your registered Email";
        } else {
          this.emailMsg = "Sorry, This Email is not registered.";
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      })
    }
  }
}