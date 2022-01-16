import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable, Subscription } from 'rxjs';
import { ColumnDefinition } from '../server-facade.service';

@Component({
  selector: 'app-server-column-filter',
  templateUrl: './server-column-filter.component.html',
  styleUrls: ['./server-column-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerColumnFilterComponent implements OnInit, OnDestroy {
  @Input() columnsDefinition$!: Observable<ColumnDefinition[]>;
  @Output() displayedColumnsChanged = new EventEmitter<ColumnDefinition>();
  @Output() displayedColumnsReset = new EventEmitter();
  @Output() displayedColumnsHiddenAll = new EventEmitter();

  columnsDefinition!: ColumnDefinition[];
  subscription!: Subscription;

  constructor() {}
  ngOnInit(): void {
    this.subscription = this.columnsDefinition$.subscribe(
      (x) => (this.columnsDefinition = x)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateColumnDisplay(event: MatCheckboxChange) {
    const columnDef = event.source.name;
    const isDisplayed = event.checked;
    const columnDefObj = {
      columnDef: columnDef,
      isDisplayed: isDisplayed,
    } as ColumnDefinition;
    this.displayedColumnsChanged.emit(columnDefObj);
  }

  resetDisplayedColumns() {
    this.displayedColumnsReset.emit();
  }

  hideAllDisplayedColumns() {
    this.displayedColumnsHiddenAll.emit();
  }

  isSomeChecked(): boolean {
    return (
      this.columnsDefinition.filter((x) => x.isDisplayed == true).length > 0 &&
      this.isAllChecked() == false
    );
  }

  isAllChecked(): boolean {
    return (
      this.columnsDefinition.filter((x) => x.isDisplayed == false).length == 0
    );
  }

  checkAll(allChecked: boolean) {
    this.resetDisplayedColumns();
  }
}
