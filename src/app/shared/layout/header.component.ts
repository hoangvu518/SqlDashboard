import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  ApplicationRole,
  AuthService,
  ThemeService,
  UserRole,
} from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userRoles$!: Observable<UserRole[]>;
  userHasAdminAccess$!: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    this.userRoles$ = this.authService.userRoles$;
    this.userHasAdminAccess$ = this.authService.isUserAdmin$;
  }

  lightTheme = 'light-theme';
  darkTheme = 'dark-theme';
  ngOnInit(): void {
    if (this.isLightTheme()) {
      this.renderer.removeClass(document.body, this.darkTheme);
    } else {
      this.renderer.addClass(document.body, this.darkTheme);
    }
  }

  isLightTheme(): boolean {
    return this.themeService.getTheme() == this.darkTheme ? false : true;
  }

  changeTheme() {
    if (this.isLightTheme()) {
      this.themeService.deleteTheme();
      this.themeService.setTheme(this.darkTheme);
      this.renderer.addClass(document.body, this.darkTheme);
    } else {
      this.themeService.deleteTheme();
      this.themeService.setTheme(this.lightTheme);
      this.renderer.removeClass(document.body, this.darkTheme);
    }
  }

  updateUserRole(event: MatCheckboxChange) {
    const isUserInThisRole = event.checked;
    const role = event.source.name as ApplicationRole;
    this.authService.updateUserRole(role, isUserInThisRole);
  }
}
