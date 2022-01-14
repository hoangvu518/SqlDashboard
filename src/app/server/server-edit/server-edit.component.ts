import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Environment, SQLVersion, Status } from '@core/models';
import { Server } from '@core/models/server';
import { Observable, Subscription } from 'rxjs';
import { ServerFacadeService } from '../server-facade.service';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerEditComponent implements OnInit, OnDestroy {
  serverEnvironments!: Environment[];
  serverStatuses!: Status[];
  serverVersions!: SQLVersion[];
  disabledSubmitButton = false;
  editServerForm = this.fb.group({
    Id: [this.data.Id, Validators.required],
    PhysicalName: [this.data.PhysicalName, Validators.required],
    AliasName: [this.data.AliasName, Validators.required],
    ProjectName: [this.data.ProjectName, Validators.required],
    StatusId: [this.data.Status.Id, Validators.required],
    VersionId: [this.data.SQLVersion.Id, Validators.required],
    EnvironmentId: [this.data.Environment.Id, Validators.required],
  });

  serverEnvironmentSubscription!: Subscription;
  serverStatusSubscription!: Subscription;
  serverVersionSubscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Server,
    private serverFacadeService: ServerFacadeService,
    private dialogRef: MatDialogRef<ServerEditComponent>
  ) {}
  ngOnDestroy(): void {
    this.serverEnvironmentSubscription.unsubscribe();
    this.serverStatusSubscription.unsubscribe();
    this.serverVersionSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.serverEnvironmentSubscription = this.serverFacadeService
      .getServerEnvironments()
      .subscribe((x) => (this.serverEnvironments = x));
    this.serverStatusSubscription = this.serverFacadeService
      .getServerStatuses()
      .subscribe((x) => (this.serverStatuses = x));
    this.serverVersionSubscription = this.serverFacadeService
      .getServerVersions()
      .subscribe((x) => (this.serverVersions = x));
  }
  submit() {
    this.disabledSubmitButton = true;
    const updatedServer: Server = {
      Id: this.editServerForm.get('Id')?.value,
      PhysicalName: this.PhysicalName,
      AliasName: this.AliasName,
      ProjectName: this.ProjectName,
      Status: this.Status,
      Environment: this.Environment,
      SQLVersion: this.Version,
      DBASupporters: this.data.DBASupporters,
      SMSSupporters: this.data.SMSSupporters,
      BusinessOwners: this.data.BusinessOwners,
    };
    this.serverFacadeService.updateTableRow(updatedServer);
    this.disabledSubmitButton = false;
    this.dialogRef.close();
  }

  get PhysicalName() {
    return this.editServerForm.get('PhysicalName')?.value;
  }

  get AliasName() {
    return this.editServerForm.get('AliasName')?.value;
  }

  get Id() {
    return this.editServerForm.get('Id')?.value;
  }

  get ProjectName() {
    return this.editServerForm.get('ProjectName')?.value;
  }
  get Status() {
    const statusId = this.editServerForm.get('StatusId')?.value;
    const status = this.serverStatuses.find((x) => x.Id == statusId);
    return status ?? ({} as Status);
  }

  get Environment() {
    const environmentId = this.editServerForm.get('EnvironmentId')?.value;
    const environment = this.serverEnvironments.find(
      (x) => x.Id == environmentId
    );
    return environment ?? ({} as Environment);
  }

  get Version() {
    const versionId = this.editServerForm.get('VersionId')?.value;
    const version = this.serverVersions.find((x) => x.Id == versionId);
    return version ?? ({} as SQLVersion);
  }
}
