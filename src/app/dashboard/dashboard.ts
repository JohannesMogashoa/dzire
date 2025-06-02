import { Component, inject } from '@angular/core';

import { AuthenticationService } from '../../services/auth.service';
import { DzireService } from '../../services/dzires.service';
import type { FirebaseDzireDocument } from './../../../dzires';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private router = inject(Router);
  private authService = inject(AuthenticationService);
  private dzireService = inject(DzireService);
  userId: string | null = null;
  dzires: FirebaseDzireDocument[] = [];

  constructor(authService: AuthenticationService, dzireService: DzireService) {
    authService.isLoggedIn$.subscribe((user) => {
      if (!user) {
        return;
      }

      dzireService
        .fetchDziresForUser(user.uid)
        .then((data: FirebaseDzireDocument[]) => {
          this.dzires = data;
        });
    });
  }

  navigateToCreate() {
    this.router.navigate(['/create']);
  }

  navigateToManage(id: string) {
    this.router.navigate(['/manage', id]);
  }
}
