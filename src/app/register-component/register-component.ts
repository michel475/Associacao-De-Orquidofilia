import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { parseAuthError } from '../auth/error-handler';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-component.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = signal(false);
  errorMsg = signal('');
  successMsg = signal('');

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMsg.set('');
      
      const { nome, email, password } = this.registerForm.value;
      
      this.authService.register({ nome, email, senha: password }).subscribe({
        next: () => {
          this.successMsg.set('Cadastro realizado com sucesso!');
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