import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlowRoutingModule} from './flow-routing.module';
import {FlowComponent} from './components/flow/flow.component';
import {SharedModule} from '../shared/shared.module';
import {FlowApiService} from './services/flow-api.service';
import {LayoutService} from '../layout/services/layout.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlowRoutingModule
  ],
  providers: [
    FlowApiService
  ],
  declarations: [FlowComponent],
  entryComponents: [],
})
export class FlowModule {
  constructor(private layoutService: LayoutService) {
    this.layoutService.setSideNavRoute('user');
  }
}
