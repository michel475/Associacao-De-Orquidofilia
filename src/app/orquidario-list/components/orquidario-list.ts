import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { OrquidarioService } from '../service/orquidario.service';
import { Orquidario } from '../model/orquidario';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { startWith, map } from 'rxjs';

@Component({
    selector: 'orquidario-list',
    standalone: true,
    imports:[
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        MatCard,
        MatCardHeader,
        MatCardContent
    ],
    templateUrl: './orquidario-list.html',
    styleUrl: './orquidario-list.css'
})
export class OrquidarioListComponent implements OnInit{
    protected readonly orquidarios = signal<Orquidario[]>([]);
    private readonly orquidarioService = inject(OrquidarioService);
   
    private readonly route = inject(Router);


    colunasExibidas: string[] = ['nome', 'endereco', 'dataCriacao', 'irrigadoAuto', 'areaMQuadrados'];    


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