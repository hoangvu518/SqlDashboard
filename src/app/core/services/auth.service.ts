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

// export interface AuthState {
//   appRoles: ApplicationRole[];
//   userRoles: ApplicationRole[];
// }

export interface AuthState {
  userRoles: UserRole[];
}
@Injectable()
export class AuthService {
  private key = 'roles';
  // private userRoles!: ApplicationRole[];
  // private securityRoles: ApplicationRole[] = this.getTestRoleData();
  private _authState$!: BehaviorSubject<AuthState>;
  private state!: AuthState;
  // private _userRoles$!: BehaviorSubject<ApplicationRole[]>;
  constructor(private localStorageService: LocalStorageService) {
    this.initializeAuthState();
    // this.userRoles = this.localStorageService.getItem(this.key);
    // this._userRoles$ = new BehaviorSubject(this.userRoles);
  }
  private initializeAuthState() {
    debugger;
    const inMemoryAuthState = this.localStorageService.getItem(
      this.key
    ) as AuthState;
    if (this.isObjectEmpty(inMemoryAuthState)) {
      // myUserRoles = [];
      this.state = this.getDefaultAuthState();
    } else {
      this.state = inMemoryAuthState;
    }

    this._authState$ = new BehaviorSubject(this.state);
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

  // get userRoles$(): Observable<ApplicationRole[]> {
  //   return this._state.pipe(
  //     switchMap((x) => new BehaviorSubject(x.userRoles)),
  //     shareReplay(1)
  //   );
  // }

  // get appRoles$(): Observable<ApplicationRole[]> {
  //   return this._state.pipe(
  //     switchMap((x) => new BehaviorSubject(x.appRoles)),
  //     shareReplay(1)
  //   );
  // }

  // get userRoles$(): Observable<ApplicationRole[]> {
  //   return this._userRoles$.asObservable();
  // }

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
    const userRole = this.state.userRoles.find(
      (x) => x.applicationRole == role
    );
    if (userRole == null) {
      return;
    }
    userRole.isUserInThisRole = isUserInThisRole;

    const userRoleIndex = this.state.userRoles.findIndex(
      (x) => x.applicationRole == role
    );
    this.state.userRoles[userRoleIndex] = userRole;
    this.localStorageService.removeItem(this.key);
    this.localStorageService.setItem(this.key, this.state);
    this._authState$.next(this.state);
  }

  // removeUserRole(role: ApplicationRole) {
  //   const newRoles = this.state.userRoles.filter((x) => x != role);
  //   this.state.userRoles = [...newRoles];
  //   this.localStorageService.removeItem(this.key);
  //   this.localStorageService.setItem(this.key, this.state.userRoles);
  //   this._authState$.next(this.state);
  // }

  private isObjectEmpty(object: any): boolean {
    return Object.keys(object).length === 0 && object.constructor === Object;
  }
}
