import { RouterModule, Routes } from '@angular/router';

import { CreateDzire } from './create-dzire/create-dzire';
import { Home } from './home/home';
import { ManageDzire } from './manage-dzire/manage-dzire';
import { NgModule } from '@angular/core';
import { UnsavedChangesGuard } from '../shared/guards/unsaved-changes-guard';

const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'manage/:id',
    component: ManageDzire,
    canDeactivate: [UnsavedChangesGuard],
  },
  {
    path: 'create',
    component: CreateDzire,
    canDeactivate: [UnsavedChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
