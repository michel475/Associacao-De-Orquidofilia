import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Orquidario } from "../../orquidario-list/model/orquidario";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class OrquidarioService {
    private readonly http = inject(HttpClient);

    createOrquidario(data: Partial<Orquidario>): Observable<Orquidario>{
        return this.http.post<Orquidario>("http://localhost:3000/orquidario", data);
    }

    updateOrquidario(id: string, data:Partial<Orquidario>): Observable<Orquidario>{
        return this.http.put<Orquidario>(`http://localhost:3000/orquidario/${id}`, data);
    }

    findById(id: string): Observable<Orquidario> {
        return this.http.get<Orquidario>(`http://localhost:3000/orquidario/${id}`);
    }
}