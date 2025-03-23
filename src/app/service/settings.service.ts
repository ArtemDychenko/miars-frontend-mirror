import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings';

const DEFAULT_SETTINGS: Settings = {
  statisticsColumns: {
    showTotalPackets: true,
    showPacketsPerSec: true,
    showTotalBytes: true,
    showBytesPerSec: true,
  },
  statisticsRowsAndCharts: {
    showETH: true,
    showIPv4: true,
    showIPv6: true,
    showTCP: true,
  },
  statisticsIR: {
    showMinValue: true,
    showMaxValue: true,
    showCurrentValue: true,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsSubject = new BehaviorSubject<Settings>(DEFAULT_SETTINGS);
  settings$ = this.settingsSubject.asObservable();

  updateSettings(settings: Settings) {
    this.settingsSubject.next(settings);
  }

  getSettings() {
    return this.settingsSubject.value;
  }
}
