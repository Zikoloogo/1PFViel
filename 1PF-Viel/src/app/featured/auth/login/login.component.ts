import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@test.com', [Validators.email, Validators.required]],
      password: ['admin', [Validators.required, Validators.minLength(3)]],
    });
  }

submit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    console.log('Form Submitted:', { email, password }); // Debugging the input values

    const isLoggedIn = this.authService.login(email, password);

    console.log('Login Status:', isLoggedIn); // Debugging the result of the login attempt

    if (!isLoggedIn) {
      alert('Email o contraseña incorrectos');
      return;
    }

    console.log('Navigating to dashboard...');
    this.router.navigate(['/dashboard']);
  } else {
    console.log('Form is invalid:', this.loginForm.errors); // Debugging invalid form
  }
}
}