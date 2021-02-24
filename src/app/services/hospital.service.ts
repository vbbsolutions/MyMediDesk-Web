import { Injectable } from '@angular/core';
import { HttpService } from '../network/http.servie';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './URL';

@Injectable({
    providedIn: 'root'
})
export class HospitalService {
    // rootUrl: string = "http://vaidhya.vbbsolutions.com:8080/api";
    // rootUrl: string = "http://localhost:8081/api";
    rootUrl: string = environment.rootUrl;
    userRootUrl: string = this.rootUrl + "/hospital";
    securityToken: any;
    constructor(
        private http: HttpService,
        private cookieService: CookieService
    ) { }
    public getHospitalListForHomePage(): any {
        var url = this.userRootUrl + '/gethospitals';
        return this.http.HttpGet(url);
    }
    public getHospitalList(UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        if (this.securityToken && this.securityToken != undefined && this.securityToken != null) {
            var url = this.userRootUrl + '/get/?id=' + UserId + '&token=' + this.securityToken;
            return this.http.HttpGet(url);
        }
    }
    public getSpecializationByHospitalId(hospitalId: any, UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        if (this.securityToken && this.securityToken != undefined && this.securityToken != null) {
            var url = this.userRootUrl + '/getSpecializationByHospitalId/' + hospitalId + '?id=' + UserId + '&token=' + this.securityToken;
            return this.http.HttpGet(url);
        }
    }
    public getHospitals(loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        if (this.securityToken && this.securityToken != undefined && this.securityToken != null) {
            var url = this.userRootUrl + '/get/?id=' + loginId + '&token=' + this.securityToken;
            return this.http.HttpGet(url);
        }
    }
    updateHospitalProfile(hospitalProfileData: any, loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/edit' + '?id=' + loginId + '&token=' + securityToken;
            return this.http.HttpPost(url, hospitalProfileData);
        }
    }
    hospitalProfilePic(hospitalProPicData: any, loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/uploadImage' + '?id=' + loginId + '&token=' + securityToken;
        return this.http.HttpPostFile(url, hospitalProPicData);
    }
    public getHospitalById(loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/getById/' + loginId + '?id=' + loginId + '&token=' + securityToken;
            return this.http.HttpGet(url);
        }
    }
    authenticateAgain(OTPData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/resendCode', OTPData);
    }
    reAuthenticate(emailUpdateDateData: any, loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/reauthenticate' + '?id=' + loginId + '&token=' + securityToken;
        return this.http.HttpPostFile(url, emailUpdateDateData);
    }
}