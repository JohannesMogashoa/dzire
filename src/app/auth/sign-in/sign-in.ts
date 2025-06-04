import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
  imports: [ReactiveFormsModule, RouterModule],
})
export class SignIn {
  router = inject(Router);
  authService = inject(AuthenticationService);
  fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit() {
    const rawForm = this.loginForm.getRawValue();

    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }
}
