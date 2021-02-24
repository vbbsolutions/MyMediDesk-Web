import { Injectable } from '@angular/core';
import { HttpService } from '../network/http.servie';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './URL';

@Injectable({
  providedIn: 'root'
})
export class WalletRequestDetailsService {
  //rootUrl: string = "http://www.mymedidesk.com:8080/api";
  // rootUrl: string = "http://localhost:8081/api";
  rootUrl: string = environment.rootUrl;
  walletRootUrl: string = this.rootUrl + "/walletRequestDetails";

  constructor(
    private http: HttpService,
    private cookieService: CookieService
  ) { }
  getWalletRequestDetails(loginId: any): any {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    var securityToken = (obj.data[0].UserLog.SecurityToken);
    if (securityToken && securityToken != undefined && securityToken != null) {
      var url = this.walletRootUrl + '/getByUserId/' + loginId + '?id=' + loginId + '&token=' + securityToken;
      return this.http.HttpGet(url);
    }
  }
  walletRequestDetailsFile(walletRequestDetailsFile: any, loginId: any): any {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    var securityToken = (obj.data[0].UserLog.SecurityToken);
    var url = this.walletRootUrl + '/saveReport' + '?id=' + loginId + '&token=' + securityToken;
    return this.http.HttpPostFile(url, walletRequestDetailsFile);
  }
  walletRequestDetailsCreation(bankDetails: any, loginId: any): any {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    var securityToken = (obj.data[0].UserLog.SecurityToken);
    if (securityToken && securityToken != undefined && securityToken != null) {
      var url = this.walletRootUrl + '/create' + '?id=' + loginId + '&token=' + securityToken;
      return this.http.HttpPost(url, bankDetails);
    }
  }
}