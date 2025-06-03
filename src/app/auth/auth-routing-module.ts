import { RouterModule, Routes } from '@angular/router';

import { ForgotPassword } from './forgot-password/forgot-password';
import { NgModule } from '@angular/core';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';

const routes: Routes = [
  {
    path: '',
    component: SignIn,
  },
  {
    path: 'sign-in',
    component: SignIn,
  },
  {
    path: 'sign-up',
    component: SignUp,
  },
  {
    path: 'forgot-password',
    component: ForgotPassword,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
