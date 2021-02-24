import { Injectable } from '@angular/core';
import { HttpService } from '../network/http.servie';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './URL';

@Injectable({
  providedIn: 'root'
})
export class PatientReportService {
  // rootUrl: string = "http://vaidhya.vbbsolutions.com:8080/api";
  // rootUrl: string = "http://localhost:8081/api";
  rootUrl: string = environment.rootUrl;
  patientRootUrl: string = this.rootUrl + "/patientReport";
  securityToken: any;
  constructor(
    private http: HttpService,
    private cookieService: CookieService
  ) { }

  getByDoctorId(getByDoctorId: any): any {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    var securityToken = (obj.data[0].UserLog.SecurityToken);
    var url = this.patientRootUrl + '/getByDoctorId/' + getByDoctorId + '/1/' + '?id=1&token=' + securityToken;
    return this.http.HttpGet(url);
  }
  uploadFile(uploadFile: any): any {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    var securityToken = (obj.data[0].UserLog.SecurityToken);
    var id = (obj.data[0].UserLog.loginId);
    var url = this.patientRootUrl + '/saveReport' + '?id=' + id + '&token=' + securityToken;
    return this.http.HttpPostFile(url, uploadFile);
  }
  familyFiles(corporateFieldsFiles: any, loginId: any): any {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    var securityToken = (obj.data[0].UserLog.SecurityToken);
    var url = this.patientRootUrl + '/saveReport' + '?id=' + loginId + '&token=' + securityToken;
    return this.http.HttpPostFile(url, corporateFieldsFiles);
  }
  createPatientReport(reportData: any, loginId: any): any {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    var securityToken = (obj.data[0].UserLog.SecurityToken);
    var url = this.patientRootUrl + '/create' + '?id=' + loginId + '&token=' + securityToken;
    return this.http.HttpPost(url, reportData);
  }

}