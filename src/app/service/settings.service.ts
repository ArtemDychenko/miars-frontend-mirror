import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings';

const DEFAULT_SETTINGS: Settings = {
  showTotalPackets: true,
  showPacketsPerSec: true,
  showTotalBytes: true,
  showBytesPerSec: true,

  showETH: true,
  showIPv4: true,
  showIPv6: true,
  showTCP: true,

  showMinValue: true,
  showMaxValue: true,
  showCurrentValue: true,
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsSubject = new BehaviorSubject<Settings>(DEFAULT_SETTINGS);
  settingsObserver$ = this.settingsSubject.asObservable();

  updateSettings(settings: Settings) {
    this.settingsSubject.next(settings);
  }

  getSettings() {
    return this.settingsSubject.value;
  }
}
