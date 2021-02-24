import { Component, OnInit } from '@angular/core';
import { SlotsService } from '../../services/Slots.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import swal from "sweetalert";
import { environment } from '../../services/URL';
import { AppointmentService } from '../../services/appointment.service';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css']
})
export class SlotListComponent implements OnInit {
  slotList: any;
  loginId: any;
  searchItem: any;
  slotListLength: any;
  ImageURL: any;
  appointmentList: any;
  todayDate: Date;
  appointmentListLength: any;
  appointmentOriginalList: any;

  constructor(
    private slotsService: SlotsService,
    private cookieService: CookieService,
    private router: Router,
    private appointmentService: AppointmentService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = (obj.data[0].Id);
    if (this.loginId) {
      this.getSlotList();
    }
    this.ImageURL = environment.rootUrl + '/loadfile/doctors/';
  }
  getSlotList() {
    this.slotsService.getSlotListByHospitalId(this.loginId).subscribe((slotListResponse: any) => {
      if (slotListResponse.status.status == true) {
        this.slotList = (slotListResponse.status.data).reverse();
        this.slotListLength = this.slotList.length == undefined ? 0 : this.slotList.length;
      } else {
        swal({
          title: slotListResponse.status.status
        });
      }
    }, (err: any) => {
      swal({
        title: "There is a Network Issue Please check your Internet connection"
      });
    });
  }
  cancelSlot(slotId: any, doctorId: any) {
    if (confirm("Are you sure want to Cancel Slot?")) {
      if (this.loginId) {
        var cancelSlotData: any = { Id: slotId, DoctorId: doctorId };
        this.slotsService.cancelSlot({ data: cancelSlotData }, this.loginId).subscribe((cancelSlotRes: any) => {
          if (cancelSlotRes.status == true) {
            this.getSlotList();
            swal({
              title: "Slot Cancelled Successfully"
            });
          } else {
            swal({
              title: "Slot Not Cancelled"
            });
          }
        });
      }
    }
  }
}