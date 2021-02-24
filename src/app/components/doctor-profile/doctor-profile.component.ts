import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HospitalService } from '../../services/hospital.service';
import swal from "sweetalert";
import { environment } from '../../services/URL';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  submitted: boolean = false;
  doctorProfileForm: FormGroup;
  emailForm: FormGroup;
  emailData: any;
  hospitalProfileData: any;
  loginId: any;
  imagesendURL: any;
  ImageURL: any;
  imageFile: any;
  closeResult: string;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private hospitalService: HospitalService,
    private modalService: NgbModal,
    private emailformBuilder: FormBuilder,
    private router: Router
  ) {
    this.hospitalProfileData = {
      City: "",
      Name: "",
      State: "",
      ZipCode: "",
      ContactPersonName: "",
      ContactPersonMobile: "",
      LandLine: ""
    }
    this.emailData = {
      Email: "",
      MobileNumber: ""
    }
  }
  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = obj.data[0].Id;
    if (this.loginId) {
      this.getHospitals();
    }
    this.doctorProfileForm = this.formBuilder.group({
      City: ['', Validators.required],
      Name: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', Validators.required],
      ContactPersonName: ['', Validators.required],
      ContactPersonMobile: ['', Validators.required],
      LandLine: ['', Validators.required]
    });
    this.emailForm = this.emailformBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      MobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
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
  get doctorProfileControl() {
    return this.doctorProfileForm.controls;
  }
  get emailControl() {
    return this.emailForm.controls;
  }
  reset() {
    this.submitted = false;
    this.doctorProfileForm.reset();
  }
  getHospitals() {
    this.hospitalService.getHospitalById(this.loginId).subscribe((hospitalResponse: any) => {
      if (hospitalResponse.status.status == true && hospitalResponse.status.data.length > 0 && hospitalResponse.status.data != null && hospitalResponse.status.data != undefined) {
        this.hospitalProfileData = hospitalResponse.status.data[0];
        this.emailData.Email = this.hospitalProfileData.Email;
        this.emailData.MobileNumber = this.hospitalProfileData.MobileNumber;
        this.hospitalProfileData.LandLine = this.hospitalProfileData.LandLine;
        this.ImageURL = environment.rootUrl + '/loadfile/hospitals/' + this.hospitalProfileData.ImageUrl;
      }
    });
  }
  onSelectFile(event: any) {
    if (this.loginId && this.loginId != undefined && this.loginId != null) {
      if (event.target.files && event.target.files[0]) {
        const hospitalProPicData = new FormData();
        hospitalProPicData.append('mypic', event.target.files[0]);
        this.hospitalService.hospitalProfilePic(hospitalProPicData, this.loginId).subscribe((hospitalProfilePicRes: any) => {
          if (hospitalProfilePicRes.status == true && hospitalProfilePicRes && hospitalProfilePicRes != null && hospitalProfilePicRes != undefined) {
            this.imagesendURL = hospitalProfilePicRes.data.ImageUrl;
            this.ImageURL = environment.rootUrl + '/loadfile/hospitals/' + hospitalProfilePicRes.data.ImageUrl;
            this.hospitalProfileUpdate();
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
  open(content: any, image: any) {
    this.imageFile = image;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  hospitalProfileUpdate() {
    this.submitted = true;
    if (this.doctorProfileForm.invalid) {
      return;
    }
    if (this.loginId) {


      var sendhospitalProfileData = {
        ImageURL: this.imagesendURL,
        Name: this.hospitalProfileData.Name,
        City: this.hospitalProfileData.City,
        State: this.hospitalProfileData.State,
        ZipCode: this.hospitalProfileData.ZipCode,
        ContactPersonName: this.hospitalProfileData.ContactPersonName,
        ContactPersonMobile: this.hospitalProfileData.ContactPersonMobile,
        LandLine: this.hospitalProfileData.LandLine
      }
      this.hospitalService.updateHospitalProfile({ data: sendhospitalProfileData, id: this.loginId }, this.loginId).subscribe((updateRes: any) => {
        if (updateRes.status == true) {
          this.getHospitals();
          swal({
            title: "Profile Successfully Updated"
          });
        } else {
          swal({
            title: "Profile Not Updated"
          });
        }
      });
    }
  }

  emailFun() {
    this.submitted = true;
    if (this.emailForm.invalid) {
      return;
    }
    if (this.emailData.Email == this.hospitalProfileData.Email && this.emailData.MobileNumber == this.hospitalProfileData.MobileNumber) {
      swal({
        title: "Please Change Email or Phone number before Saving"
      });
    }
    else {
      var emailData = {
        Email: this.emailData.Email,
        Id: this.hospitalProfileData.Id
      }
      var setemailData = {
        Id: this.hospitalProfileData.Id,
        Email: this.emailData.Email,
        NewMobileNumber: this.emailData.MobileNumber
      }
      this.cookieService.set('setemailData', JSON.stringify(setemailData));
      this.hospitalService.authenticateAgain({ data: emailData }).subscribe((emailDataRes: any) => {
        if (emailDataRes.status == true) {
          this.router.navigate(["hospital/profile/authenticate"]);
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