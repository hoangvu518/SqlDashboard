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
  @Input() columnsDefinition$!: Observable<ColumnDefinition[]>;
  @Output() displayedColumnsChanged = new EventEmitter<ColumnDefinition>();
  @Output() displayedColumnsReset = new EventEmitter();
  @Output() displayedColumnsHiddenAll = new EventEmitter();
  // panelOpenState = false;

  columnsDefinition!: ColumnDefinition[];
  subscription!: Subscription;

  // isAllChecked = false;
  constructor() {}
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.subscription = this.columnsDefinition$.subscribe(
      (x) => (this.columnsDefinition = x)
    );
  }

  // changeColumnDisplay(change: MatSlideToggleChange) {
  //   const columnDef = change.source.name;
  //   const isDisplayed = change.checked;
  //   const columnDefObj = {
  //     columnDef: columnDef,
  //     isDisplayed: isDisplayed,
  //   } as ColumnDefinition;
  //   this.displayedColumnsChanged.emit(columnDefObj);
  // }

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
    // return false;
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
