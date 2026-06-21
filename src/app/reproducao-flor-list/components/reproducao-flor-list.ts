import { Component, inject, OnInit, signal, computed } from '@angular/core'; // Adicionado computed
import { ReproducaoFlorService } from '../service/reproducaoFlor.service';
import { ReproducaoFlor } from '../model/reproducaoFlor';
import { MatCell, MatCellDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRowDef, MatTable, MatTableModule } from '@angular/material/table';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, ɵEmptyOutletComponent } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ConfirmDeleteDialogComponent } from '../modal/delete-modal';
import { MatPaginator, PageEvent } from '@angular/material/paginator'; // Adicionado PageEvent
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-reproducao-flor-list',
  imports: [CommonModule,
    MatCard, MatIcon, MatButton, MatIconButton,
    MatTable, MatHeaderRowDef, MatRowDef, MatHeaderRow, MatHeaderCellDef, MatCellDef, MatCell,
    MatCardHeader, MatCardContent, MatTableModule, ɵEmptyOutletComponent, MatPaginator
  ],
  standalone: true,
  templateUrl: './reproducao-flor-list.html',
  styleUrl: '../reproducao-flor-list.css',
})
export class ReproducaoFlorList implements OnInit {
  private readonly reproducaoService = inject(ReproducaoFlorService);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(Router);

  // Seus signals originais permanecem intactos
  protected readonly reproducoes = signal<ReproducaoFlor[]>([]);
  showDeleteModal = signal(false);
  reproducaoToDelete = signal<ReproducaoFlor | null>(null);
  colunasExibidas: string[] = ['orquidarioId', 'hibridoNome', 'dataGerminacao', 'taxaSucessoPct', 'viavel', 'acoes'];

  // 1. Novos estados para controlar a paginação em memória
  protected readonly paginaAtual = signal<number>(0);
  protected readonly itensPorPagina = signal<number>(10);

  // 2. O Pulo do Gato: Signal computado que fatia o vetor original automaticamente
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
      error: () => {
        console.log("nao foi possivel resgatar as reproduções");
      }
    });
  }

  // 3. Função para escutar o clique no paginador do HTML
  protected onPageChange(event: PageEvent): void {
    this.paginaAtual.set(event.pageIndex);
    this.itensPorPagina.set(event.pageSize);
  }

  reproducaoUpdateForm(reproducao: string) {
    this.route.navigate([`reproducaoFlor`, `editar`, `${reproducao}`]);
  }

  reproducaoCreateForm() {
    this.route.navigate(['reproducaoFlor', 'criar']);
  }

  viewReproducaoOrquidario(orquidarioId: string) {
    this.route.navigate(['orquidario', 'reproducoes', `${orquidarioId}`]);
  }

  openDialog(reproducao: ReproducaoFlor) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        width: '300px',
        data: { reproducao }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.loadReproducoes();
        }
    });
  }
}