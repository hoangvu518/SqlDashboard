import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DbSearchService } from './services';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ApiService, DbSearchService],
})
export class CoreModule {}
