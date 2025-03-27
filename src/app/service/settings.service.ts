import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';
import { Settings } from '../models/settings';
import { SettingsFormBuilder } from '../components/dashboard-settings/dashboard-settings.builder';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settingsFormBuilder = inject(SettingsFormBuilder);

  private settingsSubject = new BehaviorSubject<Settings>({
    showBytesPerSec: true,
    showPacketsPerSec: true,
    showTotalBytes: true,
    showTotalPackets: true,
    showETH: true,
    protocols: {},
    showMinValue: true,
    showMaxValue: true,
    showCurrentValue: true,
  });

  settings$ = this.settingsSubject.asObservable();

  initSettings(protocols: string[]) {
    const defaultSettings = this.settingsFormBuilder.toValue(
      this.settingsFormBuilder.createDefaultForm(protocols)
    );
    this.settingsSubject.next(defaultSettings);
  }

  updateSettings(settings: Settings) {
    this.settingsSubject.next(settings);
  }

  getSettings(): Settings {
    return this.settingsSubject.value;
  }
}
