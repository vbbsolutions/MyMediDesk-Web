import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CookieService } from 'ngx-cookie-service';
import swal from "sweetalert";
import { DatePipe } from "@angular/common";
import { environment } from '../../services/URL';

@Component({
  selector: 'app-hospital-patient-list',
  templateUrl: './hospital-patient-list.component.html',
  styleUrls: ['./hospital-patient-list.component.css']
})
export class HospitalPatientListComponent implements OnInit {
  loginId: any;
  appointmentList: any;
  appointmentListLength: any;
  searchItem: any;
  ImageURL: any;

  constructor(
    private cookieService: CookieService,
    private appointmentService: AppointmentService,
    private datePipe: DatePipe,
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
        this.appointmentList = this.appointmentList.filter((item: { Status: any; }) => item.Status == 'active');
        this.appointmentListLength = this.appointmentList.length;
      } else {
        swal({
          title: appointmentResponse.status
        });
      }
    });
  }
  changePatientStatus(appointmentId: any, UserId: any, patientStatus: any) {
    if (confirm("Are you sure want to Change Patient Status?")) {
      if (this.loginId) {
        var acceptAppointmentData: any = {};
        acceptAppointmentData.Id = appointmentId;
        acceptAppointmentData.UserId = UserId;
        acceptAppointmentData.PatientStatus = patientStatus;
        this.appointmentService.changePatientStatus({ data: acceptAppointmentData }, this.loginId).subscribe((acceptRejectRes: any) => {
          if (acceptRejectRes.status == true) {
            this.getAppoinments();
            swal({
              title: "Patient Staus changed Successfully"
            });
          } else {
            swal({
              title: "Patient Staus Not changed"
            });
          }
        });
      }
    }
  }
}