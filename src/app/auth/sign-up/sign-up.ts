import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthenticationService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  authService = inject(AuthenticationService);
  fb = inject(FormBuilder);
  router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.registerForm.getRawValue();
    const displayName = `${rawForm.firstName} ${rawForm.lastName}`;
    this.authService
      .register(rawForm.email, rawForm.password, displayName)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.errorMessage = err.code;
        },
      });
  }
}
