import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { OrquidarioService } from '../service/orquidario.service';
import { Orquidario } from '../model/orquidario';

@Component({
    selector: 'orquidario-list',
    standalone: true,
    imports:[
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        CommonModule
    ],
    templateUrl: 'orquidario-list.html',
    styleUrls: ['./orquidario-list.css']
})
export class OrquidarioListComponent implements OnInit{
    orquidarios = signal<Orquidario[]>([]);

    constructor(private orquidarioService: OrquidarioService){}

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
}