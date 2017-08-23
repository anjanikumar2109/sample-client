import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'template',
        pathMatch: 'full'
      },
      {
        path: 'template',
        loadChildren: '../template/template.module#TemplateModule'
      },
      {
        path: 'flow',
        loadChildren: '../flow/flow.module#FlowModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
