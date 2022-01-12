import { Environment } from './server-environment';
import { Status } from './server-status';
import { SQLVersion } from './server-version';

export interface Server {
  Id: number;
  PhysicalName: string;
  AliasName: string;
  ProjectName: string;
  Status: Status;
  SQLVersion: SQLVersion;
  Environment: Environment;
  DBASupporters: string[];
  SMSSupporters: string[];
  BusinessOwners: string[];
}
