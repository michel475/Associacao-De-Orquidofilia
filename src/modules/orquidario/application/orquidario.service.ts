import { Injectable,Inject } from "@nestjs/common";
import { OrquidarioRepositoryPort } from "./ports/orquidario.repository.port";
import { EnderecoNotFound } from "../domain/endereco-orquidario-notfound.exception";
import { InvalidAreaMQuadradoOrquidario } from "../domain/area-M-quadradosOrquidario.exception";
import { InvalidDataCriacao } from "../domain/invalid-dataCriacao.exception";
import { Orquidario } from "../domain/orquidario";

@Injectable()
export class OrquidarioService{
    constructor(
        @Inject('OrquidarioRepositoryPort')
        private readonly orquidarioRepo: OrquidarioRepositoryPort,
    ){}

    async create(id: number, endereco: string,dataCriacao: Date,irrigadoAuto: boolean ,areaMquadrados: number){
        if(!endereco) throw new EnderecoNotFound();
        if(areaMquadrados < 10) throw new InvalidAreaMQuadradoOrquidario(areaMquadrados);
        if(dataCriacao > new Date()) throw new InvalidDataCriacao();

        const orqui = new Orquidario(id,endereco,dataCriacao,true,areaMquadrados);
        return this.orquidarioRepo.create(orqui)
    };

    async findAll() {
        
    }

    async findById(id: number){
        
    }

    async update(id: number, endereco: string, dataCriacao: Date, irrigadoAuto: boolean, areaMquadrados: number){

    }

    async delete(){

    }
}