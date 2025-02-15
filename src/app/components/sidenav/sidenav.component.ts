import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatButtonModule, RouterLink, Button, NgClass],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {}
