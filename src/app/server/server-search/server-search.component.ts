import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-server-search',
  templateUrl: './server-search.component.html',
  styleUrls: ['./server-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerSearchComponent implements OnInit, OnDestroy {
  @Output() filterColumnChanged: EventEmitter<string> = new EventEmitter();
  @Output() filterValueChanged: EventEmitter<string> = new EventEmitter();
  private _searchTerms$ = new Subject<string>();
  searchOption = new FormControl('PhysicalName');
  placeHolder = 'Enter search key...';
  searchSubscription!: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.searchSubscription = this._searchTerms$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => of(term))
      )
      .subscribe((x) => this.filterValueChanged.emit(x));
  }
  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
  applyFilter(searchValue: string) {
    this._searchTerms$.next(searchValue);
  }
  updateFilterBy(change: MatSelectChange) {
    this.filterColumnChanged.emit(change.value);
  }
}
