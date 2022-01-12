import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule } from './server-routing.module';
import { ServerComponent } from './server.component';
import { SharedModule } from '@shared/shared.module';
import { ServerSearchComponent } from './server-search/server-search.component';
import { ServerTableComponent } from './server-table/server-table.component';
import { ServerFacadeService } from './server-facade.service';
import { ServerColumnFilterComponent } from './server-column-filter/server-column-filter.component';
import { ServerEditComponent } from './server-edit/server-edit.component';

@NgModule({
  declarations: [
    ServerComponent,
    ServerSearchComponent,
    ServerTableComponent,
    ServerColumnFilterComponent,
    ServerEditComponent,
  ],
  imports: [CommonModule, ServerRoutingModule, SharedModule],
  exports: [],
  providers: [ServerFacadeService],
})
export class ServerModule {}
