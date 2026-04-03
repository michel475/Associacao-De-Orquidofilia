import { HttpException, Inject, Injectable } from "@nestjs/common";
import type { OrquidarioRepositoryPort } from "./ports/orquidario.repository.port";

@Injectable()
export class OrquidarioService {
    constructor(
        @Inject('OrquidarioRepositoryPort')
        private readonly orquidarioRepo: OrquidarioRepositoryPort,
    ) { }

    async createOrquidario(id: number, endereco: string, dataCriacao: Date, irrigadoAuto: boolean, areaMquadrados: number) {
        if (!id || !endereco || !dataCriacao || !irrigadoAuto || !areaMquadrados)
            throw new ("")
    }
}