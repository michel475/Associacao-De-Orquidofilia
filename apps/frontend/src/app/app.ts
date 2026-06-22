import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './pages/auth/auth.service';
import { MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { filter } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, MatCardHeader, RouterLink, RouterLinkActive,MatIcon,MatSidenav,MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  protected readonly router = inject(Router);
  protected readonly activePage = signal<string>('');
  authService = inject(AuthService);
  sidebarOpen = signal(false);

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }
  constructor() {
    // Monitorar mudanças de rota
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activePage.set(event.urlAfterRedirects);
      });
  }
  
  isActive(page: string): boolean {
    return this.activePage() === page;
  }
  
  inicio(){
    this.router.navigate(['/']);
  }
  
  orquidarios(){
    this.router.navigate(['/orquidario']);
  }

  reproducoes(){
    this.router.navigate(['/reproducaoFlor']);
  }
  
  userslist(){
    this.router.navigate(['/admin']);
  }
}