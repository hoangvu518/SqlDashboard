import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeColumnFilterComponent } from './home-column-filter/home-column-filter.component';
import { HomeFacadeService } from './home-facade.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeSearchExportComponent } from './home-search-export/home-search-export.component';
import { HomeSearchResultComponent } from './home-search-result/home-search-result.component';
import { HomeSearchComponent } from './home-search/home-search.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeSearchComponent,
    HomeSearchResultComponent,
    HomeComponent,
    HomeColumnFilterComponent,
    HomeSearchExportComponent,
  ],
  imports: [HomeRoutingModule, SharedModule],
  providers: [HomeFacadeService],
})
export class HomeModule {}
