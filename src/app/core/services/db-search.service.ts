import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResult } from '../models/db-result.model';
import { ApiService } from './api.service';

@Injectable()
export class DbSearchService {
  constructor(private apiService: ApiService, private http: HttpClient) {}
  getAll(): Observable<DBResult[]> {
    // return this.apiService.get('/servers');
    return this.http.get<DBResult[]>('api/test');
  }
}
