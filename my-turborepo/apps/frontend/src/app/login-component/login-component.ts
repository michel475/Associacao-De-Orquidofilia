import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { parseAuthError } from '../auth/error-handler';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './login-component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLoading = signal(false);
  errorMsg = signal('');

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMsg.set('');

      const { email, password } = this.loginForm.value;

      this.authService.login({ email, senha: password }).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMsg.set(parseAuthError(err));
          this.isLoading.set(false);
        }
      });
    }
  }
}