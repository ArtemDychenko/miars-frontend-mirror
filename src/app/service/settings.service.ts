import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService implements OnInit {
  private settingsSubject = new BehaviorSubject<any>({
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
  });
  settings$ = this.settingsSubject.asObservable();

  ngOnInit() {}

  updateSettings(settings: any) {
    this.settingsSubject.next(settings);
  }

  getSettings() {
    return this.settingsSubject.value;
  }
}
