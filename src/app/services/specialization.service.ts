import { Injectable } from '@angular/core';
import { HttpService } from '../network/http.servie';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './URL';

@Injectable({
    providedIn: 'root'
})
export class SpecializationService {
    // rootUrl: string = "http://vaidhya.vbbsolutions.com:8080/api";
    // rootUrl: string = "http://localhost:8081/api";
    rootUrl: string = environment.rootUrl;
    userRootUrl: string = this.rootUrl + "/specialization";
    securityToken: any;

    constructor(
        private http: HttpService,
        private cookieService: CookieService
    ) { }
    getSpecializations(UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        if (this.securityToken && this.securityToken != undefined && this.securityToken != null) {
            var url = this.userRootUrl + '/get?id=' + UserId + '&token=' + this.securityToken;
            return this.http.HttpGet(url);
        }
    }
    getSpecializationsForHomePage(): any {
        var url = this.userRootUrl + '/getSpecializations';
        return this.http.HttpGet(url);

    }
}