import { CreateDzire } from './create-dzire/create-dzire';
import { Dashboard } from './dashboard/dashboard';
import { Home } from './home/home';
import { ManageDzire } from './manage-dzire/manage-dzire';
import { Routes } from '@angular/router';
import { Wishlist } from './wishlist/wishlist';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'wishlist',
    component: Wishlist,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'manage/:id',
    component: ManageDzire,
  },
  {
    path: 'create',
    component: CreateDzire,
  },
];
