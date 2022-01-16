import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Server } from '../models/server';

export interface ServerResultDto {
  totalCount: number;
  results: Server[];
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

  getPDF(params: QueryParams): Observable<Server[]> {
    const queryString = this.buildPDFQuery(params);
    return this.http.get<Server[]>(
      `${environment.api_url}/servers?${queryString}`
    );
  }

  findBy(params: QueryParams): Observable<ServerResultDto> {
    const queryString = this.buildQuery(params);
    var response = this.http
      .get(`${environment.api_url}/servers?${queryString}`, {
        observe: 'response',
      })
      .pipe(
        switchMap((x) =>
          of({
            totalCount: x.headers.get('X-Total-Count') ?? 0,
            results: x.body,
          } as ServerResultDto)
        ),
        shareReplay(1)
      );
    return response;
  }

  private buildPDFQuery(params: QueryParams): string {
    let queryString = `_sort=${params.sortBy}&_order=${params.order}`;

    if (params.filterBy != '' && params.filterValue != '') {
      queryString = `${params.filterBy}_like=${params.filterValue}&${queryString}`;
    }
    return queryString;
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
