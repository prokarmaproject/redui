import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule, routedComponents} from "./app-routing/app-routing.module";
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { SendToApiComponent } from './send-to-api/send-to-api.component';
import {APIWrapperService} from './apiwrapper.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SectionTreeComponent } from './section-tree/section-tree.component';
import { MainComponent } from './main/main.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { FormViewComponent } from './form-view/form-view.component';
import { FocusDirective } from './form-view/form-view.component';
import { EscapeHtmlPipe } from './form-view/form-view.component';
import {DataService} from "./data.service";
import { SectionViewComponent } from './section-view/section-view.component';
import { TrustAdminComponent } from './trust-admin/trust-admin.component';
import { AlertComponent } from './alert/alert.component';
import { SortGridPipe } from './trust-admin/trust-admin.component';
import {SortPipe} from './section-view/section-view.component';
import { SimpleTinyComponent } from './tinymce.component';

@NgModule({
  declarations: [
    AppComponent,
    SendToApiComponent,
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SectionTreeComponent,
    MainComponent,
    TreeviewComponent,
	FormViewComponent,
  SectionViewComponent,
  TrustAdminComponent,
	AlertComponent,
  routedComponents,
  FocusDirective,
  EscapeHtmlPipe,
  SortGridPipe,
  SortPipe,
  SimpleTinyComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DragulaModule,
    CommonModule,
    AppRoutingModule,
    BootstrapModalModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    AlertComponent
  ],
  providers: [APIWrapperService,DataService, { provide: APP_BASE_HREF, useValue: './' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
