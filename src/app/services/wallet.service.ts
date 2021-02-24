import { Injectable } from '@angular/core';
import { HttpService } from '../network/http.servie';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './URL';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  //rootUrl: string = "http://www.mymedidesk.com:8080/api";
  // rootUrl: string = "http://localhost:8081/api";
  rootUrl: string = environment.rootUrl;
  walletRootUrl: string = this.rootUrl + "/walletRequest";
  walletRequestUrl: string = this.rootUrl + "/wallet";

  securityToken: any;
  constructor(
    private http: HttpService,
    private cookieService: CookieService
  ) { }

  walletRequestFile(walletRequestFile: any, loginId: any): any {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    var securityToken = (obj.data[0].UserLog.SecurityToken);
    var url = this.walletRootUrl + '/saveReport' + '?id=' + loginId + '&token=' + securityToken;
    return this.http.HttpPostFile(url, walletRequestFile);
  }
  walletCreation(walletCreationData: any, loginId: any): any {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    var securityToken = (obj.data[0].UserLog.SecurityToken);
    if (securityToken && securityToken != undefined && securityToken != null) {
      var url = this.walletRootUrl + '/create' + '?id=' + loginId + '&token=' + securityToken;
      return this.http.HttpPost(url, walletCreationData);
    }
  }
  getWalletAmount(loginId: any): any {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.securityToken = (obj.data[0].UserLog.SecurityToken);
    if (this.securityToken && this.securityToken != undefined && this.securityToken != null) {
      var url = this.walletRequestUrl + '/getBalance/' + loginId + '?id=' + loginId + '&token=' + this.securityToken;
      return this.http.HttpGet(url);
    }
  }
}