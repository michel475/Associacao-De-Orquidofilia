import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ReproducaoFlor } from "../model/reproducaoFlor";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ReproducaoFlorService {
    private readonly http = inject(HttpClient);


    findAll(): Observable<ReproducaoFlor[]>{
        return this.http.get<ReproducaoFlor[]>('http://localhost:3000/reproducaoFlor/listar');
    }

    findById(id: string): Observable<ReproducaoFlor> {
        return this.http.get<ReproducaoFlor>(`http://localhost:3000/reproducaoFlor/${id}`);
    }

    updateReproducao(id: string, data: Partial<ReproducaoFlor>): Observable<ReproducaoFlor> {
        return this.http.patch<ReproducaoFlor>(`http://localhost:3000/reproducaoFlor/${id}`, data);
    }

    createReproducao(data: Partial<ReproducaoFlor>): Observable<ReproducaoFlor> {
        return this.http.post<ReproducaoFlor>(`http://localhost:3000/reproducaoFlor`, data);
    }
}