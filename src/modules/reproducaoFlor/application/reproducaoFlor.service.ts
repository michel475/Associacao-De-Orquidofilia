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


@Injectable()
export class ReproducaoFlorService {
    constructor(
        @Inject('ReproducaoFlorRepositoryPort')
        private readonly reproducaoFlorRepo: ReproducaoFlorRepositoryPort,
        @Inject('OrquidarioRepositoryPort')
        private readonly orquidarioRepo: OrquidarioRepositoryPort,
    ) { }

    async create(orquidarioId: number, hibridoNome: string, dataGerminacao: string, viavel: boolean, taxaSucessoPct: number) {
        if (!hibridoNome || !dataGerminacao) {
            throw new InvalidPayload("hibridoNome e dataGerminacao são obrigatórios");
        }

        const orquidario = await this.orquidarioRepo.findById(orquidarioId);
        if (!orquidario) {
            throw new OrquidarioNotFoundException(orquidarioId);
        }

        const dataGerminacaoDate = new Date(dataGerminacao);
        const dataCriacaoDate = new Date(orquidario.dataCriacao);

        if (dataGerminacaoDate < dataCriacaoDate) {
            throw new InvalidDataGerminacao(dataGerminacaoDate, orquidario.dataCriacao);
        }

        if (taxaSucessoPct < 0 || taxaSucessoPct > 100) {
            throw new InvalidRangeTaxaSucessoPct(taxaSucessoPct);
        }

        if (viavel === true) {
            if (taxaSucessoPct <= 70) {
                throw new InvalidTaxaSucessoPctViabilidade(taxaSucessoPct, viavel);
            }
        } else {
            if (taxaSucessoPct > 30) {
                throw new InvalidTaxaSucessoPctViabilidade(taxaSucessoPct, viavel);
            }
        }

        const hibrido = await this.reproducaoFlorRepo.findByOrquidarioIdAndHibridoNome(orquidarioId, hibridoNome);
        if (hibrido) {
            throw new HibridoNomeAlreadyExists(hibridoNome, orquidarioId);
        }

        const reproducaoFlor = new ReproducaoFlor(null, orquidarioId, hibridoNome, dataGerminacaoDate, viavel, taxaSucessoPct)
        return this.reproducaoFlorRepo.create(reproducaoFlor)
    }

    async update(id: number, hibridoNome: string, dataGerminacao: Date, viavel: boolean, taxaSucessoPct: number) {
        const reprod = await this.reproducaoFlorRepo.findById(id);
        if (!reprod) {
            throw new ReproducaoFlorNotFoundException(id);
        }

        if (!hibridoNome || !dataGerminacao) {
            throw new InvalidPayload("hibridoNome e dataGerminacao são obrigatórios");
        }

        const orquidario = await this.orquidarioRepo.findById(reprod.orquidarioId);
        if (!orquidario) {
            throw new OrquidarioNotFoundException(reprod.orquidarioId);
        }

        const dataGerminacaoDate = new Date(dataGerminacao).toDateString();
        const dataCriacaoDate = new Date(orquidario.dataCriacao).toDateString();


        if (dataGerminacaoDate > dataCriacaoDate) {
            throw new InvalidDataGerminacao(dataGerminacao, orquidario.dataCriacao);
        }

        if (taxaSucessoPct < 0 || taxaSucessoPct > 100) {
            throw new InvalidRangeTaxaSucessoPct(taxaSucessoPct);
        }

        if (viavel === true) {
            if (taxaSucessoPct <= 70) {
                throw new InvalidTaxaSucessoPctViabilidade(taxaSucessoPct, viavel);
            }
        } else {
            if (taxaSucessoPct > 30) {
                throw new InvalidTaxaSucessoPctViabilidade(taxaSucessoPct, viavel);
            }
        }

        if (hibridoNome !== reprod.hibridoNome) {
            const jaExiste = await this.reproducaoFlorRepo.findByOrquidarioIdAndHibridoNome(reprod.orquidarioId, hibridoNome);
            if (jaExiste) {
                throw new HibridoNomeAlreadyExists(hibridoNome, reprod.orquidarioId);
            }
        }
        const reproducaoFlor = new ReproducaoFlor(id, reprod.orquidarioId, hibridoNome, dataGerminacao, viavel, taxaSucessoPct);
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