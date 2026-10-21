import { BadRequestException, Injectable, Inject, NotFoundException } from "@nestjs/common";
import type { OrquidarioRepositoryPort } from "./ports/orquidario.repository.port";
import { EnderecoNotFound } from "../domain/endereco-orquidario-notfound.exception";
import { InvalidAreaMQuadradoOrquidario } from "../domain/area-M-quadradosOrquidario.exception";
import { InvalidDataCriacaoOrquidario } from "../domain/invalid-dataCriacao.exception";
import { Orquidario } from "../domain/orquidario";

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

        const orqui = new Orquidario(id, endereco, dataCriacao, irrigadoAuto, areaMquadrados);
        return this.orquidarioRepo.create(orqui)
    };

    findAll(): Promise<Orquidario[]> {
        const alv= this.orquidarioRepo.findAll();
        console.log(alv)
        return alv
    }

    async findById(id: number): Promise<Orquidario> {
        if (!Number.isSafeInteger(id) || id <= 0) {
            throw new BadRequestException('O id deve ser um inteiro positivo.');
        }

        const orquidario = await this.orquidarioRepo.findById(id);
        if (!orquidario) {
            throw new NotFoundException(`Orquidário com id ${id} não foi encontrado.`);
        }
        return orquidario;
    }
}