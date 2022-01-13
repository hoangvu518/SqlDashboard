import { Component, OnDestroy, OnInit } from '@angular/core';
import { Environment, SQLVersion, Status } from '@core/models';
import { Server } from '@core/models/server';
import { ServerResultDto, QueryParams } from '@core/services';
import { Observable, Subscription, switchMap } from 'rxjs';
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
export class ServerComponent implements OnInit, OnDestroy {
  servers!: Server[];
  serverCount!: number;
  // serverCount$!: Observable<number>;
  displayedColumns$!: Observable<string[]>;
  allColumn$!: Observable<string[]>;
  columnsDefinition$!: Observable<ColumnDefinition[]>;
  queryParams$!: Observable<QueryParams>;
  state$!: Observable<State>;

  subscription!: Subscription;
  constructor(private serverFacadeService: ServerFacadeService) {}

  ngOnInit(): void {
    this.state$ = this.serverFacadeService.state$;
    this.displayedColumns$ = this.serverFacadeService.displayedColumns$;
    this.allColumn$ = this.serverFacadeService.allColumns$;
    this.columnsDefinition$ = this.serverFacadeService.columnsDefinition$;
    this.queryParams$ = this.serverFacadeService.queryParams$;

    this.subscription = this.queryParams$
      .pipe(switchMap((x) => this.serverFacadeService.getServersAndCount()))
      .subscribe((x) => {
        this.servers = x.Results;
        this.serverCount = x.TotalCount;
      });
    // this.serverCount$ = this.serverFacadeService.getServerCount();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  changeDisplayedColumns(columnDefObj: ColumnDefinition) {
    this.serverFacadeService.changeDisplayedColumn(
      columnDefObj.columnDef,
      columnDefObj.isDisplayed
    );
  }

  resetDisplayedColumns() {
    this.serverFacadeService.resetDisplayedColumns();
  }

  updatePageIndex(pageIndex: number) {
    this.serverFacadeService.updatePageIndex(pageIndex);
  }

  updateColumnFilter(data: string) {
    this.serverFacadeService.updateFilterBy(data);
  }

  updateSearchValue(data: string) {
    this.serverFacadeService.updateSearchValue(data);
  }
}
