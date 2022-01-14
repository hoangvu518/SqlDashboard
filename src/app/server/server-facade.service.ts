import { Injectable } from '@angular/core';
import { Environment, SQLVersion, Status } from '@core/models';
import { Server } from '@core/models/server';
import { ServerResultDto, ServerService, QueryParams } from '@core/services';
import { LookupService } from '@core/services/lookup.service';
import {
  BehaviorSubject,
  Observable,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';
export interface ColumnDefinition {
  columnDef: string;
  header: string;
  cell: (x: Server) => string;
  isDisplayed: boolean;
}

export interface State {
  columnsDefinition: ColumnDefinition[];
  queryParams: QueryParams;
}

const initialState = {
  columnsDefinition: [
    {
      columnDef: 'Id',
      header: 'Id',
      cell: (element: Server) => `${element.Id}`,
      isDisplayed: true,
    },
    {
      columnDef: 'PhysicalName',
      header: 'Physical Name',
      cell: (element: Server) => `${element.PhysicalName}`,
      isDisplayed: true,
    },
    {
      columnDef: 'AliasName',
      header: 'Alias Name',
      cell: (element: Server) => `${element.AliasName}`,
      isDisplayed: true,
    },
    {
      columnDef: 'ProjectName',
      header: 'Project Name',
      cell: (element: Server) => `${element.ProjectName}`,
      isDisplayed: true,
    },
    {
      columnDef: 'Status',
      header: 'Status',
      cell: (element: Server) => `${element.Status.Value}`,
      isDisplayed: true,
    },
    {
      columnDef: 'SQLVersion',
      header: 'SQL Version',
      cell: (element: Server) => `${element.SQLVersion.Value}`,
      isDisplayed: true,
    },
    {
      columnDef: 'Environment',
      header: 'Environment',
      cell: (element: Server) => `${element.Environment.Value}`,
      isDisplayed: true,
    },
    {
      columnDef: 'DBASupport',
      header: 'DBA Support',
      cell: (element: Server) => `${element.DBASupporters}`,
      isDisplayed: true,
    },
    {
      columnDef: 'SMSSupport',
      header: 'SMS Support',
      cell: (element: Server) => `${element.SMSSupporters}`,
      isDisplayed: true,
    },
    {
      columnDef: 'BusinessOwners',
      header: 'Business Owners',
      cell: (element: Server) => `${element.BusinessOwners}`,
      isDisplayed: true,
    },
    {
      columnDef: 'Action',
      header: 'Action',
      cell: (element: Server) => `${element.Id}`,
      isDisplayed: true,
    },
  ],
  queryParams: {
    pageIndex: 0,
    pageSize: 10,
    sortBy: 'PhysicalName',
    order: 'asc',
    filterBy: 'PhysicalName',
    filterValue: '',
  },
} as State;

@Injectable()
export class ServerFacadeService {
  private _state = initialState;
  private _state$ = new BehaviorSubject<State>(this._state);
  private _updatedServer$ = new Subject<Server>();

  get state$() {
    return this._state$.asObservable().pipe(shareReplay(1));
  }

  get allColumns$() {
    return this._state$.pipe(
      switchMap((x) => {
        let allColumns = x.columnsDefinition.map((x) => x.columnDef);
        return new BehaviorSubject(allColumns);
      })
    );
  }

  get displayedColumns$() {
    return this._state$.pipe(
      switchMap((x) => {
        let displayedColumns = x.columnsDefinition
          .filter((x) => x.isDisplayed == true)
          .map((x) => x.columnDef);
        return new BehaviorSubject(displayedColumns);
      })
    );
  }

  get hiddenColumns$() {
    return this._state$.pipe(
      switchMap((x) => {
        let hiddenColumns = x.columnsDefinition
          .filter((x) => x.isDisplayed == false)
          .map((x) => x.columnDef);
        return new BehaviorSubject(hiddenColumns);
      })
    );
  }

  get columnsDefinition$() {
    return this._state$.pipe(
      switchMap((x) => new BehaviorSubject(x.columnsDefinition))
    );
  }

  get queryParams$() {
    return this._state$.pipe(
      switchMap((x) => new BehaviorSubject(x.queryParams))
    );
  }

  get updatedServer$() {
    return this._updatedServer$.asObservable();
  }

  constructor(
    private dbSearchService: ServerService,
    private lookupService: LookupService
  ) {}

  private getServersAndCountBy(
    params: QueryParams
  ): Observable<ServerResultDto> {
    return this.dbSearchService.findBy(params).pipe(shareReplay(1));
  }

  getPDFData(): Observable<Server[]> {
    return this.dbSearchService.getPDF(this._state.queryParams);
  }
  getServersAndCount() {
    return this.getServersAndCountBy(this._state.queryParams).pipe(
      shareReplay(1)
    );
  }

  changeDisplayedColumn(columnDef: string, isDisplayed: boolean) {
    let updatedColumnDef = this._state.columnsDefinition.find(
      (x) => x.columnDef == columnDef
    );
    if (updatedColumnDef == null) {
      return;
    }
    let columnDefIndex = this._state.columnsDefinition.findIndex(
      (x) => x.columnDef == columnDef
    );
    updatedColumnDef.isDisplayed = isDisplayed;

    this._state.columnsDefinition[columnDefIndex] = updatedColumnDef;

    this._state$.next(this._state);
  }

  updateFilterBy(filterBy: string, resetPageIndex: boolean = true) {
    if (resetPageIndex) {
      this._state.queryParams.pageIndex = 0;
    }
    this._state.queryParams.filterBy = filterBy;
    this._state$.next(this._state);
  }

  updateSearchValue(searchValue: string, resetPageIndex: boolean = true) {
    if (resetPageIndex) {
      this._state.queryParams.pageIndex = 0;
    }
    this._state.queryParams.filterValue = searchValue;
    this._state$.next(this._state);
  }

  updatePageIndex(pageIndex: number) {
    this._state.queryParams.pageIndex = pageIndex;
    this._state$.next(this._state);
  }

  updateTableRow(row: Server) {
    this._updatedServer$.next(row);
  }
  resetDisplayedColumns() {
    this._state.columnsDefinition.forEach((columnDef) => {
      columnDef.isDisplayed = true;
    });
    this._state$.next(this._state);
  }

  hideAllDisplayedColumns() {
    this._state.columnsDefinition.forEach((columnDef) => {
      columnDef.isDisplayed = false;
    });
    this._state$.next(this._state);
  }

  getServerEnvironments(): Observable<Environment[]> {
    return this.lookupService.getServerEnvironments();
  }

  getServerVersions(): Observable<SQLVersion[]> {
    return this.lookupService.getServerVersions();
  }

  getServerStatuses(): Observable<Status[]> {
    return this.lookupService.getServerStatuses();
  }
}
