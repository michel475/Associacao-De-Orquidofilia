import { Component, inject, OnInit } from '@angular/core';
import { MatCalendar } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatCardModule],
  templateUrl: './home.html',
  styleUrl: '../home.css',
})
export class Home{
  private router = inject(Router);
  

}
