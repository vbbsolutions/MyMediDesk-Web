import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { UserService } from '../../services/user.service';
import { HospitalService } from '../../services/hospital.service';
import { SpecializationService } from '../../services/specialization.service';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { Router } from "@angular/router";
import swal from "sweetalert";
import { CookieService } from 'ngx-cookie-service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../services/URL';
declare var $: any;

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {
  submitted: boolean = false;
  doctorRegisterForm: FormGroup;
  doctorUpdateData: any;
  userRegisterData: any;
  result: any;
  registerResMsg: string;
  FGNStatus: any = "";
  registerStatus: any = 1;
  hospitalId: any;
  specializationList: any;
  hospitalList: any;
  editdoctorId: any;
  closeResult: string;
  loginData: any;
  loginMobileNumber: any;
  ImageURL: any;
  loginId: any;

  constructor(
    private doctorService: DoctorService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private specializationService: SpecializationService,
    private hospitalService: HospitalService,
    private modalService: NgbModal
  ) {
    this.doctorUpdateData = {
      FirstName: "",
      LastName: "",
      Degree: "",
      RegistrationNo: "",
      MedicalCouncilNo: "",
      SpecializationId: "",
      ConsultationFee: "",
      MobileNumber: "",
      Email: "",
      State: "",
      City: ""
    }
    this.loginData = {
      Password: ""
    }
  }
  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('account-body');
    body.classList.add('accountbg');
    var obj = this.cookieService.get('AppUser') == null || this.cookieService.get('AppUser') == "" ? null : JSON.parse(this.cookieService.get('AppUser'));
    this.loginMobileNumber = obj == null ? 0 : (obj.data[0].MobileNumber);
    this.loginId = obj.data[0].Id;

    this.doctorRegisterForm = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.maxLength(50)]],
      LastName: ['', [Validators.required, Validators.maxLength(50)]],
      ImageURL: [''],
      Degree: ['', [Validators.required, Validators.maxLength(20)]],
      RegistrationNo: ['', Validators.required],
      MedicalCouncilNo: ['', Validators.required],
      SpecializationId: ['', Validators.required],
      ConsultationFee: ['', Validators.required],
      MobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Email: ['', [Validators.required, Validators.email]],
      State: ['', Validators.required],
      City: ['', Validators.required]
    });
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.hospitalId = (obj.data[0].Id);
    this.editdoctorId = this.cookieService.get('editdoctorId');
    if (this.hospitalId && this.editdoctorId) {
      this.doctorService.getDoctorById(this.hospitalId, this.editdoctorId).subscribe((doctorListResponse: any) => {
        if (doctorListResponse.status == true && doctorListResponse.data.length > 0 && doctorListResponse.data != null && doctorListResponse.data != undefined) {
          var doctorListResult = doctorListResponse.data;
          this.doctorUpdateData = doctorListResult[0];
          this.ImageURL = environment.rootUrl + '/loadfile/doctors/' + doctorListResult[0].ImageURL;
        }
        if (this.hospitalId) {
          this.specializationService.getSpecializations(this.hospitalId).subscribe((specializationResponse: any) => {
            if (specializationResponse.status == true) {
              this.specializationList = specializationResponse.data;
            }
          });
        }
      });
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
  doctorRegisterDataFun(content: any) {
    this.submitted = true;
    if (this.doctorRegisterForm.invalid) {
      return;
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
  checkPasswordForEdit(content: any) {
    if (this.loginData.Password && this.loginMobileNumber) {
      var loginDetails = {
        MobileNumber: this.loginMobileNumber,
        Password: this.loginData.Password
      }
      this.doctorService.login({ data: loginDetails }).subscribe((apiResponse: any) => {
        if (apiResponse.status == true) {
          if (this.hospitalId) {
            delete this.doctorUpdateData.CreatedDate;
            this.doctorUpdateData.HospitalId = this.hospitalId;
            this.doctorUpdateData.ImageURL = this.ImageURL ? this.ImageURL.replace(environment.rootUrl + '/loadfile/doctors/', '') : '';
            this.doctorService.doctorUpdate({ data: this.doctorUpdateData, id: this.doctorUpdateData.Id }, this.hospitalId).subscribe((updateRes: any) => {
              if (updateRes.status == true) {
                this.router.navigate(["/hospital/DoctorList"]);
                swal({
                  title: "Details Updated Successfully!!!"
                });
              } else {
                swal({
                  title: updateRes.message
                });
              }
              this.modalService.dismissAll();
            }, (err: any) => {
              swal({
                title: "There is a Network Issue Please check your Internet connection"
              });
            });
          }
        } else {
          swal({
            title: "Invalid Password"
          });
          this.loginData.Password = "";
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      })
    } else {
      swal({
        title: "Please Enter Password"
      });
    }
  }
  deletePopUp(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  checkPasswordForDelete() {
    if (this.loginData.Password && this.loginMobileNumber) {
      var loginDetails = {
        MobileNumber: this.loginMobileNumber,
        Password: this.loginData.Password
      }
      this.doctorService.login({ data: loginDetails }).subscribe((apiResponse: any) => {
        if (apiResponse.status == true && this.hospitalId && this.editdoctorId) {
          var deleteData: any = {}
          deleteData.id = this.editdoctorId;
          this.doctorService.doctorDelete(deleteData, this.hospitalId).subscribe((deleteRes: any) => {
            if (deleteRes.status == true) {
              this.router.navigate(["/hospital/DoctorList"]);
              swal({
                title: "Doctor Deleted Successfully!!!"
              });
            } else {
              swal({
                title: deleteRes.message
              });
            }
            this.modalService.dismissAll();
          }, (err: any) => {
            swal({
              title: "There is a Network Issue Please check your Internet connection"
            });
          });
        } else {
          swal({
            title: "Invalid Password"
          });
          this.loginData.Password = "";
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      })
    } else {
      swal({
        title: "Please enter Password"
      });
    }
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
}