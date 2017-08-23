import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpObserve} from "@angular/common/http/src/client";

export declare type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export declare type HttpObserveType = HttpEvent<ArrayBuffer> | HttpEvent<Blob> | HttpEvent<string> | HttpEvent<any> | HttpResponse<ArrayBuffer> | HttpResponse<Blob> | HttpResponse<string> | HttpResponse<Object> | HttpResponse<any> | ArrayBuffer | Blob | string | Object | any;

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient
  ) {

  }

  get(url: string, options: {
    body?: any;
    headers?: HttpHeaders;
    observe?: HttpObserve;
    params?: HttpParams;
    reportProgress?: boolean;
    responseType: HttpResponseType;
    withCredentials?: boolean;
  }): Observable<HttpObserveType> {
    return this.http.request(url, null, options);
  }
  delete(url: string, options: {
    body?: any;
    headers?: HttpHeaders;
    observe?: HttpObserve;
    params?: HttpParams;
    reportProgress?: boolean;
    responseType: HttpResponseType;
    withCredentials?: boolean;
  }): Observable<HttpObserveType>{
    return this.http.request(url, null, options);
  }
  patch(url: string, body: any | null, options: {
    body?: any;
    headers?: HttpHeaders;
    observe?: HttpObserve;
    params?: HttpParams;
    reportProgress?: boolean;
    responseType: HttpResponseType;
    withCredentials?: boolean;
  }): Observable<HttpObserveType>{
    return this.http.request(url, body, options);
  }
  post(url: string, body: any | null, options: {
    body?: any;
    headers?: HttpHeaders;
    observe?: HttpObserve;
    params?: HttpParams;
    reportProgress?: boolean;
    responseType: HttpResponseType;
    withCredentials?: boolean;
  }): Observable<HttpObserveType>{
    return this.http.request(url, body, options);
  }
  put(url: string, body: any | null, options: {
    body?: any;
    headers?: HttpHeaders;
    observe?: HttpObserve;
    params?: HttpParams;
    reportProgress?: boolean;
    responseType: HttpResponseType;
    withCredentials?: boolean;
  }): Observable<HttpObserveType>{
    return this.http.request(url, body, options);
  }

  private request(method: string, url: string, options: {
    body?: any;
    headers?: HttpHeaders;
    observe?: HttpObserve;
    params?: HttpParams;
    reportProgress?: boolean;
    responseType: HttpResponseType;
    withCredentials?: boolean;
  }): Observable<HttpObserveType>{
    return this.http.request(method, url, options);
  }

}
