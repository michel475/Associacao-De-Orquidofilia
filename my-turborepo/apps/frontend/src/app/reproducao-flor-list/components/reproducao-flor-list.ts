import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ReproducaoFlorService } from '../service/reproducaoFlor.service';
import { ReproducaoFlor } from '../model/reproducaoFlor';
import { MatCell, MatCellDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRowDef, MatTable, MatTableModule } from '@angular/material/table';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ConfirmDeleteDialogComponent } from '../modal/delete-modal';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButton, MatIconButton } from '@angular/material/button';
import { NotificationDialogComponent } from '../../shared/notification-dialog/notification-dialog';

@Component({
  selector: 'app-reproducao-flor-list',
  imports: [
    CommonModule,
    MatCard, MatIcon, MatButton, MatIconButton,
    MatTable, MatHeaderRowDef, MatRowDef, MatHeaderRow, MatHeaderCellDef, MatCellDef, MatCell,
    MatCardHeader, MatCardContent, MatTableModule, MatPaginator
  ],
  standalone: true,
  templateUrl: './reproducao-flor-list.html',
  styleUrl: '../reproducao-flor-list.css',
})
export class ReproducaoFlorList implements OnInit {
  private readonly reproducaoService = inject(ReproducaoFlorService);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(Router);

  protected readonly reproducoes = signal<ReproducaoFlor[]>([]);
  colunasExibidas: string[] = ['orquidarioId', 'hibridoNome', 'dataGerminacao', 'taxaSucessoPct', 'viavel', 'acoes'];

  protected readonly paginaAtual = signal<number>(0);
  protected readonly itensPorPagina = signal<number>(10);

  protected readonly reproducoesPaginadas = computed(() => {
    const inicio = this.paginaAtual() * this.itensPorPagina();
    const fim = inicio + this.itensPorPagina();
    return this.reproducoes().slice(inicio, fim);
  });

  ngOnInit(): void {
    this.loadReproducoes();
  }

  private loadReproducoes() {
    this.reproducaoService.findAll().subscribe({
      next: (reproducoes) => {
        this.reproducoes.set(reproducoes);
      },
      error: (err) => {
        this.openNotification('error', err.error?.message || 'Não foi possível listar as reproduções.');
      }
    });
  }

  protected onPageChange(event: PageEvent): void {
    this.paginaAtual.set(event.pageIndex);
    this.itensPorPagina.set(event.pageSize);
  }

  reproducaoUpdateForm(reproducao: string) {
    this.route.navigate(['reproducaoFlor', 'editar', reproducao]);
  }

  reproducaoCreateForm() {
    this.route.navigate(['reproducaoFlor', 'criar']);
  }

  viewReproducaoOrquidario(orquidarioId: string) {
    this.route.navigate(['orquidario', 'reproducoes', orquidarioId]);
  }

  openDialog(reproducao: ReproducaoFlor) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: { reproducao }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) return;

      if (result.success) {
        this.loadReproducoes();
        this.openNotification('success', `Reprodução "${reproducao.hibridoNome}" excluída com sucesso.`);
      } else {
        this.openNotification('error', result.errorMsg);
      }
    });
  }

  private openNotification(type: 'success' | 'error', message: string) {
    this.dialog.open(NotificationDialogComponent, {
      width: '350px',
      data: { type, message }
    });
  }
}
