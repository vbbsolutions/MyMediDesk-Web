import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CookieService } from 'ngx-cookie-service';
import swal from "sweetalert";
import { environment } from '../../services/URL';

@Component({
  selector: 'app-hospital-my-patients',
  templateUrl: './hospital-my-patients.component.html',
  styleUrls: ['./hospital-my-patients.component.css']
})
export class HospitalMyPatientsComponent implements OnInit {
  loginId: any;
  appointmentList: any;
  appointmentListLength: any;
  searchItem: any;
  ImageURL: any;

  constructor(
    private cookieService: CookieService,
    private appointmentService: AppointmentService
  ) { }
  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = (obj.data[0].Id);
    if (this.loginId) {
      this.getAppoinments();
    }
    this.ImageURL = environment.rootUrl + '/loadfile/users/';
  }
  getAppoinments() {
    this.appointmentService.getAppoinments(this.loginId).subscribe((appointmentResponse: any) => {
      if (appointmentResponse.status == true) {
        this.appointmentList = appointmentResponse.data;
        this.appointmentListLength = this.appointmentList.length;
      } else {
        swal({
          title: appointmentResponse.status
        });
      }
    });
  }
  acceptAppointment(appointmentId: any, UserId: any) {
    if (confirm("Are you sure want to Accept Appointment?")) {
      if (this.loginId) {
        var acceptAppointmentData: any = {};
        acceptAppointmentData.Id = appointmentId;
        acceptAppointmentData.UserId = UserId;
        this.appointmentService.acceptAppointment({ data: acceptAppointmentData }, this.loginId).subscribe((acceptRejectRes: any) => {
          if (acceptRejectRes.status == true) {
            this.getAppoinments();
            swal({
              title: "Appointment Accepted Successfully"
            });
          } else {
            swal({
              title: "Appointment Not Accepted"
            });
          }
        });
      }
    }
  }
  cancelAppointment(appointmentId: any, UserId: any) {
    if (confirm("Are you sure want to Cancel Appointment?")) {
      if (this.loginId) {
        var appointmentData: any = {};
        appointmentData.Id = appointmentId;
        appointmentData.UserId = UserId;
        this.appointmentService.cancelAppointment({ data: appointmentData }, this.loginId).subscribe((cancelAppointmentRes: any) => {
          if (cancelAppointmentRes.status == true) {
            this.getAppoinments();
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
}
