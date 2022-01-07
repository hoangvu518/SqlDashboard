import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResult } from '../core/models/db-result.model';
import { Employee } from '../core/models/employee.model';
import { DbSearchService, EmployeeService } from '../core/services';
import { DBSearchState, HomeStateService } from './home-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  // tableData = new Observable<DBResult[]>();
  data$!: Observable<DBResult[]>;
  searchState$!: Observable<DBSearchState>;
  constructor(
    private dbSearchService: DbSearchService,
    private employeeService: EmployeeService,
    private homeStateService: HomeStateService
  ) {}

  ngOnInit(): void {
    this.data$ = this.dbSearchService.getAll();
    this.searchState$ = this.homeStateService.state$;
    // this.tableData = this.dbSearchService.getAll();
    // this.employeeService.getAll().subscribe((x) => console.log(x));
  }

  onFilterChange(columns: string[]) {
    // debugger;
    // console.log('hoho');
    // console.log(data);
    this.homeStateService.UpdateDisplayedColumns(columns);
  }
}
