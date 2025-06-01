import { Component, inject } from '@angular/core';
import type { Dzire, DzireItem } from './../../../dzires';

import { Router } from '@angular/router';
import { sampleDzires } from './../../../dzires';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private router = inject(Router);

  navigateToCreate() {
    this.router.navigate(['/create']);
  }

  navigateToManage(id: number) {
    this.router.navigate(['/manage', id]);
  }

  dzires = sampleDzires;
}
