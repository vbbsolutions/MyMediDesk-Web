import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CookieService } from 'ngx-cookie-service';
import swal from "sweetalert";
import { DatePipe } from "@angular/common";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../services/URL';

@Component({
  selector: 'app-hospital-dashboard',
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.css']
})
export class HospitalDashboardComponent implements OnInit {
  loginId: any;
  appointmentList: any;
  appointmentListLength: any;
  searchItem: any;
  todayDate: Date;
  closeResult: any;
  userHistoryList: any;
  userHistoryListLength: any;
  ImageURL: any;
  userimageURL: any;

  constructor(
    private cookieService: CookieService,
    private appointmentService: AppointmentService,
    private datePipe: DatePipe,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = (obj.data[0].Id);
    if (this.loginId) {
      this.getAppoinments();
      this.ImageURL = environment.rootUrl + '/loadfile/users/';
    }
  }
  getAppoinments() {
    this.appointmentService.getAppoinments(this.loginId).subscribe((appointmentResponse: any) => {
      if (appointmentResponse.status == true) {
        this.appointmentList = appointmentResponse.data;
        this.appointmentList = this.appointmentList.filter((item: { SlotTime: any; }) => this.datePipe.transform(item.SlotTime, 'dd-MM-yyyy') == this.datePipe.transform(new Date(), 'dd-MM-yyyy'));
        this.todayDate = new Date();
        this.appointmentListLength = this.appointmentList.length;
      } else {
        swal({
          title: appointmentResponse.status
        });
      }
    });
    setTimeout(() => {
      this.getAppoinments();
    }, 300000);
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
  openProfile(content: any, userimageURL: any) {
    this.userimageURL = userimageURL;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open(content: any, userId: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    if (userId && userId != null && userId != undefined && this.loginId && this.loginId != undefined && this.loginId != null) {
      this.appointmentService.getUserAppointmentHistory(this.loginId, userId).subscribe((appointmentListResponse: any) => {
        this.userHistoryList = appointmentListResponse.data;
        this.userHistoryList = this.userHistoryList.filter((item: { HospitalId: any; }) => item.HospitalId == this.loginId);
        this.userHistoryListLength = this.userHistoryList.length;
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
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