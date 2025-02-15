import { Component } from '@angular/core';
import { ConfigurationTemplateComponent } from '../configuration-template/configuration-template.component';

@Component({
  selector: 'app-configuration-form',
  imports: [ConfigurationTemplateComponent],
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss',
})
export class ConfigurationFormComponent {}
