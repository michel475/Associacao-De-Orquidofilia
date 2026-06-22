import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ReproducaoFlor } from "../model/reproducaoFlor";
import { Observable } from "rxjs";
import { API_ENDPOINT } from "../../../../../env";

@Injectable({providedIn: 'root'})
export class ReproducaoFlorService {
    private readonly http = inject(HttpClient);


    findAll(): Observable<ReproducaoFlor[]>{
        return this.http.get<ReproducaoFlor[]>(`${API_ENDPOINT}/reproducaoFlor/listar`);
    }

    findById(id: string): Observable<ReproducaoFlor> {
        return this.http.get<ReproducaoFlor>(`${API_ENDPOINT}/reproducaoFlor/${id}`);
    }

    updateReproducao(id: string, data: Partial<ReproducaoFlor>): Observable<ReproducaoFlor> {
        return this.http.patch<ReproducaoFlor>(`${API_ENDPOINT}/reproducaoFlor/update/${id}`, data);
    }

    createReproducao(data: Partial<ReproducaoFlor>): Observable<ReproducaoFlor> {
        return this.http.post<ReproducaoFlor>(`${API_ENDPOINT}/reproducaoFlor`, data);
    }

    deleteReproducao(id: number): Observable<ReproducaoFlor>{
        return this.http.delete<ReproducaoFlor>(`${API_ENDPOINT}/reproducaoFlor/deletar/${id}`)
    }
}