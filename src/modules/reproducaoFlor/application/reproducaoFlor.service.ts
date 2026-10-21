import type { ReproducaoFlorRepositoryPort } from "./ports/reproducaoFlor.repository.port";
import { ReproducaoFlor } from "../domain/reproducaoFlor";
import { Inject, Injectable } from '@nestjs/common';
import { InvalidTaxaSucessoPctViabilidade } from "../domain/taxaSucesso-invalid-range-viability.exception";
import { InvalidRangeTaxaSucessoPct } from "../domain/taxaSucesso-invalid-range.exception";
import { InvalidPayload } from "src/utils/invalid-payload.exception";
import type { OrquidarioRepositoryPort } from "../../orquidario/application/ports/orquidario.repository.port"


@Injectable()
export class ReproducaoFlorService {
    constructor(
        @Inject('ReproducaoFlorRepositoryPort')
        private readonly reproducaoFlorRepo: ReproducaoFlorRepositoryPort,
        @Inject('OrquidarioRepositoryPort')
        private readonly orquidarioRepo: OrquidarioRepositoryPort,
    ) { }

    async create(orquidarioId: number, hibridoNome: string, dataGerminacao: Date, viavel: boolean, taxaSucessoPct: number) {
        if(!orquidarioId) {
            throw new InvalidPayload("Id do orquidário é obrigatório")
        }
        const orquidario = await this.orquidarioRepo.findById(orquidarioId)
        if(!orquidario) {
            throw new InvalidPayload('Orquidário não encontrado');
        }
        if (!hibridoNome || !dataGerminacao) {
            throw new InvalidPayload("hibridoNome e dataGerminacao são obrigatórios");
        }

        const dataGerminacaoDate = new Date(dataGerminacao);

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
            else{
                const orquidario = await this.orquidarioRepo.findById(orquidarioId);
                if(!orquidario) {
                    throw new Error("Orquidario nao encontrado")
                }
                console.log(orquidario)
            }
        }

        const reproducaoFlor = new ReproducaoFlor(null, orquidarioId, hibridoNome, dataGerminacaoDate, viavel, taxaSucessoPct)
        return this.reproducaoFlorRepo.create(reproducaoFlor)
    }

    async findAll() {
        return this.reproducaoFlorRepo.findAll()
    }

    async findById(id: string) {
        return this.reproducaoFlorRepo.findById(id);
    }
}