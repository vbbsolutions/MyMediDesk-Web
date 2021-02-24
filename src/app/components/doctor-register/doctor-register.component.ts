import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { UserService } from '../../services/user.service';
import { HospitalService } from '../../services/hospital.service';
import { SpecializationService } from '../../services/specialization.service';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { Router } from "@angular/router";
import swal from "sweetalert";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css']
})
export class DoctorRegisterComponent implements OnInit {
  submitted: boolean = false;
  doctorRegisterForm: FormGroup;
  doctorRegisterData: any;
  userRegisterData: any;
  result: any;
  ConfirmPassword: any;
  registerResMsg: string;
  FGNStatus: any = "";
  registerStatus: any = 1;
  hospitalId: any;
  specializationList: any;
  hospitalList: any;
  ImageURL: any;
  loginId: any;

  constructor(
    private doctorService: DoctorService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private specializationService: SpecializationService,
    private hospitalService: HospitalService
  ) {
    this.doctorRegisterData = {
      FirstName: "",
      LastName: "",
      Degree: "",
      RegistrationNo: "",
      MedicalCouncilNo: "",
      ConsultationFee: "",
      SpecializationId: "",
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

    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = obj.data[0].Id;

    this.doctorRegisterForm = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.maxLength(50)]],
      LastName: ['', [Validators.required, Validators.maxLength(50)]],
      Degree: ['', [Validators.required, Validators.maxLength(20)]],
      RegistrationNo: ['', Validators.required],
      MedicalCouncilNo: ['', Validators.required],
      SpecializationId: ['', Validators.required],
      ConsultationFee: ['', [Validators.required, Validators.maxLength(20)]],
      MobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Email: ['', [Validators.required, Validators.email]],
      State: ['', Validators.required],
      City: ['', Validators.required]
    });
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.hospitalId = (obj.data[0].Id);
    if (this.hospitalId && this.hospitalId != undefined && this.hospitalId != null) {
      this.getSpecializations();
    }
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('account-body');
    body.classList.remove('accountbg');
  }
  get doctorRegister() {
    return this.doctorRegisterForm.controls;
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
    this.doctorRegisterData.FirstName = "";
    this.doctorRegisterData.LastName = "";
    this.doctorRegisterData.Degree = "";
    this.doctorRegisterData.SpecializationId = "";
    this.doctorRegisterData.RegistrationNo = "";
    this.doctorRegisterData.MedicalCouncilNo = "";
    this.doctorRegisterData.ConsultationFee = "";
    this.doctorRegisterData.MobileNumber = "";
    this.doctorRegisterData.Email = "";
    this.doctorRegisterData.Password = "";
    this.doctorRegisterData.State = "";
    this.doctorRegisterData.City = "";
    this.ConfirmPassword = "";
  }
  getSpecializations() {
    this.specializationService.getSpecializations(this.hospitalId).subscribe((specializationResponse: any) => {
      if (specializationResponse.status == true && specializationResponse.data.length > 0 && specializationResponse.data.length != undefined && specializationResponse.data.length != null) {
        this.specializationList = specializationResponse.data;
      }
    });
  }
  getHospitals() {
    this.hospitalService.getHospitalList(this.hospitalId).subscribe((hospitalListResponse: any) => {
      if (hospitalListResponse.status.status == true) {
        this.hospitalList = hospitalListResponse.status.data;
      }
    });
  }
  onSelectFile(event: any) {
    if (this.loginId && this.loginId != undefined && this.loginId != null) {
      if (event.target.files && event.target.files[0]) {
        const doctorProPicData = new FormData();
        doctorProPicData.append('mypic', event.target.files[0]);
        this.doctorService.doctorProfilePic(doctorProPicData, this.loginId).subscribe((doctotProfilePicRes: any) => {
          if (doctotProfilePicRes.status == true && doctotProfilePicRes && doctotProfilePicRes != null && doctotProfilePicRes != undefined) {
            this.ImageURL = doctotProfilePicRes.data.ImageURL;
          } else {
            swal({
              title: "Upload file should be in PNG or JPEG Format!!!"
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
  doctorRegisterDataFun() {
    this.submitted = true;
    if (this.doctorRegisterForm.invalid) {
      return;
    }
    this.cookieService.set('doctorGmail', this.doctorRegisterData.Email);
    this.doctorRegisterData.HospitalId = this.hospitalId;
    this.doctorRegisterData.Password = 'mmd@test.com';
    this.doctorRegisterData.Status = 'active';
    this.doctorRegisterData.ImageURL = this.ImageURL;
    this.doctorService.doctorRegister({ data: this.doctorRegisterData }, this.hospitalId).subscribe((registerRes: any) => {
      if (registerRes.status == true) {
        this.router.navigate(["/hospital/DoctorList"]);
        swal({
          title: "Doctor Added Successfully"
        });
      } else {
        swal({
          title: registerRes.message.message
        });
      }
    });
  }
}