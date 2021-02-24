import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { MustMatch } from './must-match-validator';
import { Router } from "@angular/router";
import swal from "sweetalert";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  submitted: boolean = false;
  doctorRegisterForm: FormGroup;
  userRegisterForm: FormGroup;
  doctorRegisterData: any;
  userRegisterData: any;
  result: any;
  ConfirmPassword: any;
  registerResMsg: string;
  FGNStatus: any = "";
  registerStatus: any = 2;

  constructor(
    private doctorService: DoctorService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.doctorRegisterData = {
      Name: "",
      MobileNumber: "",
      Email: "",
      Password: "",
      ContactPersonName: "",
      ContactPersonMobile: "",
      LandLine: "",
      State: "",
      City: "",
      Zipcode: ""
    }

    this.userRegisterData = {
      FirstName: "",
      LastName: "",
      MobileNumber: "",
      Email: "",
      Password: "",
      State: "",
      City: ""
    }
  }
  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('account-body');
    body.classList.add('accountbg');

    this.doctorRegisterForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.maxLength(50)]],
      MobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      ConfirmPassword: ['', Validators.required],
      ContactPersonName: ['', [Validators.required, Validators.maxLength(50)]],
      ContactPersonMobile: ['', [Validators.required, Validators.minLength(10)]],
      LandLine: ['', [Validators.required, Validators.minLength(10)]],
      State: ['', Validators.required],
      City: ['', Validators.required],
      Zipcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
      // Fgn: ['', Validators.required]
    }, {
      validator: MustMatch('Password', 'ConfirmPassword')
    });

    this.userRegisterForm = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.maxLength(50)]],
      LastName: ['', [Validators.required, Validators.maxLength(50)]],
      MobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      ConfirmPassword: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required]
      // Fgn: ['', Validators.required]
    }, {
      validator: MustMatch('Password', 'ConfirmPassword')
    });
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('account-body');
    body.classList.remove('accountbg');
  }
  get doctorRegister() {
    return this.doctorRegisterForm.controls;
  }
  get userRegister() {
    return this.userRegisterForm.controls;
  }
  allowOnlyChar(event: any) {
    return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode == 32)
  }
  numbersOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  registerStatusFun(recRegisterStatus: any) {
    this.registerStatus = recRegisterStatus;
    this.submitted = false;
    this.doctorRegisterData.Name = "";
    this.doctorRegisterData.MobileNumber = "";
    this.doctorRegisterData.Email = "";
    this.doctorRegisterData.Password = "";
    this.doctorRegisterData.ContactPersonName = "";
    this.doctorRegisterData.ContactPersonMobile = "";
    this.doctorRegisterData.LandLine = "";
    this.doctorRegisterData.State = "";
    this.doctorRegisterData.City = "";
    this.doctorRegisterData.Zipcode = "";

    this.userRegisterData.FirstName = "";
    this.userRegisterData.LastName = "";
    this.userRegisterData.MobileNumber = "";
    this.userRegisterData.Email = "";
    this.userRegisterData.Password = "";
    this.userRegisterData.State = "";
    this.userRegisterData.City = "";

    this.ConfirmPassword = "";
  }
  // userReset() {
  //   this.submitted = false;
  //   this.userRegisterForm.reset();
  // }

  doctorRegisterDataFun() {
    this.submitted = true;
    if (this.doctorRegisterForm.invalid) {
      return;
    }
    this.cookieService.set('appUserEmail', this.doctorRegisterData.Email);
    this.doctorService.registerData({ data: this.doctorRegisterData }).subscribe((registerRes: any) => {
      if (registerRes.status == true) {
        this.cookieService.set('registerStatus', this.registerStatus);
        this.router.navigate(["/user/authentication"]);
        swal({
          title: "Please Authenticate your mail"
        });
      } else {
        swal({
          title: registerRes.message
        });
      }
    });
  }

  userRegisterDataFun() {
    this.submitted = true;
    if (this.userRegisterForm.invalid) {
      return;
    }
    this.userService.getFGNNumber().subscribe((FGNNumberResponse: any) => {
      if (FGNNumberResponse.status == true) {
        this.cookieService.set('registerStatus', this.registerStatus);
        var FGNNumberResult = FGNNumberResponse.data[0].FGN;
        this.userRegisterData.FGN = FGNNumberResult;
        this.userRegisterData.UserCode = 1;
        this.cookieService.set('appUserEmail', this.userRegisterData.Email);
        this.userService.registerData({ data: this.userRegisterData }).subscribe((registerRes: any) => {
          if (registerRes.status == true) {
            this.router.navigate(["/user/authentication"]);
            swal({
              title: "Please Authenticate your mail"
            });
          } else {
            swal({
              title: "This Email is Already used, Please Use another Email"
            });
          }
        });
      } else {
        swal({
          title: "FGN Number not Received!!!"
        });
      }
    });
  }
}