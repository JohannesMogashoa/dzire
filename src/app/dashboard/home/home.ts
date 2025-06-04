import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';

import { AuthenticationService } from '../../services/auth.service';
import { DzireInterface } from './../../models/dzire.interface';
import { DzireService } from '../../services/dzires.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);
  private authService = inject(AuthenticationService);
  private dzireService = inject(DzireService);
  private activatedRoute = inject(ActivatedRoute);
  user: User = this.activatedRoute.snapshot.data['user'];
  dzires = [] as DzireInterface[];

  ngOnInit(): void {
    // console.log();
    // const user = this.authService.currentUserSig();
    // console.log('Current User:', user);
    // if (user) {
    //   this.userId = user.uid;
    //   this.dzireService
    //     .fetchDziresForUser(user.uid)
    //     .then((data: DzireInterface[]) => {
    //       this.dzires = data;
    //     });
    // }
  }

  navigateToCreate() {
    this.router.navigate(['/create']);
  }

  navigateToManage(id: string) {
    this.router.navigate(['/manage', id]);
  }
}
