import { Component, inject, OnInit, signal } from '@angular/core';
import { ReproducaoFlorService } from '../service/reproducaoFlor.service';
import { ReproducaoFlor } from '../model/reproducaoFlor';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reproducao-flor-list',
  imports: [CommonModule,
    MatCard
  ],
  standalone: true,
  templateUrl: './reproducao-flor-list.html',
  styleUrl: '../reproducao-flor-list.css',
})
export class ReproducaoFlorList implements OnInit {
  private readonly reproducaoService = inject(ReproducaoFlorService);

  protected readonly reproducoes = signal<ReproducaoFlor[]>([]);


  colunasExibidas: string[] = ['hibridoNome', 'dataGerminacao', 'taxaSucessoPct']

  ngOnInit(){
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
}
