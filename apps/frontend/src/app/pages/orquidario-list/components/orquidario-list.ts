import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card';
import { OrquidarioService } from '../../orqudiario-service/orquidario.service';
import { Orquidario } from '../model/orquidario';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogModal } from '../../dialog-modal/dialog-modal';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationDialogComponent } from '../../../shared/notification-dialog/notification-dialog';

@Component({
    selector: 'orquidario-list',
    standalone: true,
    imports: [
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        MatCardModule,
        MatPaginatorModule,
    ],
    templateUrl: './orquidario-list.html',
    styleUrl: './orquidario-list.css'
})
export class OrquidarioListComponent implements OnInit {
    private readonly orquidarioService = inject(OrquidarioService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    protected readonly orquidarios = signal<Orquidario[]>([]);
    private dialog = inject(MatDialog);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    protected readonly paginaAtual = signal<number>(0);
    protected readonly itensPorPagina = signal<number>(10);

    protected readonly orquidariosPaginados = computed(() => {
        const inicio = this.paginaAtual() * this.itensPorPagina();
        const fim = inicio + this.itensPorPagina();
        return this.orquidarios().slice(inicio, fim);
    });

    colunasExibidas: string[] = ['nome', 'endereco', 'dataCriacao', 'areaMQuadrados', 'irrigadoAuto', 'acoes'];

    ngOnInit(): void {
        this.loadOrquidarios();
    }

    private loadOrquidarios() {
        this.orquidarioService.findOrquidarios().subscribe({
            next: (orquidarios) => {
                this.orquidarios.set(orquidarios);
            },
            error: (err) => {
                this.openNotification('error', err.error?.message || 'Não foi possível listar os orquidários.');
            }
        });
    }

    protected onPageChange(event: PageEvent): void {
        this.paginaAtual.set(event.pageIndex);
        this.itensPorPagina.set(event.pageSize);
    }

    orquidarioCreateForm(id?: number) {
        if (id) {
            this.router.navigate(['orquidario', 'criar', id]);
        } else {
            this.router.navigate(['orquidario', 'criar']);
        }
    }

    openDialog(orquidario: Orquidario) {
        const dialogRef = this.dialog.open(DialogModal, {
            width: '300px',
            data: { orquidario }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === null || result === undefined) return;

            if (result.success) {
                this.loadOrquidarios();
                this.openNotification('success', `Orquidário "${orquidario.nome}" excluído com sucesso.`);
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

    listarReproducoes(id: number) {
        this.router.navigate(['orquidario', 'reproducoes', id]);
    }
}
