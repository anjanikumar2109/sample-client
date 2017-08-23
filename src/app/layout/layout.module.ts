import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {MainComponent} from './components/main/main.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {SharedModule} from '../shared/shared.module';
import {LayoutService} from './services/layout.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
  ],
  providers: [
    LayoutService
  ],
  declarations: [MainComponent, FooterComponent, HeaderComponent, SidenavComponent],
  entryComponents: []
})
export class LayoutModule {
}
