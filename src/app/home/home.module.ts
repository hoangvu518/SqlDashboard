import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSearchComponent } from './home-search.component';
import { HomeSearchResultComponent } from './home-search-result.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { HomeColumnFilterComponent } from './home-column-filter.component';

@NgModule({
  declarations: [
    HomeSearchComponent,
    HomeSearchResultComponent,
    HomeComponent,
    HomeColumnFilterComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, CoreModule],
})
export class HomeModule {}
