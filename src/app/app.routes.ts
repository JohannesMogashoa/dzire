import { Home } from './home/home';
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
];
