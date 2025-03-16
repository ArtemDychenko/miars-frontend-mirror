import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { DashboardStatisticsComponent } from '../dashboard-statistics/dashboard-statistics.component';
import { DashboardChartsComponent } from '../dashboard-charts/dashboard-charts.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DashboardSettingsComponent } from '../dashboard-settings/dashboard-settings.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatExpansionModule,
    MatIcon,
    PageWrapperComponent,
    MatFabButton,
    DashboardStatisticsComponent,
    DashboardChartsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  readonly dialog = inject(MatDialog);

  openSettings() {
    this.dialog.open(DashboardSettingsComponent, {
      minWidth: '1100px',
      minHeight: '550px',
    });
  }
}
