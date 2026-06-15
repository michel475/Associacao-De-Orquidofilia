import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReproducaoFlorService } from '../reproducao-flor-list/service/reproducaoFlor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { z } from 'zod';
import { MatCard } from '@angular/material/card';

interface CreateReproducaoPayload {
  orquidarioId: number,
  hibridoNome: string,
  dataGerminacao:Date,
  taxaSucessoPct: number,
  viavel:boolean
}

@Component({
  selector: 'app-reproducao-flor-create',
  imports: [ReactiveFormsModule, MatCard],
  templateUrl: './reproducao-flor-create.html',
  styleUrl: './reproducao-flor-create.css',
})
export class ReproducaoFlorCreate implements OnInit{
  private fb = inject(FormBuilder);
  private reproducaoService = inject(ReproducaoFlorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form:FormGroup = new FormGroup({
    orquidarioId: new FormControl('orquidarioId'),
    hibridoNome: new FormControl('hibridoNome'),
    dataGerminacao: new FormControl('dataGerminacao'),
    taxaSucessoPct: new FormControl('taxaSucessoPct'),
    viavel: new FormControl('viavel'),
  });
  isEditMode = signal(false);
  isSubmitting = signal(false);
  reproducaoId = signal<string | null>(null);
  errorMsg = signal('');

  constructor() {
    this.initF();
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.reproducaoId.set(id);
      this.loadReproducao(id);
    }
  }

  loadReproducao(id: string) {
    this.reproducaoService.findById(id).subscribe({
      next: (reproducao) => {
        // Format ISO date local to datetime-local input format (YYYY-MM-DDThh:mm)

        this.form.patchValue({
          orquidarioId: reproducao.orquidarioId,
          hibridoNome: reproducao.hibridoNome,
          dataGerminacao: reproducao.dataGerminacao.toISOString().slice(0,16),
          taxaSucessoPct: reproducao.taxaSucessoPct,
          viavel: reproducao.viavel
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
        this.router.navigate(['/admin']);
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
