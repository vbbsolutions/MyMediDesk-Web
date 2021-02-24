import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import swal from "sweetalert";
import { environment } from '../../services/URL';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  loginId: any;
  appointmenList: any;
  appointmenListLength: any;
  searchItem: any;
  imagesendURL: any;
  ImageURL: any;

  constructor(
    private appointmentService: AppointmentService,
    private cookieService: CookieService,
    private router: Router,
    private walletService: WalletService
  ) { }
  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = (obj.data[0].Id);
    if (this.loginId) {
      this.getAppointmentList();
      this.ImageURL = environment.rootUrl + '/loadfile/doctors/';
    }
  }
  getAppointmentList() {
    this.appointmentService.getAppointmentList(this.loginId).subscribe((appointmentListResponse: any) => {
      this.appointmenList = (appointmentListResponse.data).map(item => {
        if (new Date(item.SlotTime).getTime() > new Date().getTime()) {
          {
            return {
              ExpiredDate: 'UnExpired', ...item
            }
          }
        } else {
          return {
            ExpiredDate: 'Expired', ...item

          }
        }
      });
      this.appointmenListLength = this.appointmenList.length;
    });
  }
  editAppointment(appointmentSlotId: any, appointmentId: any) {
    this.cookieService.set('appointmentSlotId', appointmentSlotId);
    this.cookieService.set('appointmentId', appointmentId);
    this.router.navigate(["/user/editAppointment"]);
  }
  cancelAppointment(appointmentId: any) {
    if (confirm("Are you sure want to Cancel Appointment?")) {
      if (this.loginId) {
        var appointmentData: any = {};
        appointmentData.Id = appointmentId;
        appointmentData.UserId = this.loginId;
        this.appointmentService.cancelAppointment({ data: appointmentData }, this.loginId).subscribe((cancelAppointmentRes: any) => {
          if (cancelAppointmentRes.status == true) {
            this.getAppointmentList();
            swal({
              title: "Appointment Cancelled Successfully"
            });
          } else {
            swal({
              title: "Appointment Not Cancelled"
            });
          }
        });
      }
    }
  }
  onSelectFile(event: any) {
    if (this.loginId && this.loginId != undefined && this.loginId != null) {
      if (event.target.files && event.target.files[0]) {
        const walletRequestFile = new FormData();
        walletRequestFile.append('request', event.target.files[0]);
        this.walletService.walletRequestFile(walletRequestFile, this.loginId).subscribe((walletRequestRes: any) => {
          if (walletRequestRes.status == true && walletRequestRes && walletRequestRes != null && walletRequestRes != undefined) {
            this.imagesendURL = walletRequestRes.data.RequestURL;
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
      } else {
        swal({
          title: "Problem in File Selection"
        });
      }
    } else {
      swal({
        title: "Login ID Problem"
      });
    }
  }
  uploadprescription(appointmentId: any) {
    var walletCreationData: any = {
      UserId: this.loginId,
      AppointmentId: appointmentId,
      PrescriptionURL: this.imagesendURL
    }
    if (this.loginId && this.loginId != undefined && this.loginId != null && appointmentId) {
      this.walletService.walletCreation({ data: walletCreationData }, this.loginId).subscribe((walletCreationRes: any) => {
        if (walletCreationRes.status == true) {
          this.getAppointmentList();
          swal({
            title: walletCreationRes.message
          });
        } else {
          swal({
            title: walletCreationRes.message
          });
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
      });
    } else {
      swal({
        title: "Problem in UserID"
      });
    }
  }
}