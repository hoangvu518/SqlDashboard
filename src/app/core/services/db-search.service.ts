import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Server } from '../models/server';

// @Injectable({
//   providedIn: 'root',
// })

export interface DBResultDto {
  TotalCount: number;
  Results: Server[];
}

export interface QueryParams {
  pageIndex: number;
  pageSize: number;
  sortBy: string;
  order: string;
  filterBy: string;
  filterValue: string;
}
@Injectable()
export class DbSearchService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<DBResultDto> {
    var response = this.http
      .get(`${environment.api_url}/servers?_start=20&_end=30`, {
        observe: 'response',
      })
      .pipe(
        switchMap((x) =>
          of({
            TotalCount: x.headers.get('X-Total-Count') ?? 0,
            Results: x.body,
          } as DBResultDto)
        ),
        shareReplay()
      );
    return response;
  }

  findBy(params: QueryParams): Observable<DBResultDto> {
    // const start = params.pageIndex * params.pageSize;
    // const end = (params.pageIndex + 1) * params.pageSize;
    console.log(params);
    const queryString = this.buildQuery(params);
    var response = this.http
      .get(`${environment.api_url}/servers?${queryString}`, {
        observe: 'response',
      })
      .pipe(
        switchMap((x) =>
          of({
            TotalCount: x.headers.get('X-Total-Count') ?? 0,
            Results: x.body,
          } as DBResultDto)
        ),
        shareReplay()
      );
    return response;
  }

  private buildQuery(params: QueryParams): string {
    const start = params.pageIndex * params.pageSize;
    const end = (params.pageIndex + 1) * params.pageSize;
    let queryString = `_sort=${params.sortBy}&_order=${params.order}&_start=${start}&_end=${end}`;

    if (params.filterBy != '' && params.filterValue != '') {
      queryString = `${params.filterBy}_like=${params.filterValue}&${queryString}`;
    }
    return queryString;
  }
}
