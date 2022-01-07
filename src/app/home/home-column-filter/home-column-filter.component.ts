import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, Subscription } from 'rxjs';
import { DBSearchState } from '../home-state.service';

@Component({
  selector: 'app-home-column-filter',
  templateUrl: './home-column-filter.component.html',
  styleUrls: ['./home-column-filter.component.css'],
})
export class HomeColumnFilterComponent implements OnInit, OnDestroy {
  @Input() searchState$!: Observable<DBSearchState>;
  @Output() columnFilterChange = new EventEmitter<string[]>();
  panelOpenState = false;
  // columns = ['Id', 'Physical Name', 'Alias Name', 'Project Name'];
  displayedColumns!: string[];
  subscription!: Subscription;
  constructor() {}
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.searchState$.subscribe(
      (x) => (this.displayedColumns = x.displayedColumns)
    );
  }

  onFilterClick() {
    console.log(
      `event from filter component with data ${this.displayedColumns}`
    );
    // this.homeStateService.UpdateDisplayedColumns(this.columns);
    // this.columnFilterChange.emit(this.displayedColumns);
    console.log(`after emit`);
  }

  onToggleChange(change: MatSlideToggleChange) {
    debugger;
    const columnName = change.source.name;
    const isColumnHidden = !change.checked;
    if (isColumnHidden) {
      this.displayedColumns = this.displayedColumns.filter(
        (x) => x != columnName
      );
    } else {
      if (columnName != null) {
        this.displayedColumns = [...this.displayedColumns, columnName];
      }
    }
    this.columnFilterChange.emit(this.displayedColumns);

    // console.log(change);
  }
}
