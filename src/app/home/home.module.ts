import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSearchComponent } from './home-search/home-search.component';
import { HomeSearchResultComponent } from './home-search-result/home-search-result.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeColumnFilterComponent } from './home-column-filter/home-column-filter.component';
import { HomeStateService } from './home-state.service';
import { HomeSearchExportComponent } from './home-search-export/home-search-export.component';

@NgModule({
  declarations: [
    HomeSearchComponent,
    HomeSearchResultComponent,
    HomeComponent,
    HomeColumnFilterComponent,
    HomeSearchExportComponent,
  ],
  imports: [HomeRoutingModule, SharedModule],
  providers: [HomeStateService],
})
export class HomeModule {}
