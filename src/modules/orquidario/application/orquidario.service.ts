import { Injectable, Inject } from "@nestjs/common";
import type { OrquidarioRepositoryPort } from "./ports/orquidario.repository.port";
import { EnderecoNotFound } from "../domain/endereco-orquidario-notfound.exception";
import { InvalidAreaMQuadradoOrquidario } from "../domain/area-M-quadradosOrquidario.exception";
import { InvalidDataCriacaoOrquidario } from "../domain/invalid-dataCriacao.exception";
import { Orquidario } from "../domain/orquidario";
import { OrquidarioNotFoundException } from "../domain/orquidario-not-found.exception";

@Injectable()
export class OrquidarioService {
    constructor(
        @Inject('OrquidarioRepositoryPort')
        private readonly orquidarioRepo: OrquidarioRepositoryPort,
    ) { }

    async create(id: number, endereco: string, dataCriacao: Date, irrigadoAuto: boolean, areaMquadrados: number) {
        if (!endereco) throw new EnderecoNotFound();
        if (areaMquadrados < 10) throw new InvalidAreaMQuadradoOrquidario(areaMquadrados);
        if (dataCriacao > new Date()) throw new InvalidDataCriacaoOrquidario(dataCriacao);
        console.log(new Date(dataCriacao) + " AHAHAHA " + new Date())

        const orqui = new Orquidario(id, endereco, dataCriacao, true, areaMquadrados);
        return this.orquidarioRepo.create(orqui)
    };

    async findAll(): Promise<Orquidario[]|null> {
        return this.orquidarioRepo.findAll()
    }

    async findById(id: number) {
        const orquidario = this.orquidarioRepo.findById(id)
        if(!orquidario) throw new OrquidarioNotFoundException(id)
        
        return orquidario;
    }

    async update(id: number, endereco: string, dataCriacao: Date, irrigadoAuto: boolean, areaMquadrados: number) {
        const orqui = this.orquidarioRepo.findById(id)
        if(!orqui) throw new OrquidarioNotFoundException(id)
        
        if(!endereco) throw new EnderecoNotFound()
        if(areaMquadrados < 10) throw new InvalidAreaMQuadradoOrquidario(areaMquadrados)
        if(dataCriacao > new Date()) throw new InvalidDataCriacaoOrquidario(dataCriacao)
        
        const orquidario = new Orquidario(
            id,
            endereco,
            dataCriacao,
            irrigadoAuto,
            areaMquadrados
        )
        return this.orquidarioRepo.update(orquidario)
    }

    async delete() {

    }
}