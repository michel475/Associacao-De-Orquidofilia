import type { ReproducaoFlorRepositoryPort } from "./ports/reproducaoFlor.repository.port";
import { ReproducaoFlor } from "../domain/reproducaoFlor";
import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import type { OrquidarioRepositoryPort } from "src/modules/orquidario/application/ports/orquidario.repository.port";
import { OrquidarioNotFoundException } from "src/modules/orquidario/domain/orquidario-not-found.exception";
import { InvalidTaxaSucessoPctViabilidade } from "../domain/taxaSucesso-invalid-range-viability.exception";
import { InvalidRangeTaxaSucessoPct } from "../domain/taxaSucesso-invalid-range.exception";
import { InvalidPayload } from "src/utils/invalid-payload.exception";
import { HibridoNomeAlreadyExists } from "../domain/hibridoNome-already-exists.exception";
import { ReproducaoFlorNotFoundException } from "../domain/reproducaoFlor-not-found.exception";
import { InvalidDataGerminacao } from "../domain/invalid-dataGerminacao-exception";
import { OrquidarioService } from "src/modules/orquidario/application/orquidario.service";


@Injectable()
export class ReproducaoFlorService {
    constructor(@Inject('ReproducaoFlorRepositoryPort')
    private readonly reproducaoFlorRepo: ReproducaoFlorRepositoryPort,
        ) { }

    async create(orquidarioId: number, hibridoNome: string, dataGerminacao: Date, viavel: boolean, taxaSucessoPct: number) {
        // const orquidario =  await this.orquidarioRepo.findById(orquidarioId);
        // if (!orquidario)
        //     throw new OrquidarioNotFoundException(orquidarioId);
        if (taxaSucessoPct < 0 || taxaSucessoPct > 100)
            throw new InvalidRangeTaxaSucessoPct(taxaSucessoPct);
        if (viavel === true) {
            if (taxaSucessoPct <= 70)
                throw new InvalidTaxaSucessoPctViabilidade(taxaSucessoPct, viavel);
        }
        else {
            if (taxaSucessoPct > 30)
                throw new InvalidTaxaSucessoPctViabilidade(taxaSucessoPct, viavel);
        }
        // orquidario.reproducoes.forEach(reprod => {
        //     if (reprod.hibridoNome === hibridoNome)
        //         throw new HibridoNomeAlreadyExists(hibridoNome);
        // })

        // if (dataGerminacao > orquidario.dataCriacao)
        //     throw new InvalidDataGerminacao(dataGerminacao, orquidario.dataCriacao);
        const reproducaoFlor = new ReproducaoFlor(null, orquidarioId, hibridoNome, dataGerminacao, viavel, taxaSucessoPct)
        return this.reproducaoFlorRepo.create(reproducaoFlor)
    }

    async update(id: number, orquidarioId: number, hibridoNome: string, dataGerminacao: Date, viavel: boolean, taxaSucessoPct: number) {
        const reprod = await this.reproducaoFlorRepo.findById(id);
        if (!reprod)
            throw new ReproducaoFlorNotFoundException(id);
        // const orquidario = await this.orquidarioRepo.findById(orquidarioId);
        // if (!orquidario)
        //     throw new OrquidarioNotFoundException(orquidarioId);
        if (taxaSucessoPct < 0 || taxaSucessoPct > 100)
            throw new InvalidRangeTaxaSucessoPct(taxaSucessoPct);
        if (viavel === true) {
            if (taxaSucessoPct <= 70)
                throw new InvalidTaxaSucessoPctViabilidade(taxaSucessoPct, viavel);
        }
        else {
            if (taxaSucessoPct > 30)
                throw new InvalidTaxaSucessoPctViabilidade(taxaSucessoPct, viavel);
        }
        //tem que ser via relations
        // orquidario.reproducoes.forEach(reprod => {
        //     if (reprod.hibridoNome === hibridoNome)
        //         throw new HibridoNomeAlreadyExists(hibridoNome);
        // })
        const reproducaoFlor = new ReproducaoFlor(id, orquidarioId, hibridoNome, dataGerminacao, viavel, taxaSucessoPct);
        return this.reproducaoFlorRepo.update(id, reproducaoFlor);
    }

    async findAll(): Promise<ReproducaoFlor[] | null> {
        return this.reproducaoFlorRepo.findAll();
    }

    async findById(id: number): Promise<ReproducaoFlor | null> {
        const reproducao = this.reproducaoFlorRepo.findById(id);
        if (!reproducao) throw new ReproducaoFlorNotFoundException(id);
        return reproducao;
    }

    async delete(id: number): Promise<ReproducaoFlor | null> {
        const reproducao = this.reproducaoFlorRepo.findById(id);
        if (!reproducao) throw new ReproducaoFlorNotFoundException(id);
        return this.reproducaoFlorRepo.delete(id);
    }
}