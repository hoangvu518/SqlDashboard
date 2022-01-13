import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Environment, SQLVersion, Status } from '@core/models';
import { Server } from '@core/models/server';
import { Observable } from 'rxjs';
import { ServerFacadeService } from '../server-facade.service';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerEditComponent implements OnInit {
  serverEnvironments!: Observable<Environment[]>;
  serverStatuses!: Observable<Status[]>;
  serverVersions!: Observable<SQLVersion[]>;
  disabledSubmitButton = false;
  editServerForm = this.fb.group({
    Id: [this.data.Id, Validators.required],
    PhysicalName: [this.data.PhysicalName, Validators.required],
    AliasName: [this.data.AliasName, Validators.required],
    ProjectName: [this.data.ProjectName, Validators.required],
    Status: [this.data.Status.Id, Validators.required],
    Version: [this.data.SQLVersion.Id, Validators.required],
    Environment: [this.data.Environment.Id, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Server,
    private serverFacadeService: ServerFacadeService,
    private dialogRef: MatDialogRef<ServerEditComponent>
  ) {}

  ngOnInit(): void {
    this.serverEnvironments = this.serverFacadeService.getServerEnvironments();
    this.serverStatuses = this.serverFacadeService.getServerStatuses();
    this.serverVersions = this.serverFacadeService.getServerVersions();
  }
  submit() {}
}
