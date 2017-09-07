import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TemplateRoutingModule} from './template-routing.module';
import {TemplateComponent} from './components/template/template.component';
import {SharedModule} from '../shared/shared.module';
import {TemplateApiService} from './services/template-api.service';
import {LayoutService} from '../layout/services/layout.service';
import { AddTemplateComponent } from './components/add-template/add-template.component';
import { AddFilterComponent } from './components/add-filter/add-filter.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TemplateRoutingModule
  ],
  providers: [
    TemplateApiService
  ],
  declarations: [TemplateComponent, AddTemplateComponent, AddFilterComponent],
  entryComponents: [AddTemplateComponent, AddFilterComponent],
})
export class TemplateModule {
  constructor(private layoutService: LayoutService) {
    this.layoutService.setSideNavRoute('user');
  }
}
