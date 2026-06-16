import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReproducaoFlorService } from '../reproducao-flor-list/service/reproducaoFlor.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { z } from 'zod';
import { MatCard } from '@angular/material/card';
import { ReproducaoFlor } from '../reproducao-flor-list/model/reproducaoFlor';

interface CreateReproducaoPayload {
  orquidarioId: number,
  hibridoNome: string,
  dataGerminacao:Date,
  taxaSucessoPct: number,
  viavel:boolean
}

@Component({
  selector: 'app-reproducao-flor-create',
  imports: [ReactiveFormsModule, MatCard, FormsModule, RouterLink],
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
      orquidarioId:[''],
      hibridoNome: [''],
      dataGerminacao: [''],
      taxaSucessoPct: [''],
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
      error: () => {
        this.errorMsg.set('Erro ao buscar dados da reprodução.');
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
      viavel: formVal.viavel
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
        this.errorMsg.set(err.error?.message || 'Erro ao salvar jogo.');
      }
    });
  }

  home() {
    this.router.navigate(['reproducaoFlor']);
  }
}
