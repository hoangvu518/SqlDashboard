import { Component, OnInit } from '@angular/core';
import { QueryParams } from '@core/services';
import { Observable, Subscription } from 'rxjs';
import {
  ColumnDefinition,
  ServerFacadeService,
  State,
} from './server-facade.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent implements OnInit {
  displayedColumns$!: Observable<string[]>;
  allColumn$!: Observable<ReadonlyArray<string>>;
  columnsDefinition$!: Observable<ReadonlyArray<ColumnDefinition>>;
  queryParams$!: Observable<QueryParams>;
  queryParam!: QueryParams;
  state$!: Observable<State>;
  subscription!: Subscription;
  constructor(private databaseFacadeService: ServerFacadeService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.state$ = this.databaseFacadeService.state$;
    this.displayedColumns$ = this.databaseFacadeService.displayedColumns$;
    this.allColumn$ = this.databaseFacadeService.allColumns$;
    this.columnsDefinition$ = this.databaseFacadeService.columnsDefinition$;
    this.queryParams$ = this.databaseFacadeService.queryParams$;

    this.subscription = this.databaseFacadeService.queryParams$.subscribe(
      (x) => (this.queryParam = x)
    );
  }

  changeDisplayedColumns(displayedColumns: string[]) {
    this.databaseFacadeService.changeDisplayedColumns(displayedColumns);
  }

  changeColumnFilter(data: string) {
    this.databaseFacadeService.updateFilterBy(data);
  }

  changeFilterValue(data: string) {
    this.databaseFacadeService.updateFilterValue(data);
  }
}
