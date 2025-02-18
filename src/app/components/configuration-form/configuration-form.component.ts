import { Component, input } from '@angular/core';
import { ConfigurationTemplateComponent } from '../configuration-template/configuration-template.component';
import { Configuration } from '../../models/configuration';

@Component({
  selector: 'app-configuration-form',
  imports: [ConfigurationTemplateComponent],
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss',
})
export class ConfigurationFormComponent {
  configuration = input.required<Configuration>();
}
