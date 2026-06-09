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
}