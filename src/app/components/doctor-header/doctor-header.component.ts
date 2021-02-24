import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})
export class DoctorHeaderComponent implements OnInit {
  loginId: number;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private idle: Idle,
    private keepalive: Keepalive
  ) {
    idle.setIdle(3600);
    idle.setTimeout(3600);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.router.navigate(["/login"]);
    });
    keepalive.interval(15);
    keepalive.onPing.subscribe(() => this.lastPing = new Date());
    this.reset();
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  ngOnInit(): void {
    var obj = this.cookieService.get('AppUser') == null || this.cookieService.get('AppUser') == "" ? null : JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = obj == null ? 0 : (obj.data[0].Id);
    if (this.loginId == 0) {
      this.router.navigate(["/login"]);
    }
  }
  logout() {
    this.cookieService.delete('AppUser');
    this.cookieService.delete('slotId');
    this.cookieService.delete('appUserEmail');
    this.cookieService.delete('UserStatus');
    this.cookieService.delete('loginStatus');
    this.cookieService.delete('registerStatus');
    this.cookieService.delete('appointmentSlotId');
    this.cookieService.delete('appointmentId');
    this.cookieService.delete('doctorGmail');
    this.cookieService.delete('editdoctorId');
    this.cookieService.deleteAll();
    this.router.navigate(["/login"]);
  }
}
