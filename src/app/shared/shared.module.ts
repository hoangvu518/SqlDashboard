import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './layout';

import { MaterialModule } from './libs/material.module';
import { LayoutDefaultComponent } from './layout/layout-default/layout-default.component';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';

@NgModule({
  declarations: [HeaderComponent, LayoutDefaultComponent, LayoutDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    //angular
    MaterialModule,

    //local
    HeaderComponent,
  ],
})
export class SharedModule {}
