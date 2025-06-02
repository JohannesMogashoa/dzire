import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthenticationService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private authService: AuthenticationService) {}

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async onSubmit() {
    console.log('Register form submitted', this.registerForm.value);
    try {
      this.authService.register(
        this.registerForm.value.email!,
        this.registerForm.value.password!,
        `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`
      );
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
}
