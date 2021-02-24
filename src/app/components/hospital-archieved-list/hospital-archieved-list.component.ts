import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CookieService } from 'ngx-cookie-service';
import swal from "sweetalert";

@Component({
  selector: 'app-hospital-archieved-list',
  templateUrl: './hospital-archieved-list.component.html',
  styleUrls: ['./hospital-archieved-list.component.css']
})
export class HospitalArchievedListComponent implements OnInit {
  loginId: any;
  appointmentList: any;
  appointmentListLength: any;
  searchItem: any;

  constructor(private cookieService: CookieService,
    private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    if (this.loginId) {
      this.getArchivedPatients();
    }
  }

  getArchivedPatients() {
    this.appointmentService.getArchivedPatients(this.loginId).subscribe((appointmentResponse: any) => {
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

}
