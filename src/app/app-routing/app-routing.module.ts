import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormViewComponent} from "../form-view/form-view.component";
import {SectionViewComponent} from "../section-view/section-view.component";
import { TrustAdminComponent } from '../trust-admin/trust-admin.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: FormViewComponent },  
  { path: 'form', pathMatch: 'full', component: FormViewComponent },
  {
    path: 'view',
    component: SectionViewComponent

  },
  {
    path: 'trustAdmin',
    component: TrustAdminComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents = [FormViewComponent];
