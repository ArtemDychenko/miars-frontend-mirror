import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { DashboardStatisticsComponent } from '../dashboard-statistics/dashboard-statistics.component';
import { DashboardChartsComponent } from '../dashboard-charts/dashboard-charts.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DashboardSettingsComponent } from '../dashboard-settings/dashboard-settings.component';
import { ConfigurationApi } from '../../api/configuration.api';
import { SettingsService } from '../../service/settings.service';
import { AsyncPipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatExpansionModule,
    MatIcon,
    PageWrapperComponent,
    MatFabButton,
    DashboardStatisticsComponent,
    DashboardChartsComponent,
    AsyncPipe,
    Skeleton,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  configurationApi = inject(ConfigurationApi);
  settingsService = inject(SettingsService);
  settings$ = this.settingsService.settings$;

  ngOnInit() {
    this.configurationApi.fetchAppliedConfiguration().subscribe(config => {
      if (config) {
        this.settingsService.initSettings(config.protocols);
      } else {
        console.error('Failed to fetch configuration');
      }
    });
  }

  openSettings() {
    const config = new MatDialogConfig();

    config.minWidth = '1100px';
    config.minHeight = '550px';

    this.dialog.open(DashboardSettingsComponent, config);
  }
}
