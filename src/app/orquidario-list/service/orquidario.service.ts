import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Orquidario } from "../model/orquidario";
import { ReproducaoFlor } from "../../reproducao-flor-list/model/reproducaoFlor";

@Injectable({providedIn: 'root'})
export class OrquidarioService{
    private readonly http = inject(HttpClient);

    findOrquidarios(): Observable<Orquidario[]>{
        return this.http.get<Orquidario[]>('http://localhost:3000/orquidario')
    }

    createOrquidario(data: Partial<Orquidario>): Observable<Orquidario>{
        return this.http.post<Orquidario>('http://localhost:3000/orquidario',data)
    }

    findOrquidarioById(id: number): Observable<Orquidario>{
        return this.http.get<Orquidario>(`http://localhost:3000/orquidario/${id}`)
    }

    listarReproducoes(id: number): Observable<ReproducaoFlor[]>{
        return this.http.get<ReproducaoFlor[]>(`http://localhost:3000/orquidario/reproducoes/${id}`)
    }

    updateOrquidario(id: number, data: Partial<Orquidario>): Observable<Orquidario>{
        return this.http.put<Orquidario>(`http://localhost:3000/orquidario/${id}`, data)
    }

    deleteOrquidario(id: number): Observable<void>{
        return this.http.delete<void>(`http://localhost:3000/orquidario/${id}`)
    }
}