import { Component } from '@angular/core';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-dashboard',
  imports: [PageWrapperComponent, Skeleton],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
