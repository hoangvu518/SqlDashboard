import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { ColumnDefinition } from '../server-facade.service';

@Component({
  selector: 'app-server-column-filter',
  templateUrl: './server-column-filter.component.html',
  styleUrls: ['./server-column-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerColumnFilterComponent {
  @Input() columnsDefinition$!: Observable<ColumnDefinition[]>;
  @Output() displayedColumnsChanged = new EventEmitter<ColumnDefinition>();
  @Output() displayedColumnsReset = new EventEmitter();
  panelOpenState = false;

  constructor() {}

  changeColumnDisplay(change: MatSlideToggleChange) {
    const columnDef = change.source.name;
    const isDisplayed = change.checked;
    const columnDefObj = {
      columnDef: columnDef,
      isDisplayed: isDisplayed,
    } as ColumnDefinition;
    this.displayedColumnsChanged.emit(columnDefObj);
  }

  resetDisplayedColumns() {
    this.displayedColumnsReset.emit();
  }
}
