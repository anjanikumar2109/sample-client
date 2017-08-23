import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: 'app', loadChildren: '../layout/layout.module#LayoutModule'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      enableTracing: false
    })],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
/*
 * ,
 preloadingStrategy: PreloadAllModules
 * */
