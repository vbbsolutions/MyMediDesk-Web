import { Injectable } from '@angular/core';
import { HttpService } from '../network/http.servie';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './URL';

@Injectable({
    providedIn: 'root'
})
export class PatientInsuranceService {
    // rootUrl: string = "http://vaidhya.vbbsolutions.com:8080/api";
    // rootUrl: string = "http://localhost:8081/api";
    rootUrl: string = environment.rootUrl;
    userRootUrl: string = this.rootUrl + "/PatientInsurance";

    constructor(
        private http: HttpService,
        private cookieService: CookieService
    ) { }

    save(corporateDataFields: any, UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/create' + '?id=' + UserId + '&token=' + securityToken;
        return this.http.HttpPost(url, corporateDataFields);
    }
    public getPatientInsuranceDetails(UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/getByUserId/' + UserId + '?id=' + UserId + '&token=' + securityToken;
        return this.http.HttpGet(url);
    }
}