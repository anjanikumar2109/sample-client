import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TemplateRoutingModule} from './template-routing.module';
import {TemplateComponent} from './components/template/template.component';
import {SharedModule} from '../shared/shared.module';
import {TemplateApiService} from './services/template-api.service';
import {LayoutService} from '../layout/services/layout.service';
import { AddTemplateComponent } from './components/add-template/add-template.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TemplateRoutingModule
  ],
  providers: [
    TemplateApiService
  ],
  declarations: [TemplateComponent, AddTemplateComponent],
  entryComponents: [AddTemplateComponent],
})
export class TemplateModule {
  constructor(private layoutService: LayoutService) {
    this.layoutService.setSideNavRoute('user');
  }
}
