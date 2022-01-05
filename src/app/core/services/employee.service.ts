import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '.';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apiService: ApiService, private http: HttpClient) {}
  getAll(): Observable<Employee[]> {
    // return this.apiService.get('/Employee/GetAllEmployees');
    // return this.http.get<Employee[]>(
    //   'http://localhost:58675/api/Employee/GetAllEmployees'
    // );
    return this.http.get<Employee[]>('/api/employees');
  }
}
