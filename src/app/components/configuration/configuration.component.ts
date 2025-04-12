import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';
import { ConfigurationTemplateComponent } from '../configuration-template/configuration-template.component';
import { ConfigurationFormComponent } from '../configuration-form/configuration-form.component';
import { ButtonComponent } from '../button/button.component';
import { ConfigurationApi } from '../../api/configuration.api';
import { map, Observable, tap } from 'rxjs';
import { PillComponent } from '../pill/pill.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgTemplateOutlet } from '@angular/common';
import { Configuration } from '../../models/configuration';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

enum ConfigurationPageMode {
  READ,
  EDIT,
  CREATE,
}

@Component({
  selector: 'app-configuration',
  imports: [
    PageWrapperComponent,
    ConfigurationTemplateComponent,
    ConfigurationFormComponent,
    ButtonComponent,
    PillComponent,
    NgxSkeletonLoaderModule,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    NgTemplateOutlet,
    MatIcon,
    MatFabButton,
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationComponent implements OnInit {
  configurationApi = inject(ConfigurationApi);

  pageMode = signal<ConfigurationPageMode>(ConfigurationPageMode.READ);
  configurationOptions = signal<Partial<Configuration>[]>([]);
  chosenConfigurationId = signal<string | undefined>(undefined);
  isLoading = signal<boolean>(true);
  configuration = signal<Configuration | undefined>(undefined);

  constructor() {
    effect(() => {
      this.isLoading.set(true);
      const chosenConfigurationId = this.chosenConfigurationId();
      if (chosenConfigurationId) {
        this.configurationApi.find(chosenConfigurationId).subscribe(config => {
          this.isLoading.set(false);
          this.configuration.set(config);
        });
      }
    });
  }

  ngOnInit() {
    this.updateConfigurationOptions();
  }

  onDeleteConfiguration() {
    const configId = this.chosenConfigurationId();
    if (!configId) return;

    this.isLoading.set(true);
    this.configurationApi.delete(configId).subscribe(() => {
      this.updateConfigurationOptions();
      this.isLoading.set(false);

      // no applied config -> set default view
      this.configuration.set(undefined);
    });
  }

  onApplyConfiguration() {
    const configId = this.chosenConfigurationId();
    if (!configId) return;

    this.configurationApi.apply(configId).subscribe(() => {
      this.fetchConfigurationOptions().subscribe(configurations =>
        this.configurationOptions.set(configurations)
      );
    });
  }

  onChangeConfiguration(configId: string) {
    this.chosenConfigurationId.set(configId);
  }

  onAddConfiguration(configuration: Configuration) {
    this.isLoading.set(true);

    this.configurationApi.add(configuration).subscribe(config => {
      this.configuration.set(config);
      this.configurationOptions.update(configs => [...configs, config]);
      this.chosenConfigurationId.set(config.id);

      this.isLoading.set(false);
      this.pageMode.set(ConfigurationPageMode.READ);
    });
  }

  onSubmitConfiguration(configuration: Configuration) {
    this.isLoading.set(true);

    this.configurationApi.save(configuration).subscribe(config => {
      this.configuration.set(config);
      this.updateConfigurationOptions();

      this.isLoading.set(false);
      this.pageMode.set(ConfigurationPageMode.READ);
    });
  }

  private fetchConfigurationOptions(): Observable<Partial<Configuration>[]> {
    this.isLoading.set(true);
    return this.configurationApi.fetch().pipe(
      map(configurations =>
        configurations.map(configuration => {
          return {
            id: configuration.id,
            is_applied: configuration.is_applied,
            name: configuration.name + (configuration.is_applied ? '*' : ''),
          };
        })
      ),
      tap(() => this.isLoading.set(false))
    );
  }

  private updateConfigurationOptions() {
    this.fetchConfigurationOptions().subscribe(configurations => {
      const appliedConfiguration = configurations.find(c => c.is_applied);
      if (appliedConfiguration) {
        this.chosenConfigurationId.set(appliedConfiguration.id);
      }
      this.configurationOptions.set(configurations);
    });
  }

  protected readonly ConfigurationPageMode = ConfigurationPageMode;
}
