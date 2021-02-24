import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  UserId: any;
  appointmenList: any;
  constructor(
    private appointmentService: AppointmentService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.UserId = (obj.data[0].Id);
    this.appointmentService.getAppointmentList(this.UserId).subscribe((appointmentListResponse: any) => {
      this.appointmenList = appointmentListResponse.status.data;
    });
  }
  deleteAppointment() {
    confirm("are you sure want to delete Appointment?");
  }
}
