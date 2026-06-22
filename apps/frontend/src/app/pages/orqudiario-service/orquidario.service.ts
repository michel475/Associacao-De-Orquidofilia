import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Orquidario } from "../orquidario-list/model/orquidario";
import { ReproducaoFlor } from "../reproducao-flor-list/model/reproducaoFlor";
import { API_ENDPOINT } from "../../../../env";

@Injectable({providedIn: 'root'})
export class OrquidarioService{
    private readonly http = inject(HttpClient);

    findOrquidarios(): Observable<Orquidario[]>{
        return this.http.get<Orquidario[]>(`${API_ENDPOINT}/orquidario`)
    }

    createOrquidario(data: Partial<Orquidario>): Observable<Orquidario>{
        return this.http.post<Orquidario>(`${API_ENDPOINT}/orquidario`, data)
    }

    findOrquidarioById(id: number): Observable<Orquidario>{
        return this.http.get<Orquidario>(`${API_ENDPOINT}/orquidario/${id}`)
    }

    listarReproducoes(id: number): Observable<ReproducaoFlor[]>{
        return this.http.get<ReproducaoFlor[]>(`${API_ENDPOINT}/orquidario/reproducoes/${id}`)
    }

    updateOrquidario(id: number, data: Partial<Orquidario>): Observable<Orquidario>{
        return this.http.put<Orquidario>(`${API_ENDPOINT}/orquidario/${id}`, data)
    }

    deleteOrquidario(id: number): Observable<Orquidario>{
        return this.http.delete<Orquidario>(`${API_ENDPOINT}/orquidario/delete/${id}`)
    }
}