import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { AuthPageGuard } from '../shared/guards/auth-page-guard';
import { CreateDzire } from './create-dzire/create-dzire';
import { Dashboard } from './dashboard/dashboard';
import { Home } from './home/home';
import { Login } from './login/login';
import { ManageDzire } from './manage-dzire/manage-dzire';
import { Register } from './register/register';
import { Routes } from '@angular/router';
import { UnsavedChangesGuard } from '../shared/guards/unsaved-changes-guard';
import { Wishlist } from './wishlist/wishlist';

const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'login',
    component: Login,
    canActivate: [AuthPageGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'register',
    component: Register,
    canActivate: [AuthPageGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'wishlist/:id',
    component: Wishlist,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding },
  },
  {
    path: 'manage/:id',
    component: ManageDzire,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding },
    canDeactivate: [UnsavedChangesGuard],
  },
  {
    path: 'create',
    component: CreateDzire,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding },
    canDeactivate: [UnsavedChangesGuard],
  },
];
