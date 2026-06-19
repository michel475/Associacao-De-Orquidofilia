import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { Orquidario } from '../orquidario-list/model/orquidario';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-orquidario-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }  // ← ADICIONAR ISSO
  ],
  templateUrl: './orquidario-form.html',
  styleUrl: './orquidario-form.css',
})
export class OrquidarioForm {
  orquidario: Orquidario = new Orquidario();

  constructor() {}

  enviarFormulario() {
    console.log(this.orquidario);
  }
}
