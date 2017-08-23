import {NgModule,} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {FlexLayoutModule,} from '@angular/flex-layout';
import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentJsonFormatterModule,
  CovalentChipsModule, CovalentExpansionPanelModule, CovalentFileModule,
} from '@covalent/core';
import {
  MdButtonModule, MdCardModule, MdIconModule,
  MdListModule, MdMenuModule, MdTooltipModule,
  MdSlideToggleModule, MdInputModule, MdCheckboxModule,
  MdToolbarModule, MdSnackBarModule, MdSidenavModule,
  MdTabsModule, MdSelectModule, MdAutocompleteModule,
  MdChipsModule, MdCommonModule, MdCoreModule, MdDatepickerModule,
  MdGridListModule, MdProgressBarModule, MdOptionModule,
  MdProgressSpinnerModule, MdNativeDateModule, MdLineModule,
  MdDialogModule, OverlayModule, MdSelectionModule, MdTableModule,
  A11yModule, BidiModule, MdExpansionModule, MdPaginatorModule, MdSortModule,
  MdSliderModule, ObserveContentModule, StyleModule, ScrollDispatchModule,
  PortalModule, PlatformModule, MdRadioModule,
} from '@angular/material';
import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';


import {DataTableModule} from 'primeng/components/datatable/datatable';
import {DataGridModule} from 'primeng/components/datagrid/datagrid';
import {DataListModule} from 'primeng/components/datalist/datalist';
import {TreeModule} from 'primeng/components/tree/tree';
import {TreeTableModule} from 'primeng/components/treetable/treetable';
import {SharedModule as PrimeSharedModule} from 'primeng/components/common/shared';
import {ChartModule} from 'primeng/components/chart/chart';
import {HttpModule} from '../http/http.module';
import {CdkTableModule} from '@angular/cdk';

const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const PRIME_NG_MODULES: any[] = [
  DataTableModule, DataGridModule, DataListModule, TreeModule,
  TreeTableModule, PrimeSharedModule, ChartModule
];

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule,
];
const MATERIAL_MODULES: any[] = [
  MdButtonModule, MdCardModule, MdIconModule,
  MdListModule, MdMenuModule, MdTooltipModule,
  MdSlideToggleModule, MdInputModule, MdCheckboxModule,
  MdToolbarModule, MdSnackBarModule, MdSidenavModule,
  MdTabsModule, MdSelectModule, MdAutocompleteModule,
  MdChipsModule, MdCommonModule, MdCoreModule, MdDatepickerModule,
  MdGridListModule, MdProgressBarModule, MdOptionModule,
  MdProgressSpinnerModule, MdNativeDateModule, MdLineModule,
  MdDialogModule, OverlayModule, MdSelectionModule, MdTableModule,
  A11yModule, BidiModule, MdExpansionModule, MdPaginatorModule, MdSortModule,
  MdSliderModule, ObserveContentModule, StyleModule, ScrollDispatchModule,
  PortalModule, PlatformModule, MdRadioModule, CdkTableModule
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentJsonFormatterModule,
  CovalentChipsModule, CovalentExpansionPanelModule, CovalentFileModule,
  CovalentDynamicFormsModule,
];

const HTTP_MODULE: any[] = [
  HttpModule
];

@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    FLEX_LAYOUT_MODULES,
    PRIME_NG_MODULES,
    HTTP_MODULE
  ],
  declarations: [ ],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    FLEX_LAYOUT_MODULES,
    PRIME_NG_MODULES,
    HTTP_MODULE
  ],
  entryComponents: []
})
export class SharedModule {
}
