import { Injectable } from '@angular/core';
import { ContextConstants } from '../constants/context-constants';

@Injectable()
export class UserSettingsService {
  userSettings = {
    refreshCadence: 10000
  }

  getUserSetting(key) {
    return Promise.resolve(this.userSettings[key]);
  }

  setUserSetting(key, value) {
    this.userSettings[key] = value;
    return this.getUserSetting(key);
  }
}
