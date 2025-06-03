import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { Routes } from '@angular/router';
import { UserResolver } from './services/user.resolver';
import { WelcomePage } from './welcome-page/welcome-page';
import { Wishlist } from './wishlist/wishlist';

const redirectToLogin = () => redirectUnauthorizedTo(['auth', 'sign-in']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

export const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToLogin },
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: 'wishlist/:id',
    component: Wishlist,
  },
];
