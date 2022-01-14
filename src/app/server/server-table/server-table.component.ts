import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Server } from '@core/models/server';
import { Observable } from 'rxjs';
import { ServerChangeTrackingComponent } from '../server-change-tracking/server-change-tracking.component';
import { ServerDetailComponent } from '../server-detail/server-detail.component';
import { ServerEditComponent } from '../server-edit/server-edit.component';
import { ColumnDefinition } from '../server-facade.service';

@Component({
  selector: 'app-server-table',
  templateUrl: './server-table.component.html',
  styleUrls: ['./server-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerTableComponent {
  @Input() servers!: Server[];
  @Input() columnsDefinition$!: Observable<ColumnDefinition[]>;
  @Input() displayedColumns$!: Observable<string[]>;
  @Input() userHasWriteAccess$!: Observable<boolean>;

  constructor(private dialog: MatDialog) {}
  openEditDialog(server: Server) {
    this.dialog.open(ServerEditComponent, {
      data: server,
    });
  }

  openDetailDialog(server: Server) {
    this.dialog.open(ServerDetailComponent, { data: server });
  }
  openHistoryDialog(server: Server) {
    this.dialog.open(ServerChangeTrackingComponent, { data: server });
  }
}
