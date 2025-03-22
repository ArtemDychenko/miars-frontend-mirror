import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';
import { SlideToggleComponent } from '../slide-toggle/slide-toggle.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    ToggleSwitchModule,
    FormsModule,
    MatButtonModule,
    ButtonComponent,
    SlideToggleComponent,
  ],
  selector: 'app-dashboard-settings',
  styleUrl: './dashboard-settings.component.scss',
  templateUrl: './dashboard-settings.component.html',
})
export class DashboardSettingsComponent {
  isChecked: Boolean = true;
}
