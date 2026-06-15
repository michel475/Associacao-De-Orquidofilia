import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReproducaoFlorService } from '../reproducao-flor-list/service/reproducaoFlor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { z } from 'zod';

interface CreateReproducaoPayload {
  hibridoNome: string,
  dataGerminacao:Date,
  taxaSucessoPct: number,
}

@Component({
  selector: 'app-reproducao-flor-create',
  imports: [ReactiveFormsModule],
  templateUrl: './reproducao-flor-create.html',
  styleUrl: './reproducao-flor-create.css',
})
export class ReproducaoFlorCreate {
  private fb = inject(FormBuilder);
  private reproducaoService = inject(ReproducaoFlorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  isEditMode = signal(false);
  isSubmitting = signal(false);
  matchId = signal<string | null>(null);
  errorMsg = signal('');

  constructor() {
    this.initF();
  }

  initF(){;
    this.form = this.fb.group({
    hibridoNome: z.string().min(1),
      dataGerminacao: z.string().min(1),
      taxaSucessoPct: z.number().min(0).max(100),
    })
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.matchId.set(id);
      this.loadReproducao(id);
    }
  }

  loadReproducao(id: string) {
    this.reproducaoService.findById(id).subscribe({
      next: (reproducao) => {
        // Format ISO date local to datetime-local input format (YYYY-MM-DDThh:mm)

        this.form.patchValue({
          hibridoNome: reproducao.hibridoNome,
          dataGerminacao: reproducao.dataGerminacao.toISOString().slice(0,16),
          taxaSucessoPct: reproducao.taxaSucessoPct,
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
    
    // Construct strict UTC ISO matchDate payload

    const payload: CreateReproducaoPayload = {
      hibridoNome: formVal.hibridoNome,
      dataGerminacao: formVal.dataGerminacao,
      taxaSucessoPct: formVal.taxaSucessoPct,
    };

    const request$ = this.isEditMode()
      ? this.reproducaoService.updateReproducao(this.matchId()!, payload)
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
