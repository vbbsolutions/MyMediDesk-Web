import { Injectable } from '@angular/core';
import { HttpService } from '../network/http.servie';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './URL';

@Injectable({
    providedIn: 'root'
})
export class SlotsService {
    // rootUrl: string = "http://vaidhya.vbbsolutions.com:8080/api";
    // rootUrl: string = "http://localhost:8081/api";
    rootUrl: string = environment.rootUrl;
    userRootUrl: string = this.rootUrl + "/Slots";
    securityToken: any;

    constructor(
        private http: HttpService,
        private cookieService: CookieService
    ) { }
    slotData(slotData: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/createSlot' + '?id=1&token=' + this.securityToken;
        return this.http.HttpPost(url, slotData);
    }
    // getSlotList(DoctorId: any): any {
    //     var url = this.userRootUrl + '/getByDoctorId/' + DoctorId + '?id=1&token=' + this.securityToken;
    //     return this.http.HttpGet(url);
    // }
    // getSlotList(loginId: any): any {
    //     var obj = JSON.parse(this.cookieService.get('AppUser'));
    //     this.securityToken = (obj.data[0].UserLog.SecurityToken);
    //     var url = this.userRootUrl + '/get?id=' + loginId + '&token=' + this.securityToken;
    //     return this.http.HttpGet(url);
    // }
    getSlotListByHospitalId(loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/getByHospitalId/' + loginId + '?id=' + loginId + '&token=' + this.securityToken;
        return this.http.HttpGet(url);
    }
    getSlotIdData(getSlotIdData: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/getById/' + getSlotIdData + '?id=1&token=' + this.securityToken;
        return this.http.HttpGet(url);
    }
    updateslotDataFun(updateslotData: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/editSlot' + '?id=1&token=' + this.securityToken;
        return this.http.HttpPost(url, updateslotData);
    }
    deleteSlot(updateslotData: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/editSlot' + '?id=1&token=' + this.securityToken;
        return this.http.HttpPost(url, updateslotData);
    }
    getSlotDetails(UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        var url = this.userRootUrl + '/getSlotDetails?id=' + UserId + '&token=' + this.securityToken;
        return this.http.HttpGet(url);
    }
    getSlotsByDoctorId(DoctorId: any, UserId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        this.securityToken = (obj.data[0].UserLog.SecurityToken);
        if (this.securityToken && this.securityToken != undefined && this.securityToken != null) {
            var url = this.userRootUrl + '/getByDoctorId/' + DoctorId + '?id=' + UserId + '&token=' + this.securityToken;
            return this.http.HttpGet(url);
        }
    }
    cancelSlot(cancelSlotData: any, loginId: any): any {
        var obj = JSON.parse(this.cookieService.get('AppUser'));
        var securityToken = (obj.data[0].UserLog.SecurityToken);
        if (securityToken && securityToken != undefined && securityToken != null) {
            var url = this.userRootUrl + '/changeSlotStatus' + '?id=' + loginId + '&token=' + securityToken;
            return this.http.HttpPost(url, cancelSlotData);
        }
    }
}