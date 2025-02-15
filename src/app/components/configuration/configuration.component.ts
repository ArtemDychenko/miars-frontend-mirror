import { Component } from '@angular/core';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-configuration',
  imports: [PageWrapperComponent, Skeleton],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent {}
