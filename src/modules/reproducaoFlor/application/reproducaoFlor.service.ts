import type { ReproducaoFlorRepositoryPort } from "./ports/reproducaoFlor.repository.port";
import { ReproducaoFlor } from "../domain/reproducaoFlor";
import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import type { OrquidarioRepositoryPort } from "src/modules/orquidario/application/ports/orquidario.repository.port";

@Injectable()
export class ReproducaoFlorService {
    constructor(@Inject('ReproducaoFlorRepositoryPort')
    private readonly reproducaoFlorRepo: ReproducaoFlorRepositoryPort,
        @Inject('OrquidarioRepositoryPort')
        private readonly orquidarioRepo: OrquidarioRepositoryPort) { }

    async create(orquidarioId: number, hibridoNome: string, dataGerminacao: Date, viavel: boolean, taxaSucessoPct: number) {
        const orquidario = this.orquidarioRepo.findById(orquidarioId);
        if (!orquidario)
            throw new HttpException("Orquidário não encontrado", HttpStatus.NOT_FOUND);
        if (taxaSucessoPct < 0 || taxaSucessoPct > 100)
            throw new HttpException("Taxa de Sucesso inválida", HttpStatus.BAD_REQUEST);
        if (viavel === false)
            if (taxaSucessoPct > 30)
                throw new HttpException("Taxa sucesso deve ser menor que 30%", HttpStatus.BAD_REQUEST);
            else {
                if (taxaSucessoPct <= 70)
                    throw new HttpException("Taxa sucesso deve ser maior que 70%", HttpStatus.BAD_REQUEST);
            }
        const reproducaoFlor = new ReproducaoFlor(null, orquidarioId, hibridoNome, dataGerminacao, viavel, taxaSucessoPct)
        return this.reproducaoFlorRepo.create(reproducaoFlor)
    }

    async update(id: number, hibridoNome: string, dataGerminacao: Date, viavel: boolean, taxaSucessoPct: number) {
        const reproducaoFlor = new ReproducaoFlor(id, null, hibridoNome, dataGerminacao, viavel, taxaSucessoPct);
        return this.reproducaoFlorRepo.update(reproducaoFlor);
    }

    async findAll(): Promise<ReproducaoFlor[] | null> {
        return this.reproducaoFlorRepo.findAll();
    }

    async findById(id: number): Promise<ReproducaoFlor | null> {
        return this.reproducaoFlorRepo.findById(id);
    }

    async delete(id: number): Promise<ReproducaoFlor | null> {
        return this.reproducaoFlorRepo.delete(id);
    }
}