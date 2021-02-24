import { Injectable } from '@angular/core';
import { HttpService } from '../network/http.servie';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './URL';

@Injectable({
	providedIn: 'root'
})
export class AppointmentService {
	// rootUrl: string = "http://vaidhya.vbbsolutions.com:8080/api";
	// rootUrl: string = "http://localhost:8081/api";
	rootUrl: string = environment.rootUrl;
	userRootUrl: string = this.rootUrl + "/appointment";

	constructor(
		private http: HttpService,
		private cookieService: CookieService
	) { }
	appointmentData(appointmentData: any, UserId: any): any {
		var obj = JSON.parse(this.cookieService.get('AppUser'));
		var securityToken = (obj.data[0].UserLog.SecurityToken);
		if (securityToken && securityToken != undefined && securityToken != null) {
			var url = this.userRootUrl + '/createAppointment' + '?id=' + UserId + '&token=' + securityToken;
			return this.http.HttpPost(url, appointmentData);
		}
	}
	editAppointment(appointmentData: any, UserId: any): any {
		var id: any;
		var obj = JSON.parse(this.cookieService.get('AppUser'));
		var securityToken = (obj.data[0].UserLog.SecurityToken);
		if (securityToken && securityToken != undefined && securityToken != null) {
			var url = this.userRootUrl + '/editAppointment' + '?id=' + UserId + '&token=' + securityToken;
			return this.http.HttpPost(url, appointmentData);
		}
	}
	public getAppointmentList(UserId: any): any {
		var obj = JSON.parse(this.cookieService.get('AppUser'));
		var securityToken = (obj.data[0].UserLog.SecurityToken);
		if (securityToken && securityToken != undefined && securityToken != null) {
			var url = this.userRootUrl + '/getAppointmentDetailsByUserId/' + UserId + '?id=' + UserId + '&token=' + securityToken;
			return this.http.HttpGet(url);
		}
	}
	public getUserAppointmentHistory(loginId: any, UserId: any): any {
		var obj = JSON.parse(this.cookieService.get('AppUser'));
		var securityToken = (obj.data[0].UserLog.SecurityToken);
		if (securityToken && securityToken != undefined && securityToken != null) {
			var url = this.userRootUrl + '/getAppointmentDetailsByUserId/' + UserId + '?id=' + loginId + '&token=' + securityToken;
			return this.http.HttpGet(url);
		}
	}
	public getAppoinments(hospitalId: any): any {
		var obj = JSON.parse(this.cookieService.get('AppUser'));
		var securityToken = (obj.data[0].UserLog.SecurityToken);
		if (securityToken && securityToken != undefined && securityToken != null) {
			var url = this.userRootUrl + '/getByHospitalId/' + hospitalId + '?id=' + hospitalId + '&token=' + securityToken;
			return this.http.HttpGet(url);
		}
	}
	public getArchivedPatients(hospitalId: any): any {
		var obj = JSON.parse(this.cookieService.get('AppUser'));
		var securityToken = (obj.data[0].UserLog.SecurityToken);
		if (securityToken && securityToken != undefined && securityToken != null) {
			var url = this.userRootUrl + '/getArchivedPatients/' + hospitalId + '?id=' + hospitalId + '&token=' + securityToken;
			return this.http.HttpGet(url);
		}
	}
	public getAppointmentData(appointmentId: any, UserId: any): any {
		var obj = JSON.parse(this.cookieService.get('AppUser'));
		var securityToken = (obj.data[0].UserLog.SecurityToken);
		if (securityToken && securityToken != undefined && securityToken != null) {
			var url = this.userRootUrl + '/getById/' + appointmentId + '?id=' + UserId + '&token=' + securityToken;
			return this.http.HttpGet(url);
		}
	}
	cancelAppointment(appointmentData: any, loginId: any): any {
		var obj = JSON.parse(this.cookieService.get('AppUser'));
		var securityToken = (obj.data[0].UserLog.SecurityToken);
		if (securityToken && securityToken != undefined && securityToken != null) {
			var url = this.userRootUrl + '/changeStatus' + '?id=' + loginId + '&token=' + securityToken;
			return this.http.HttpPost(url, appointmentData);
		}
	}
	acceptAppointment(acceptAppointmentData: any, loginId: any): any {
		var obj = JSON.parse(this.cookieService.get('AppUser'));
		var securityToken = (obj.data[0].UserLog.SecurityToken);
		if (securityToken && securityToken != undefined && securityToken != null) {
			var url = this.userRootUrl + '/changeAppointmentStatus' + '?id=' + loginId + '&token=' + securityToken;
			return this.http.HttpPost(url, acceptAppointmentData);
		}
	}

	changePatientStatus(acceptAppointmentData: any, loginId: any): any {
		var obj = JSON.parse(this.cookieService.get('AppUser'));
		var securityToken = (obj.data[0].UserLog.SecurityToken);
		if (securityToken && securityToken != undefined && securityToken != null) {
			var url = this.userRootUrl + '/changePatientStatus' + '?id=' + loginId + '&token=' + securityToken;
			return this.http.HttpPost(url, acceptAppointmentData);
		}
	}
}