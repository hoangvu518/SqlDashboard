import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './layout';

import { MaterialModule } from './lib/material/material.module';
// import { JspdfModule } from './lib/material/jspdf.module';
// import {jsPDF} from 'jspdf';

@NgModule({
  declarations: [HeaderComponent],
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
