import { Injectable } from '@angular/core';
import { Server } from '@core/models/server';
import { DBResultDto, DbSearchService, QueryParams } from '@core/services';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
export interface ColumnDefinition {
  columnDef: string;
  header: string;
  cell: (x: Server) => string;
}

export interface State {
  allColumns: ReadonlyArray<string>;
  displayedColumns: string[];
  columnsDefinition: ReadonlyArray<ColumnDefinition>;
  queryParams: QueryParams;
}

const initialState = {
  allColumns: [
    'Id',
    'PhysicalName',
    'AliasName',
    'ProjectName',
    'Status',
    'SQLVersion',
    'Environment',
    'DBASupport',
    'SMSSupport',
    'BusinessOwners',
    'Action',
  ],
  displayedColumns: [
    'Id',
    'PhysicalName',
    'AliasName',
    'ProjectName',
    'Status',
    'SQLVersion',
    'Environment',
    'DBASupport',
    'SMSSupport',
    'BusinessOwners',
    'Action',
  ],
  columnsDefinition: [
    {
      columnDef: 'Id',
      header: 'Id',
      cell: (element: Server) => `${element.Id}`,
    },
    {
      columnDef: 'PhysicalName',
      header: 'Physical Name',
      cell: (element: Server) => `${element.PhysicalName}`,
    },
    {
      columnDef: 'AliasName',
      header: 'Alias Name',
      cell: (element: Server) => `${element.AliasName}`,
    },
    {
      columnDef: 'ProjectName',
      header: 'Project Name',
      cell: (element: Server) => `${element.ProjectName}`,
    },
    {
      columnDef: 'Status',
      header: 'Status',
      cell: (element: Server) => `${element.Status.Value}`,
    },
    {
      columnDef: 'SQLVersion',
      header: 'SQL Version',
      cell: (element: Server) => `${element.SQLVersion.Value}`,
    },
    {
      columnDef: 'Environment',
      header: 'Environment',
      cell: (element: Server) => `${element.Environment.Value}`,
    },
    {
      columnDef: 'DBASupport',
      header: 'DBA Support',
      cell: (element: Server) => `${element.DBASupporters}`,
    },
    {
      columnDef: 'SMSSupport',
      header: 'SMS Support',
      cell: (element: Server) => `${element.SMSSupporters}`,
    },
    {
      columnDef: 'BusinessOwners',
      header: 'Business Owners',
      cell: (element: Server) => `${element.BusinessOwners}`,
    },
    {
      columnDef: 'Action',
      header: 'Action',
      cell: (element: Server) => `${element.Id}`,
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

  get state$() {
    return this._state$.asObservable();
  }

  get allColumns$() {
    return this._state$.pipe(
      switchMap((x) => new BehaviorSubject(x.allColumns))
    );
  }

  get displayedColumns$() {
    return this._state$.pipe(
      switchMap((x) => new BehaviorSubject(x.displayedColumns))
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

  constructor(private dbSearchService: DbSearchService) {}

  getAllDatabase(): Observable<DBResultDto> {
    return this.dbSearchService.getAll().pipe(shareReplay());
  }

  getAllDatabaseBy(params: QueryParams): Observable<DBResultDto> {
    return this.dbSearchService.findBy(params);
  }

  changeDisplayedColumns(displayedColumns: string[]) {
    this._state.displayedColumns = [...displayedColumns];
    this._state$.next(this._state);
  }

  updateFilterBy(filterBy: string, resetPageIndex: boolean = true) {
    if (resetPageIndex) {
      this._state.queryParams.pageIndex = 0;
    }
    this._state.queryParams.filterBy = filterBy;
    this._state$.next(this._state);
  }

  updateFilterValue(filterValue: string, resetPageIndex: boolean = true) {
    if (resetPageIndex) {
      this._state.queryParams.pageIndex = 0;
    }
    this._state.queryParams.filterValue = filterValue;
    this._state$.next(this._state);
  }

  updatePageIndex(pageIndex: number) {
    this._state.queryParams.pageIndex = pageIndex;
    this._state$.next(this._state);
  }

  resetDisplayColumns() {
    this._state = initialState;
    this._state$.next(this._state);
  }
}
