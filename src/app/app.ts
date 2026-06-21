import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { Home } from './home/components/home';
import { CdkAutofill } from "@angular/cdk/text-field";
import { filter } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,     
    Home, 
    CdkAutofill, 
    NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  protected readonly router = inject(Router);
  protected readonly activePage = signal<string>('');
  
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
    this.router.navigate(['/home']);
  }
  
  orquidarios(){
    this.router.navigate(['/orquidario']);
  }

  reproducoes(){
    this.router.navigate(['/reproducaoFlor']);
  }
}