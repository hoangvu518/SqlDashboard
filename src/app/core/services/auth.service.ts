import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
import { LocalStorageService } from '.';

export enum ApplicationRole {
  Read = 'Read',
  Write = 'Write',
  Admin = 'Admin',
}
export interface UserRole {
  applicationRole: ApplicationRole;
  isUserInThisRole: boolean;
}

export interface AuthState {
  userRoles: UserRole[];
}
@Injectable()
export class AuthService {
  private _key = 'roles';
  private _authState$!: BehaviorSubject<AuthState>;
  private _authState!: AuthState;

  constructor(private localStorageService: LocalStorageService) {
    this.initializeAuthState();
  }
  private initializeAuthState() {
    const inMemoryAuthState = this.localStorageService.getItem(
      this._key
    ) as AuthState;
    if (this.isObjectEmpty(inMemoryAuthState)) {
      this._authState = this.getDefaultAuthState();
    } else {
      this._authState = inMemoryAuthState;
    }

    this._authState$ = new BehaviorSubject(this._authState);
  }

  private getDefaultAuthState(): AuthState {
    return {
      userRoles: [
        {
          applicationRole: ApplicationRole.Admin,
          isUserInThisRole: false,
        },
        {
          applicationRole: ApplicationRole.Write,
          isUserInThisRole: false,
        },
        {
          applicationRole: ApplicationRole.Read,
          isUserInThisRole: false,
        },
      ],
    } as AuthState;
  }

  get authState$(): Observable<AuthState> {
    return this._authState$.asObservable().pipe(shareReplay(1));
  }

  get userRoles$(): Observable<UserRole[]> {
    return this.authState$.pipe(
      switchMap((x) => new BehaviorSubject(x.userRoles)),
      shareReplay(1)
    );
  }

  get isUserAdmin$(): Observable<boolean> {
    return this.userRoles$.pipe(
      switchMap((x) => {
        const userHasAdminAccess =
          x.findIndex(
            (x) =>
              x.applicationRole == ApplicationRole.Admin &&
              x.isUserInThisRole == true
          ) > -1;
        return new BehaviorSubject(userHasAdminAccess);
      })
    );
  }

  get isUserAdmin(): boolean {
    return (
      this._authState.userRoles.findIndex(
        (x) =>
          x.applicationRole == ApplicationRole.Admin &&
          x.isUserInThisRole == true
      ) > -1
    );
  }
  get isUserWrite$(): Observable<boolean> {
    return this.userRoles$.pipe(
      switchMap((x) => {
        const userHasAdminAccess =
          x.findIndex(
            (x) =>
              x.applicationRole == ApplicationRole.Admin &&
              x.isUserInThisRole == true
          ) > -1;

        const userHasWriteAccess =
          x.findIndex(
            (x) =>
              x.applicationRole == ApplicationRole.Write &&
              x.isUserInThisRole == true
          ) > -1;
        return new BehaviorSubject(userHasWriteAccess || userHasAdminAccess);
      })
    );
  }

  get isUserRead$(): Observable<boolean> {
    return this.userRoles$.pipe(
      switchMap((x) => {
        const userHasAdminAccess =
          x.findIndex(
            (x) =>
              x.applicationRole == ApplicationRole.Admin &&
              x.isUserInThisRole == true
          ) > -1;

        const userHasWriteAccess =
          x.findIndex(
            (x) =>
              x.applicationRole == ApplicationRole.Write &&
              x.isUserInThisRole == true
          ) > -1;
        const userHasReadAccess =
          x.findIndex(
            (x) =>
              x.applicationRole == ApplicationRole.Read &&
              x.isUserInThisRole == true
          ) > -1;
        return new BehaviorSubject(
          userHasReadAccess || userHasWriteAccess || userHasAdminAccess
        );
      })
    );
  }

  updateUserRole(role: ApplicationRole, isUserInThisRole: boolean) {
    const userRole = this._authState.userRoles.find(
      (x) => x.applicationRole == role
    );
    if (userRole == null) {
      return;
    }
    userRole.isUserInThisRole = isUserInThisRole;

    const userRoleIndex = this._authState.userRoles.findIndex(
      (x) => x.applicationRole == role
    );
    this._authState.userRoles[userRoleIndex] = userRole;
    this.localStorageService.removeItem(this._key);
    this.localStorageService.setItem(this._key, this._authState);
    this._authState$.next(this._authState);
  }

  private isObjectEmpty(object: any): boolean {
    return Object.keys(object).length === 0 && object.constructor === Object;
  }
}
