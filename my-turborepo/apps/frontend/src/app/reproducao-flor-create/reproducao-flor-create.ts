import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReproducaoFlorService } from '../reproducao-flor-list/service/reproducaoFlor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../shared/notification-dialog/notification-dialog';
import { parseReproducaoError } from '../auth/error-handler';

interface CreateReproducaoPayload {
  orquidarioId: number;
  hibridoNome: string;
  dataGerminacao: Date;
  taxaSucessoPct: number;
  viavel: boolean;
}

@Component({
  selector: 'app-reproducao-flor-create',
  imports: [
    ReactiveFormsModule,
    MatCard,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
  ],
  templateUrl: './reproducao-flor-create.html',
  styleUrl: './reproducao-flor-create.css',
})
export class ReproducaoFlorCreate implements OnInit {
  private fb = inject(FormBuilder);
  private reproducaoService = inject(ReproducaoFlorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  form!: FormGroup;
  isEditMode = signal(false);
  isSubmitting = signal(false);
  reproducaoId = signal<string | null>(null);

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

  initF() {
    this.form = this.fb.group({
      orquidarioId: ['', Validators.required],
      hibridoNome: ['', Validators.required],
      dataGerminacao: ['', Validators.required],
      taxaSucessoPct: ['', Validators.required],
      viavel: [''],
    });
  }

  loadReproducao(id: string) {
    this.reproducaoService.findById(id).subscribe({
      next: (reproducao) => {
        const dateObj = new Date(reproducao.dataGerminacao);
        const formattedDate = dateObj.toISOString().slice(0, 10);
        this.form.patchValue({
          orquidarioId: reproducao.orquidarioId,
          hibridoNome: reproducao.hibridoNome,
          dataGerminacao: formattedDate,
          taxaSucessoPct: reproducao.taxaSucessoPct,
          viavel: reproducao.viavel ? true : false,
        });
      },
      error: (err) => {
        this.openNotification('error', parseReproducaoError(err));
      }
    });
  }

  enviarFormulario() {
    this.onSubmit();
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting.set(true);

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
        const msg = this.isEditMode()
          ? 'Reprodução atualizada com sucesso.'
          : 'Reprodução criada com sucesso.';
        const dialogRef = this.openNotification('success', msg);
        dialogRef.afterClosed().subscribe(() => this.router.navigate(['reproducaoFlor']));
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.openNotification('error', parseReproducaoError(err));
      }
    });
  }

  private openNotification(type: 'success' | 'error', message: string) {
    return this.dialog.open(NotificationDialogComponent, {
      width: '350px',
      data: { type, message }
    });
  }

  onCancel() {
    this.router.navigate(['reproducaoFlor']);
  }
}
