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
import { Select, SelectChangeEvent } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Configuration } from '../../models/configuration';

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
    Select,
    FormsModule,
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent {
  configurationApi = inject(ConfigurationApi);

  isReadonly = signal<boolean>(true);

  configurationOptions = resource({
    loader: async () => {
      return await firstValueFrom(
        this.configurationApi.fetch().pipe(
          tap(configurations => {
            const appliedConfiguration = configurations.find(c => c.is_applied);
            if (appliedConfiguration) {
              this.chosenConfiguration.set(appliedConfiguration);
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

  chosenConfiguration = signal<Partial<Configuration> | undefined>(undefined);

  configuration = resource({
    request: () => this.chosenConfiguration(),
    loader: async ({ request }) => {
      return await firstValueFrom(this.configurationApi.find(request?.id!));
    },
  });

  onChangeConfiguration(event: SelectChangeEvent) {
    // @todo: fix
    this.chosenConfiguration.set(event.value);
  }
}
