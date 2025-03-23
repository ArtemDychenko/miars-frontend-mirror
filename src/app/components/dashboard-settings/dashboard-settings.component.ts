import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';
import { SettingsService } from '../../service/settings.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Settings, SettingsDto } from '../../models/settings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    ToggleSwitchModule,
    FormsModule,
    MatButtonModule,
    ButtonComponent,
    ReactiveFormsModule,
    MatSlideToggle,
  ],
  selector: 'app-dashboard-settings',
  styleUrl: './dashboard-settings.component.scss',
  templateUrl: './dashboard-settings.component.html',
})
export class DashboardSettingsComponent implements OnInit {
  private formBuilder = inject(FormBuilder).nonNullable;

  private dialogRef = inject(MatDialogRef<DashboardSettingsComponent>);

  private settingsService = inject(SettingsService);

  settingsForm = this.formBuilder.group({
    statisticsColumns: this.formBuilder.group({
      showTotalPackets: [false],
      showPacketsPerSec: [false],
      showTotalBytes: [false],
      showBytesPerSec: [false],
    }),
    statisticsRowsAndCharts: this.formBuilder.group({
      showETH: [false],
      showIPv4: [false],
      showIPv6: [false],
      showTCP: [false],
    }),
    statisticsIR: this.formBuilder.group({
      showMinValue: [false],
      showMaxValue: [false],
      showCurrentValue: [false],
    }),
  });

  ngOnInit() {
    const currentSettings = this.settingsService.getSettings();
    this.settingsForm.patchValue(currentSettings);
  }

  onSubmit() {
    const settings: Settings = this.settingsForm.getRawValue();
    this.settingsService.updateSettings(settings);
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
