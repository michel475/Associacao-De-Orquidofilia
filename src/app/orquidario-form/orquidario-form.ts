import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { OrquidarioService } from '../service/orquidario.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface CreateOrquidarioPayload {
  nome: string;
  endereco: string;
  dataCriacao: Date;
  irrigadoAuto: boolean;
  areaMQuadrados: number;
}

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
    ReactiveFormsModule, MatCard, FormsModule, RouterLink
],
  templateUrl: './orquidario-form.html',
  styleUrl: './orquidario-form.css',
})


export class OrquidarioForm implements OnInit {
  private fb = inject(FormBuilder);
  private orquidarioService = inject(OrquidarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  isEditMode = signal(false);
  isSubmitting = signal(false);
  orquidarioId = signal<string | null>(null);
  errorMsg = signal('');

  constructor() {
    this.formInitializer();
  }

  enviarFormulario() {
    this.onSubmit();
  }

  formInitializer() {
    this.form = this.fb.group({
      nome: [''],
      endereco: [''],
      dataCriacao: [''],
      irrigadoAuto: [''],
      areaMQuadrados: [''],
    })
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.isEditMode.set(true);
      this.orquidarioId.set(id);
      this.loadOrquidario(id);

    }
  }

  loadOrquidario(id: string) {
    this.orquidarioService.findOrquidarioById(Number(id)).subscribe({
      next: (orquidario) => {
        
        const dateObj = new Date(orquidario.dataCriacao);
        const dataFormatada = dateObj.toISOString().slice(0,10);
        console.log(dataFormatada);
        console.log(orquidario);
        this.form.patchValue({
          nome: orquidario.nome,
          endereco: orquidario.endereco,
          dataCriacao: dataFormatada,
          areaMQuadrados: orquidario.areaMQuadrados,
          irrigadoAuto: orquidario.irrigadoAuto ? true : false,
        })
      },
      error: () => {
        this.errorMsg.set("Erro ao carregar orquidario");
      }
    })
  }
  onSubmit(){
    console.log('Formulário completo:', this.form.value);
    console.log('Endereco:', this.form.get('endereco')?.value);

    if(this.form.invalid) return;
    this.isSubmitting.set(true);
    this.errorMsg.set('');

    const formVal = this.form.value;
    

    const payload: CreateOrquidarioPayload = {
      nome: formVal.nome,
      endereco: formVal.endereco,
      dataCriacao: formVal.dataCriacao,
      areaMQuadrados: formVal.areaMQuadrados,
      irrigadoAuto: formVal.irrigadoAuto
    };

    const request$ = this.isEditMode()
      ? this.orquidarioService.updateOrquidario(Number(this.orquidarioId()!), payload)
      : this.orquidarioService.createOrquidario(payload);

    request$.subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['orquidario']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMsg.set(err.error?.message || 'Erro ao salvar orquidario');
      }
    });
  }

  home() {
    this.router.navigate(['orquidario']);
  }
}
