import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import swal from "sweetalert";
import { environment } from '../../services/URL';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  submitted: boolean = false;
  userProfileForm: FormGroup;
  emailForm: FormGroup;
  userProfileData: any;
  emailData: any;
  loginId: any;
  FGN: any;
  //userList: any;
  ImageURL: any;
  imageFile: string;
  closeResult: string;
  imagesendURL: any;

  constructor(
    private profileformBuilder: FormBuilder,
    private emailformBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private modalService: NgbModal,
    private router: Router,
  ) {
    this.userProfileData = {
      FirstName: "",
      LastName: "",
      City: "",
      State: ""
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
      this.getUsers();
    }
    this.userProfileForm = this.profileformBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required]
    });
    this.emailForm = this.emailformBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      MobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }
  get userProfileControl() {
    return this.userProfileForm.controls;
  }
  get emailControl() {
    return this.emailForm.controls;
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
  // reset() {
  //   this.submitted = false;
  //   this.userProfileForm.reset();
  // }
  getUsers() {
    this.userService.getUserById(this.loginId).subscribe((userResponse: any) => {
      if (userResponse.status == true && userResponse.data.length > 0 && userResponse.data != null && userResponse.data != undefined) {
        var userList = userResponse.data;
        this.userProfileData = userList[0];
        this.ImageURL = environment.rootUrl + '/loadfile/users/' + this.userProfileData.ImageURL;
        this.emailData.Email = this.userProfileData.Email;
        this.emailData.MobileNumber = this.userProfileData.MobileNumber;
      }
    });
  }
  onSelectFile(event: any) {
    if (this.loginId && this.loginId != undefined && this.loginId != null) {
      if (event.target.files && event.target.files[0]) {
        const userProPicData = new FormData();
        userProPicData.append('mypic', event.target.files[0]);
        this.userService.userProfilePic(userProPicData, this.loginId).subscribe((userProfilePicRes: any) => {
          if (userProfilePicRes.status == true && userProfilePicRes && userProfilePicRes != null && userProfilePicRes != undefined) {
            this.imagesendURL = userProfilePicRes.data.ImageURL;
            this.ImageURL = environment.rootUrl + '/loadfile/users/' + userProfilePicRes.data.ImageURL;
            this.userProfileFun();
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

  userProfileFun() {
    this.submitted = true;
    if (this.userProfileForm.invalid) {
      return;
    }
    if (this.loginId && this.loginId != undefined && this.loginId != null) {
      var sendUserProfileData = {
        ImageURL: this.imagesendURL,
        FirstName: this.userProfileData.FirstName,
        LastName: this.userProfileData.LastName,
        City: this.userProfileData.City,
        State: this.userProfileData.State
      }
      this.userService.updateUserProfile({ data: sendUserProfileData, id: this.loginId }, this.loginId).subscribe((updateRes: any) => {
        if (updateRes.status == true) {
          this.getUsers();
          swal({
            title: "Profile Updated Successfully."
          });
        } else {
          swal({
            title: "Profile Not Updated."
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
    if (this.emailData.Email == this.userProfileData.Email && this.emailData.MobileNumber == this.userProfileData.MobileNumber) {
      swal({
        title: "Please Change Email or Phone number before Saving"
      });
    }
    else {
      var emailData = {
        Email: this.emailData.Email,
        Id: this.userProfileData.Id
      }
      var setemailData = {
        Id: this.userProfileData.Id,
        Email: this.emailData.Email,
        NewMobileNumber: this.emailData.MobileNumber
      }
      this.cookieService.set('setemailData', JSON.stringify(setemailData));
      this.userService.authenticateAgain({ data: emailData }).subscribe((emailDataRes: any) => {
        if (emailDataRes.status == true) {
          this.router.navigate(["user/profile/authenticate"]);
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