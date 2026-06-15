import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { Orquidario } from '../orquidario-list/model/orquidario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orquidario-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard
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
