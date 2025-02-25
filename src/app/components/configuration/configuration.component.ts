import {
  afterNextRender,
  Component,
  effect,
  inject,
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
})
export class ConfigurationComponent {
  configurationApi = inject(ConfigurationApi);

  pageMode = signal<ConfigurationPageMode>(ConfigurationPageMode.READ);
  configurationOptions = signal<Partial<Configuration>[]>([]);
  chosenConfiguration = signal<string | undefined>(undefined);
  isLoading = signal<boolean>(true);
  configuration = signal<Configuration | undefined>(undefined);

  constructor() {
    effect(() => {
      this.isLoading.set(true);
      const chosenConfiguration = this.chosenConfiguration();
      if (chosenConfiguration) {
        this.configurationApi.find(chosenConfiguration).subscribe(config => {
          this.isLoading.set(false);
          this.configuration.set(config);
        });
      }
    });

    afterNextRender(() => {
      this.fetchConfigurationOptions().subscribe(configurations => {
        const appliedConfiguration = configurations.find(c => c.is_applied);
        if (appliedConfiguration) {
          this.chosenConfiguration.set(appliedConfiguration.id);
        }
        this.configurationOptions.set(configurations);
      });
    });
  }

  onDeleteConfiguration() {
    this.configurationApi.delete(this.chosenConfiguration()!).subscribe(() => {
      this.fetchConfigurationOptions().subscribe(configurations => {
        const appliedConfiguration = configurations.find(c => c.is_applied);
        if (appliedConfiguration) {
          this.chosenConfiguration.set(appliedConfiguration.id);
        }
        this.configurationOptions.set(configurations);
      });
    });
  }

  onApplyConfiguration() {
    this.configurationApi.apply(this.chosenConfiguration()!).subscribe(() => {
      this.fetchConfigurationOptions().subscribe(configurations =>
        this.configurationOptions.set(configurations)
      );
    });
  }

  onChangeConfiguration(configId: string) {
    this.chosenConfiguration.set(configId);
  }

  onSubmitConfiguration(configuration: Configuration) {
    console.log('Submitting configuration', configuration);
    this.configurationApi.save(configuration);
    this.pageMode.set(ConfigurationPageMode.READ);
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

  protected readonly ConfigurationPageMode = ConfigurationPageMode;
}
