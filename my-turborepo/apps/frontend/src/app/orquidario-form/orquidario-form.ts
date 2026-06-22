import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { OrquidarioService } from '../orqudiario-service/orquidario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../shared/notification-dialog/notification-dialog';
import { parseOrquidarioError } from '../auth/error-handler';

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
    ReactiveFormsModule,
  ],
  templateUrl: './orquidario-form.html',
  styleUrl: './orquidario-form.css',
})
export class OrquidarioForm implements OnInit {
  private fb = inject(FormBuilder);
  private orquidarioService = inject(OrquidarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  form!: FormGroup;
  isEditMode = signal(false);
  isSubmitting = signal(false);
  orquidarioId = signal<string | null>(null);

  constructor() {
    this.formInitializer();
  }

  enviarFormulario() {
    this.onSubmit();
  }

  formInitializer() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      dataCriacao: ['', Validators.required],
      irrigadoAuto: [''],
      areaMQuadrados: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.orquidarioId.set(id);
      this.loadOrquidario(id);
    }
  }

  loadOrquidario(id: string) {
    this.orquidarioService.findOrquidarioById(Number(id)).subscribe({
      next: (orquidario) => {
        const dateObj = new Date(orquidario.dataCriacao);
        const dataFormatada = dateObj.toISOString().slice(0, 10);
        this.form.patchValue({
          nome: orquidario.nome,
          endereco: orquidario.endereco,
          dataCriacao: dataFormatada,
          areaMQuadrados: orquidario.areaMQuadrados,
          irrigadoAuto: orquidario.irrigadoAuto ? true : false,
        });
      },
      error: (err) => {
        this.openNotification('error', parseOrquidarioError(err));
      }
    });
  }

  onSubmit() {
    if (this.form.invalid){ this.openNotification('error','Campos são obrigatórios'); return;}
    this.isSubmitting.set(true);

    const formVal = this.form.value;
    const payload: CreateOrquidarioPayload = {
      nome: formVal.nome,
      endereco: formVal.endereco,
      dataCriacao: formVal.dataCriacao,
      areaMQuadrados: formVal.areaMQuadrados,
      irrigadoAuto: formVal.irrigadoAuto,
    };

    const request$ = this.isEditMode()
      ? this.orquidarioService.updateOrquidario(Number(this.orquidarioId()!), payload)
      : this.orquidarioService.createOrquidario(payload);

    request$.subscribe({
      next: () => {
        this.isSubmitting.set(false);
        const msg = this.isEditMode()
          ? 'Orquidário atualizado com sucesso.'
          : 'Orquidário criado com sucesso.';
        const dialogRef = this.openNotification('success', msg);
        dialogRef.afterClosed().subscribe(() => this.router.navigate(['orquidario']));
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.openNotification('error', parseOrquidarioError(err));
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
    this.router.navigate(['orquidario']);
  }
}
