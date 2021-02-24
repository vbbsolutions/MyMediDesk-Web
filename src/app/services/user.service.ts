import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../network/http.servie';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './URL';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    // rootUrl: string = "http://vaidhya.vbbsolutions.com:8080/api";
    // rootUrl: string = "http://localhost:8081/api";
    rootUrl: string = environment.rootUrl;
    userRootUrl: string = this.rootUrl + "/user";

    constructor(
        private http: HttpService,
        private cookieService: CookieService
    ) { }
    login(userData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/login', userData);
    }
    registerData(registerData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/register', registerData);
    }
    save(userData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/save', userData);
    }
    updatePassword(updatePassword: any, UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/updatePassword' + '?id=' + UserId + '&token=' + securityToken;
            return this.http.HttpPost(url, updatePassword);
        }
    }
    EmailData(EmailData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/forgotPassword', EmailData);
    }
    passwordReset(userPwdResetData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/resetPassword', userPwdResetData);
    }
    authenticate(OTPData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/authenticate', OTPData);
    }
    authenticateAgain(OTPData: any): any {
        return this.http.HttpPost(this.userRootUrl + '/resendCode', OTPData);
    }
    public getFGNNumber(): any {
        var url = this.userRootUrl + '/getFGN';
        return this.http.HttpGet(url);
    }
    public getUserCode(FGN: any, UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/getUserCode/' + FGN + '?id=' + UserId + '&token=' + securityToken;
            return this.http.HttpGet(url);
        }
    }
    public saveFamilyMember(familyData: any, UserId: any,): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            return this.http.HttpPost(this.userRootUrl + '/saveMember?id=' + UserId + '&token=' + securityToken, familyData);
        }
    }
    public getFamilyList(FGN: any, UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/getFamilyMembers/' + FGN + '?id=' + UserId + '&token=' + securityToken;
            return this.http.HttpGet(url);
        }
    }
    updateUserProfile(userProfileData: any, loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/edit' + '?id=' + loginId + '&token=' + securityToken;
            return this.http.HttpPost(url, userProfileData);
        }
    }
    public getUsers(loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/get/' + '?id=' + loginId + '&token=' + securityToken;
            return this.http.HttpGet(url);
        }
    }
    public getUserById(loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/getById/' + loginId + '?id=' + loginId + '&token=' + securityToken;
            return this.http.HttpGet(url);
        }
    }
    userProfilePic(userProPicData: any, loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/uploadImage' + '?id=' + loginId + '&token=' + securityToken;
        return this.http.HttpPostFile(url, userProPicData);
    }
    reAuthenticate(emailUpdateDateData: any, loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/reauthenticate' + '?id=' + loginId + '&token=' + securityToken;
        return this.http.HttpPostFile(url, emailUpdateDateData);
    }
}