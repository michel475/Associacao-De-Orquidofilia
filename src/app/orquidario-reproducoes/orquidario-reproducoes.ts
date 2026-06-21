import { Component, inject, OnInit, signal } from "@angular/core";
import { OrquidarioService } from "../orqudiario-service/orquidario.service";
import { ReproducaoFlor } from "../reproducao-flor-list/model/reproducaoFlor";
import { Orquidario } from "../orquidario-list/model/orquidario";
import { ActivatedRoute, Router, ɵEmptyOutletComponent } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";


@Component({    
    selector: 'orquidario-reproducoes',
    templateUrl: './orquidario-reproducoes.html',
    imports: [
    MatCardModule,
    MatTableModule,
    ɵEmptyOutletComponent,
    MatIconModule,
    MatButtonModule
]
})

export class OrquidarioReproducoesComponent implements OnInit{
    private readonly orquidarioService = inject(OrquidarioService);
    protected readonly orquidario = signal<Orquidario | null>(null);
    protected readonly router = inject(Router); 
    protected readonly reproducoes = signal<ReproducaoFlor[]>([]);
    protected readonly route = inject(ActivatedRoute);


    colunasExibidas: string[] = ['hibridoNome', 'dataGerminacao', 'viavel', 'taxaSucessoPct'];

    ngOnInit(): void {
        this.loadReproducoes();
    }

    loadReproducoes(){
        const id = this.route.snapshot.paramMap.get('id');
        const idNumber = Number(id);
        this.orquidarioService.findOrquidarioById(idNumber).subscribe((orquidario) => {
            if(orquidario){
                this.orquidario.set(orquidario);
            }
        });
        this.orquidarioService.listarReproducoes(idNumber).subscribe((reproducoes) => {
            this.reproducoes.set(reproducoes);
        });
    }

    home(){
        this.router.navigate(['/']);
    }
}