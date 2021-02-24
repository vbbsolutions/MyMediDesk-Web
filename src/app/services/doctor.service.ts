import { Injectable } from '@angular/core';
import { HttpService } from '../network/http.servie';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './URL';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    //rootUrl: string = "http://www.mymedidesk.com:8080/api";
    // rootUrl: string = "http://localhost:8081/api";
    rootUrl: string = environment.rootUrl;
    userRootUrl: string = this.rootUrl + "/hospital";
    doctorRootUrl: string = this.rootUrl + "/doctor";

    securityToken: any;
    constructor(
        private http: HttpService,
        private cookieService: CookieService
    ) { }

    login(doctorData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/login', doctorData);
    }
    registerData(registerData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/register', registerData);
    }
    doctorRegister(registerData: any, UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.doctorRootUrl + '/save' + '?id=' + UserId + '&token=' + securityToken;
            return this.http.HttpPost(url, registerData);
        }
    }
    authenticate(OTPData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/authenticate', OTPData);
    }
    doctorAuthenticate(OTPData: any): any {
        return this.http.HttpPost(this.doctorRootUrl + '/authenticate', OTPData);
    }
    authenticateAgain(OTPData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/resendCode', OTPData);
    }
    doctorAuthenticateAgain(OTPData: any): any {
        return this.http.HttpPost(this.doctorRootUrl + '/resendCode', OTPData);
    }
    save(doctorData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/save', doctorData);
    }

    EmailData(EmailData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/forgotPassword', EmailData);
    }
    passwordReset(userPwdResetData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/resetPassword', userPwdResetData);
    }
    updatePassword(updatePwdData: any, UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/updatePassword' + '?id=' + UserId + '&token=' + securityToken;
            return this.http.HttpPost(url, updatePwdData);
        }
    }
    getDoctorsBySpecialization(UserId: any) {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/get?id=' + UserId + '&token=' + securityToken;
            return this.http.HttpGet(url);
        }
    }
    public getDoctorsBySpecializationId(hospitalId: any, specializationId: any, UserId: any) {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/getByHospitalSpecializationId/' + hospitalId + '/' + specializationId + '?id=' + UserId + '&token=' + securityToken;
            return this.http.HttpGet(url);
        }
    }
    public getDoctorList(UserId: any) {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.doctorRootUrl + '/get/?id=' + UserId + '&token=' + securityToken;
            return this.http.HttpGet(url);
        }
    }
    public getDoctorsByHospitalId(loginId: any) {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.doctorRootUrl + '/getByHopsitalId/' + loginId + '?id=' + loginId + '&token=' + securityToken;
            return this.http.HttpGet(url);
        }
    }
    public getDoctorById(UserId: any, doctorId) {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.doctorRootUrl + '/getById/' + doctorId + '/?id=' + UserId + '&token=' + securityToken;
            return this.http.HttpGet(url);
        }
    }
    doctorUpdate(updateData: any, hospitalId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.doctorRootUrl + '/edit/?id=' + hospitalId + '&token=' + securityToken;
            return this.http.HttpPost(url, updateData);
        }
    }
    doctorDelete(deletedoctorId: any, loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.doctorRootUrl + '/delete/' + deletedoctorId.id + '?id=' + loginId + '&token=' + securityToken;
            return this.http.HttpPost(url, deletedoctorId);
        }
    }
    doctorProfilePic(doctorProfilePic: any, loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.doctorRootUrl + '/uploadImage' + '?id=' + loginId + '&token=' + securityToken;
        return this.http.HttpPostFile(url, doctorProfilePic);
    }
}