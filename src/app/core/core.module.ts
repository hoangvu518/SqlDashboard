import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DbSearchService } from './services';

@NgModule({
  providers: [ApiService, DbSearchService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. CoreModule MUST be imported in the AppModule only. Duplicate import of CoreModule is errorous.'
      );
    }
  }
}
