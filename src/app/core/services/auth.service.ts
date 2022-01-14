import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '.';

enum ApplicationRole {
  User,
  Admin,
}

@Injectable()
export class AuthService {
  private key = 'roles';
  private userRoles!: ApplicationRole[];
  private _userRoles$!: BehaviorSubject<ApplicationRole[]>;
  constructor(private localStorageService: LocalStorageService) {
    this.userRoles = this.localStorageService.getItem(this.key);
    this._userRoles$ = new BehaviorSubject(this.userRoles);
  }

  get userRoles$(): Observable<ApplicationRole[]> {
    return this._userRoles$.asObservable();
  }

  setUserRoles(role: ApplicationRole) {
    this.localStorageService.removeItem(this.key);
    this.localStorageService.setItem(this.key, this.userRoles);
    this.userRoles.push(role);
    this._userRoles$.next(this.userRoles);
  }

  private getTestRoleData(): ApplicationRole[] {
    return [ApplicationRole.Admin, ApplicationRole.User];
  }
}
