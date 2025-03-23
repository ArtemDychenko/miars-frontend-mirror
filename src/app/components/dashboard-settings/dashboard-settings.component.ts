import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';
import { SettingsService } from '../../service/settings.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';

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
  private formBuilder = inject(FormBuilder);

  settingsForm = this.formBuilder.group({
    statisticsColumns: this.formBuilder.group({
      showTotalPackets: [true],
      showPacketsPerSec: [true],
      showTotalBytes: [true],
      showBytesPerSec: [true],
    }),
    statisticsRowsAndCharts: this.formBuilder.group({
      showETH: [true],
      showIPv4: [true],
      showIPv6: [true],
      showTCP: [true],
    }),
    statisticsIR: this.formBuilder.group({
      showMinValue: [true],
      showMaxValue: [true],
      showCurrentValue: [true],
    }),
  });

  private settingsService = inject(SettingsService);

  ngOnInit() {
    const currentSettings = this.settingsForm.value;
    this.settingsForm.patchValue(currentSettings);
  }

  onSubmit() {
    this.settingsService.updateSettings(this.settingsForm.value);
  }

  onCancel() {
    const currentSettings = this.settingsService.getSettings();
    this.settingsForm.patchValue(currentSettings);
  }
}
