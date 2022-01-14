import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LocalStorageService {
  constructor() {}
  setItem(key: string, value: any) {
    localStorage.setItem(
      `${environment.app_name}_${key}`,
      JSON.stringify(value)
    );
  }

  getItem(key: string): any {
    return JSON.parse(
      localStorage.getItem(`${environment.app_name}_${key}`) || '{}'
    );
  }

  removeItem(key: string) {
    localStorage.removeItem(`${environment.app_name}_${key}`);
  }
}
