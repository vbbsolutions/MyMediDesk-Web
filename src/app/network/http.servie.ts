import { Injectable, Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { ContextService } from './context.service';
//import 'rxjs/rxjs-operators';
//import { ClientState } from 'common/clientstate';

@Injectable()
export class HttpService {
    http: HttpClient;
    //contentService: ContextService;
    constructor(@Inject(HttpClient) _http: HttpClient,
        //@Inject(ContextService) _contentService: ContextService
    ) {
        this.http = _http;
        //this.contentService = _contentService;
    }
    private getAuthorizationHeader() {
        var accessToken = localStorage.getItem("securityToken");//this.contentService.getAccessToken();
        return "Bearer " + accessToken;
    }
    HttpPostFile(url: string, body: any, authenticatedRequest: boolean = false) {
        let headers = authenticatedRequest ?
            new HttpHeaders({ 'Content-Type': 'multipart/form-data; charset=utf-8', 'Accept': 'application/json, text/javascript, */*; q=0.01', 'Authorization': this.getAuthorizationHeader() }) :
            new HttpHeaders({ 'Content-Type': 'multipart/form-data; charset=utf-8', 'Accept': 'application/json, text/javascript, */*; q=0.01' });
        let options = { headers: headers };
        return this.http.post(url, body);
    }
    HttpPost(url: string, body: string, authenticatedRequest: boolean = false) {
        let headers = authenticatedRequest ?
            new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, */*; q=0.01', 'Authorization': this.getAuthorizationHeader() }) :
            new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, */*; q=0.01' });
        let options = { headers: headers };
        return this.http.post(url, body, options);
    }
    HttpPostHeader(url: string, headers: HttpHeaders, body: string) {

        let options = { headers: headers };
        return this.http.post(url, body, options);
    }
    HttpGet(url: string, authenticatedRequest: boolean = false) {
        let headers = authenticatedRequest ?
            new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, */*; q=0.01', 'Authorization': this.getAuthorizationHeader() }) :
            new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, */*; q=0.01' });

        let options = { headers: headers };
        return this.http.get(url, options);
    }
    HttpDownload(url: string) {
        let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, */*; q=0.01' });
        let options = { headers: httpHeaders };
        return this.http.get(url, options);
    }
    HttpPostDownload(url: string, body: string) {
        let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, */*; q=0.01' });
        let options = { headers: httpHeaders };
        return this.http.post(url, body, options);
    }
}    
