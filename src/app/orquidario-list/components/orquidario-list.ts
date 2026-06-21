import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card';
import { OrquidarioService } from '../../orqudiario-service/orquidario.service';
import { Orquidario } from '../model/orquidario';
import { ActivatedRoute, Router, ɵEmptyOutletComponent } from '@angular/router';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../delete-modal/delete-modal';

@Component({
    selector: 'orquidario-list',
    standalone: true,
    imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    ɵEmptyOutletComponent
],
    templateUrl: './orquidario-list.html',
    styleUrl: './orquidario-list.css'
})


export class OrquidarioListComponent implements OnInit{
    private readonly orquidarioService = inject(OrquidarioService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    protected readonly orquidarios = signal<Orquidario[]>([]);
    private dialog = inject(MatDialog);
    showDeleteModal = signal(false);
    orquidarioToDelete = signal<Orquidario | null>(null);

    colunasExibidas: string[] = ['nome', 'endereco', 'dataCriacao', 'areaMQuadrados', 'irrigadoAuto', 'acoes'];    


    ngOnInit(): void {
        this.loadOrquidarios();
    }

    private loadOrquidarios(){
        this.orquidarioService.findOrquidarios().subscribe({
            next: (orquidarios) => {
                this.orquidarios.set(orquidarios);
            },
            error: () => {
                console.log("Não foi possível listar os orquidários");
            }
        })
    }

    updateOrquidario(id: number, orquidario: Orquidario){
        this.orquidarioService.updateOrquidario(id, orquidario); 
    }

    orquidarioCreateForm(id?: number) {
        if(id) {
            this.router.navigate(["orquidario","criar", id]);
        } else {
            this.router.navigate(["orquidario","criar"]);
        }
    }

    openDialog(orquidario: Orquidario) {
        const dialog = this.dialog.open(ConfirmDeleteDialogComponent, {
            width: '300px',
            data: { orquidario }
        });

        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.loadOrquidarios();
            }
        });
    }

    listarReproducoes(id: number){
        this.router.navigate(['orquidario', 'reproducoes', id]);
    }
}

