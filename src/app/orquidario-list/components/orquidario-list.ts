import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { OrquidarioService } from '../service/orquidario.service';
import { Orquidario } from '../model/orquidario';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
    selector: 'orquidario-list',
    standalone: true,
    imports:[
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        MatCard
    ],
    templateUrl: './orquidario-list.html',
    styleUrl: './orquidario-list.css'
})
export class OrquidarioListComponent implements OnInit{
    private readonly orquidarioService = inject(OrquidarioService);
    private readonly route = inject(Router);


    colunasExibidas: string[] = ['id', 'endereco', 'dataCriacao', 'irrigadoAuto', 'areaMQuadrados'];    

    protected readonly orquidarios = signal<Orquidario[]>([]);

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

    deleteOrquidario(id: number){
        this.orquidarioService.deleteOrquidario(id);
    }

    orquidarioCreateForm() {
        this.route.navigate(["orquidario","criar"]);
    }
}