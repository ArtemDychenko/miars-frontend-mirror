import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';
import { SettingsService } from '../../service/settings.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Settings } from '../../models/settings';
import {
  SettingsForm,
  SettingsFormBuilder,
} from './dashboard-settings.builder';

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
  settingsFormBuilder = inject(SettingsFormBuilder);
  settings = input<Settings>();
  form!: SettingsForm;

  dialogRef = inject(MatDialogRef<DashboardSettingsComponent>);

  settingsService = inject(SettingsService);

  ngOnInit() {
    this.initializeForm();
    this.loadSettings();
  }

  initializeForm() {
    this.form = this.settingsFormBuilder.create(this.settings());
  }

  loadSettings() {
    const currentSettings = this.settingsService.getSettings();
    this.form.patchValue(currentSettings);
  }

  onSubmit() {
    const settings: Settings = this.settingsFormBuilder.toValue(this.form);
    this.settingsService.updateSettings(settings);
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
