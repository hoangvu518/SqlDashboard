import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, Subscription } from 'rxjs';
import { ColumnDefinition } from '../server-facade.service';

@Component({
  selector: 'app-server-column-filter',
  templateUrl: './server-column-filter.component.html',
  styleUrls: ['./server-column-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerColumnFilterComponent implements OnInit, OnDestroy {
  @Input() columnsDefinition$!: Observable<ReadonlyArray<ColumnDefinition>>;
  @Input() displayedColumn$!: Observable<string[]>;
  @Output() displayedColumnsChanged = new EventEmitter<string[]>();
  displayedColumnsSubscription!: Subscription;
  columnsDefinitionSubscription!: Subscription;
  allColumns!: ReadonlyArray<string>;
  displayedColumns!: string[];
  panelOpenState = false;

  constructor() {}
  ngOnInit(): void {
    this.displayedColumnsSubscription = this.displayedColumn$.subscribe(
      (x) => (this.displayedColumns = x)
    );
    this.columnsDefinitionSubscription = this.columnsDefinition$.subscribe(
      (x) => (this.allColumns = x.map((y) => y.columnDef))
    );
  }
  ngOnDestroy(): void {
    this.displayedColumnsSubscription.unsubscribe();
    this.columnsDefinitionSubscription.unsubscribe();
  }
  isCheck(columnName: string): boolean {
    if (this.displayedColumns.includes(columnName)) {
      return true;
    }
    return false;
  }

  determineColumnVisibility(change: MatSlideToggleChange) {
    const columnName = change.source.name;
    const isColumnDisplayed = change.checked;
    if (isColumnDisplayed) {
      if (columnName != null) {
        this.displayedColumns = [...this.displayedColumns, columnName];
      }
    } else {
      this.displayedColumns = this.displayedColumns.filter(
        (x) => x != columnName
      );
    }

    this.displayedColumnsChanged.emit(this.displayedColumns);
  }

  resetDisplayedColumns() {
    this.displayedColumns = this.allColumns.map((x) => x);
    this.displayedColumnsChanged.emit(this.displayedColumns);
  }
}
