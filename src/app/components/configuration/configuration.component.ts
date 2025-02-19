import { Component, inject, resource, signal } from '@angular/core';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';
import { ConfigurationTemplateComponent } from '../configuration-template/configuration-template.component';
import { ConfigurationFormComponent } from '../configuration-form/configuration-form.component';
import { ButtonComponent } from '../button/button.component';
import { ConfigurationApi } from '../../api/configuration.api';
import { firstValueFrom } from 'rxjs';
import { PillComponent } from '../pill/pill.component';
import { SkeletonModule } from 'primeng/skeleton';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent {
  configurationApi = inject(ConfigurationApi);

  isReadonly = signal<boolean>(true);
  configurationRes = resource({
    loader: async () => {
      return await firstValueFrom(this.configurationApi.fetch());
    },
  });
}
