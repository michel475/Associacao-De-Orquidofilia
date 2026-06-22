import { Component, OnInit, inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../auth/auth.service';
import { parseAuthError } from '../auth/error-handler';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatHeaderCell } from "@angular/material/table";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButton,
    MatBadge,
    MatBadgeModule,
    MatIcon,
    MatHeaderCell
],
  templateUrl: './user-list.component.html'
})
export class UsersListComponent implements OnInit {
  private authService = inject(AuthService);
  private readonly router = inject(Router);

  usersList = signal<User[]>([]);
  isLoading = signal(false);
  actionLoading = signal<string | null>(null);
  searchQuery = signal('');
  errorMsg = signal('');
  successMsg = signal('');

  // Computed state for filtered users
  filteredUsers = computed(() => {
    const list = this.usersList();
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return list;
    return list.filter(u => 
      u.nome.toLowerCase().includes(query) || 
      u.email.toLowerCase().includes(query)
    );
  });

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading.set(true);
    this.errorMsg.set('');
    
    this.authService.getUsers().subscribe({
      next: (users) => {
        this.usersList.set(users);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMsg.set(parseAuthError(err));
        this.isLoading.set(false);
      }
    });
  }

  activateUser(id: string) {
    this.actionLoading.set(id);
    this.errorMsg.set('');
    this.successMsg.set('');

    this.authService.activateUser(id).subscribe({
      next: () => {
        this.successMsg.set('Usuário ativado com sucesso e agora tem acesso ao portal!');
        this.actionLoading.set(null);
        this.loadUsers(); // refresh the list
      },
      error: (err) => {
        this.errorMsg.set(parseAuthError(err));
        this.actionLoading.set(null);
      }
    });
  }

  home(){
    this.router.navigate(['/']);
  }
}