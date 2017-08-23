import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpService} from "./services/http.service";
import {HttpInterceptorService} from "./services/http-interceptor.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    HttpService,
  ],
  declarations: []
})
export class HttpModule { }
