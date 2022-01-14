import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService, ThemeService } from '@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  lightTheme = 'light-theme';
  darkTheme = 'dark-theme';
  ngOnInit(): void {
    if (this.isLightTheme()) {
      this.renderer.removeClass(document.body, this.darkTheme);
    } else {
      this.renderer.addClass(document.body, this.darkTheme);
    }
  }

  // changeTheme(event: MatSlideToggleChange) {
  //   if (event.checked) {
  //     this.renderer.addClass(document.body, 'dark-theme');
  //   } else {
  //     this.renderer.removeClass(document.body, 'dark-theme');
  //   }
  // }

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
}
