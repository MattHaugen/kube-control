import { Injectable } from '@angular/core';

@Injectable()
export class UserSettingsService {
  userSettings = {
    refreshCadence: 10000
  }

  getUserSetting(key: string): Promise<object> {
    return Promise.resolve(this.userSettings[key]);
  }

  setUserSetting(key: string, value: any): Promise<object> {
    this.userSettings[key] = value;
    return this.getUserSetting(key);
  }
}
