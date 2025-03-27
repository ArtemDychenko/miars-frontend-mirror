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

  dialogRef = inject(MatDialogRef<DashboardSettingsComponent>);

  settingsService = inject(SettingsService);
  form: SettingsForm | null = null;

  ngOnInit() {
    this.settingsService.settings$.subscribe(settings => {
      this.initializeForm(settings);
    });
  }

  initializeForm(settings: Settings) {
    const protocols = Object.keys(settings.protocols);

    this.form = this.settingsFormBuilder.createDefaultForm(protocols);
    this.form.patchValue(settings);
  }

  onSubmit() {
    if (this.form) {
      const settings: Settings = this.settingsFormBuilder.toValue(this.form);
      this.settingsService.updateSettings(settings);
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  protected readonly Object = Object;
}
