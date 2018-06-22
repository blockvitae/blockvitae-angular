import { DashboardModule } from './modules/dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FrontModule } from './modules/front/front.module';
import { blockvitaeRoutes } from './routes/blockvitae-routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    FrontModule,
    BrowserAnimationsModule,
    DashboardModule, 
    RouterModule.forRoot(blockvitaeRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
