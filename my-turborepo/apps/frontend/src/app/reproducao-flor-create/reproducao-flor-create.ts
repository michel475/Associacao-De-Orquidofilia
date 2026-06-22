import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReproducaoFlorService } from '../reproducao-flor-list/service/reproducaoFlor.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { z } from 'zod';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ReproducaoFlor } from '../reproducao-flor-list/model/reproducaoFlor';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { parseReproducaoError } from '../auth/error-handler';

interface CreateReproducaoPayload {
  orquidarioId: number,
  hibridoNome: string,
  dataGerminacao:Date,
  taxaSucessoPct: number,
  viavel:boolean
}

@Component({
  selector: 'app-reproducao-flor-create',
  imports: [ReactiveFormsModule, MatCard, FormsModule, RouterLink,
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
  templateUrl: './reproducao-flor-create.html',
  styleUrl: './reproducao-flor-create.css',
})
export class ReproducaoFlorCreate implements OnInit{
  private fb = inject(FormBuilder);
  private reproducaoService = inject(ReproducaoFlorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  enviarFormulario(){
    this.onSubmit();
  }

  form!:FormGroup
  isEditMode = signal(false);
  isSubmitting = signal(false);
  reproducaoId = signal<string | null>(null);
  errorMsg = signal('');

  constructor() {
    this.initF();
  }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.reproducaoId.set(id);
      this.loadReproducao(id);
    }
  }

  initF(){;
    this.form = this.fb.group({
      orquidarioId:['', Validators.required],
      hibridoNome: ['', Validators.required],
      dataGerminacao: ['', Validators.required],
      taxaSucessoPct: ['', Validators.required],
      viavel: [''],
    })
  }

  loadReproducao(id: string) {
    this.reproducaoService.findById(id).subscribe({
      next: (reproducao) => {
        // Format ISO date local to datetime-local input format (YYYY-MM-DDThh:mm)

        const dateObj = new Date(reproducao.dataGerminacao);
        const formattedDate = dateObj.toISOString().slice(0,10);
        console.log(formattedDate);
        console.log(reproducao);
        this.form.patchValue({
          orquidarioId: reproducao.orquidarioId,
          hibridoNome: reproducao.hibridoNome,
          dataGerminacao: formattedDate,
          taxaSucessoPct: reproducao.taxaSucessoPct,
          viavel: reproducao.viavel ? true : false
        });
      },
      error: (err) => {
        this.errorMsg.set(parseReproducaoError(err));
        alert(this.errorMsg);
        this.router.navigate(['reproducaoFlor']);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    this.errorMsg.set('');

    const formVal = this.form.value;
    

    const payload: CreateReproducaoPayload = {
      orquidarioId: formVal.orquidarioId,
      hibridoNome: formVal.hibridoNome,
      dataGerminacao: formVal.dataGerminacao,
      taxaSucessoPct: formVal.taxaSucessoPct,
      viavel: formVal.viavel ?? false,
    };

    const request$ = this.isEditMode()
      ? this.reproducaoService.updateReproducao(this.reproducaoId()!, payload)
      : this.reproducaoService.createReproducao(payload);

    request$.subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['reproducaoFlor']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMsg.set(parseReproducaoError(err));
        console.log(err);
      }
    });
  }

  home() {
    this.router.navigate(['reproducaoFlor']);
  }
  onCancel(){
    this.router.navigate(['reproducaoFlor']);
  }
}
