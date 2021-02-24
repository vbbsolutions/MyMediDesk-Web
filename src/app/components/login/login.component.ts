import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DoctorService } from '../../services/doctor.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindowInterruptSource } from '@ng-idle/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  details: any;
  errMsg: string;
  registerForm: FormGroup;
  submitted: boolean = false;
  loginStatus: any = 2;
  loadSymbol: any;

  constructor(
    private doctorService: DoctorService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {
    this.details = {
      MobileNumber: "",
      Password: "",
      Email: "",
      MobileEmail: ""
    }
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('account-body');
    body.classList.add('accountbg');

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
    this.cookieService.delete('setemailData');
    this.cookieService.deleteAll();
    this.registerForm = this.formBuilder.group({
      MobileEmail: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }
  get loginControl() {
    return this.registerForm.controls;
  }
  onReset() {
    this.errMsg = "";
    this.submitted = false;
    this.registerForm.reset();
  }
  clearErrmsg(event: any) {
    this.errMsg = "";
  }
  clearCrendtialsMsg(event: any) {
    this.errMsg = "";
  }
  loginStatusFun(status: any) {
    this.loginStatus = status;
    this.errMsg = "";
    this.submitted = false;
    this.registerForm.reset();
  }
  login() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loadSymbol = true;
    if (isNaN(this.details.MobileEmail)) {
      this.details.Email = this.details.MobileEmail;
    } else {
      this.details.MobileNumber = this.details.MobileEmail;
    }
    if (this.loginStatus && this.loginStatus != undefined && this.loginStatus == 1) {
      this.doctorService.login({ data: this.details }).subscribe((apiResponse: any) => {
        if (apiResponse.status == true) {
          this.cookieService.set('loginStatus', this.loginStatus);
          this.cookieService.set('AppUser', JSON.stringify(apiResponse));
          this.router.navigate(["/hospital/dashboard"]);
        } else {
          this.loadSymbol = false;
          this.errMsg = "Invalid Credentials";
        }
      }, (err: any) => {
        this.loadSymbol = false;
        this.errMsg = "There is a Network Issue Please check your Internet connection";
      })
    } else {
      this.userService.login({ data: this.details }).subscribe((apiResponse: any) => {
        if (apiResponse.status == true) {
          this.cookieService.set('loginStatus', this.loginStatus);
          this.cookieService.set('AppUser', JSON.stringify(apiResponse));
          this.router.navigate(["/user/dashboard"]);
        } else {
          this.loadSymbol = false;
          this.errMsg = "Invalid Credentials";
        }
      }, (err: any) => {
        this.loadSymbol = false;
        this.errMsg = "There is a Network Issue Please check your Internet connection";
      });
    }
  }
}