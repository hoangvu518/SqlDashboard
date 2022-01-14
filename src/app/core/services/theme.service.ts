import { Injectable } from '@angular/core';
import { LocalStorageService } from '.';

@Injectable()
export class ThemeService {
  private _key = 'theme';
  constructor(private localStorageService: LocalStorageService) {}

  getTheme(): string {
    return this.localStorageService.getItem(this._key);
  }

  setTheme(themeName: string) {
    return this.localStorageService.setItem(this._key, themeName);
  }

  deleteTheme() {
    return this.localStorageService.removeItem(this._key);
  }
}
