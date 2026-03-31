import type { ReproducaoFlorRepositoryPort } from "./ports/reproducaoFlor.repository.port";
import { ReproducaoFlor } from "../domain/reproducaoFlor";
import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class ReproducaoFlorService {
    constructor(@Inject('ReproducaoFlorRepositoryPort')
    private readonly reproducaoFlorRepo: ReproducaoFlorRepositoryPort,) { }

    async create(orquidarioId: number, hibridoNome: string, dataGerminacao: Date, viavel: boolean, taxaSucessoPct: number) {
        const reproducaoFlor = new ReproducaoFlor(null, orquidarioId, hibridoNome, dataGerminacao, viavel, taxaSucessoPct)
        return this.reproducaoFlorRepo.create(reproducaoFlor)
    }

    async update(id: number, hibridoNome: string, dataGerminacao: Date, viavel: boolean, taxaSucessoPct: number) {
        const reproducaoFlor = new ReproducaoFlor(null, null, hibridoNome, dataGerminacao, viavel, taxaSucessoPct);
        return this.reproducaoFlorRepo.update(reproducaoFlor);
    }
}