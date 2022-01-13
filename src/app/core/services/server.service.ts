import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Server } from '../models/server';

export interface ServerResultDto {
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
export class ServerService {
  constructor(private http: HttpClient) {}
  // getAll(): Observable<ServerResultDto> {
  //   var response = this.http
  //     .get(`${environment.api_url}/servers?_start=20&_end=30`, {
  //       observe: 'response',
  //     })
  //     .pipe(
  //       switchMap((x) =>
  //         of({
  //           TotalCount: x.headers.get('X-Total-Count') ?? 0,
  //           Results: x.body,
  //         } as ServerResultDto)
  //       ),
  //       shareReplay()
  //     );
  //   return response;
  // }

  findBy(params: QueryParams): Observable<ServerResultDto> {
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
          } as ServerResultDto)
        ),
        shareReplay(1)
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
