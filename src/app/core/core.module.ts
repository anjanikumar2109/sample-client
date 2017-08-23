import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
// (optional) Additional Covalent Modules imports
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {RootComponent} from './components/root/root.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoaderComponent} from './components/loader/loader.component';
import {SharedModule} from '../shared/shared.module';
import {LoaderService} from './services/loader.service';
import {UtilService} from './services/util.service';
import {DialogModule} from 'primeng/components/dialog/dialog';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    DialogModule,
  ],
  declarations: [RootComponent, NotFoundComponent, LoaderComponent],
  providers: [
    LoaderService,
    UtilService
  ],
  bootstrap: [RootComponent],
})
export class CoreModule {
}
