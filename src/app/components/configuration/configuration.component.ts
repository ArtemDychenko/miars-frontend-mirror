import { Component, inject, resource, signal } from '@angular/core';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';
import { ConfigurationTemplateComponent } from '../configuration-template/configuration-template.component';
import { ConfigurationFormComponent } from '../configuration-form/configuration-form.component';
import { ButtonComponent } from '../button/button.component';
import { ConfigurationApi } from '../../api/configuration.api';
import { firstValueFrom, map, tap } from 'rxjs';
import { PillComponent } from '../pill/pill.component';
import { SkeletonModule } from 'primeng/skeleton';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgTemplateOutlet } from '@angular/common';
import { Configuration } from '../../models/configuration';

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
    SkeletonModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    NgTemplateOutlet,
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent {
  configurationApi = inject(ConfigurationApi);

  pageMode = signal<ConfigurationPageMode>(ConfigurationPageMode.READ);

  configurationOptions = resource({
    loader: async () => {
      return await firstValueFrom(
        this.configurationApi.fetch().pipe(
          tap(configurations => {
            const appliedConfiguration = configurations.find(c => c.is_applied);
            if (appliedConfiguration) {
              this.chosenConfiguration.set(appliedConfiguration.id);
            }
          }),
          map(configurations =>
            configurations.map(configuration => {
              return {
                id: configuration.id,
                name:
                  configuration.name + (configuration.is_applied ? '*' : ''),
              };
            })
          )
        )
      );
    },
  });

  chosenConfiguration = signal<string | undefined>(undefined);

  configuration = resource({
    request: () => this.chosenConfiguration(),
    loader: async ({ request }) => {
      return await firstValueFrom(this.configurationApi.find(request));
    },
  });

  onChangeConfiguration(configId: string) {
    this.chosenConfiguration.set(configId);
  }

  onSubmitConfiguration(configuration: Configuration) {
    console.log('Submitting configuration', configuration);
    this.configurationApi.save(configuration);
    this.pageMode.set(ConfigurationPageMode.READ);
  }

  protected readonly ConfigurationPageMode = ConfigurationPageMode;
}
