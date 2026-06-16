import { Component, inject, OnInit, signal } from '@angular/core';
import { ReproducaoFlorService } from '../service/reproducaoFlor.service';
import { ReproducaoFlor } from '../model/reproducaoFlor';
import { MatCell, MatCellDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-reproducao-flor-list',
  imports: [CommonModule,
    MatCard,
    MatTable, MatHeaderRowDef, MatRowDef, MatHeaderRow, MatHeaderCellDef, MatCellDef, MatCell,
    MatCardHeader, MatCardContent, MatTableModule
  ],
  standalone: true,
  templateUrl: './reproducao-flor-list.html',
  styleUrl: '../reproducao-flor-list.css',
})
export class ReproducaoFlorList implements OnInit {
  private readonly reproducaoService = inject(ReproducaoFlorService);
  protected readonly reproducoes = signal<ReproducaoFlor[]>([]);

  private readonly route = inject(Router);


  colunasExibidas: string[] = ['orquidarioId', 'hibridoNome', 'dataGerminacao', 'taxaSucessoPct', 'viavel']

  ngOnInit(): void{
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
    })
  }

  createForm(){
    this.route.navigate(['reproducaoFlor', 'create']);
  }
}
