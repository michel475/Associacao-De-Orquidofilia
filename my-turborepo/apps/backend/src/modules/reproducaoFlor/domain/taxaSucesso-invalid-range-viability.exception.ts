import { BadRequestException } from '@nestjs/common';

export class InvalidTaxaSucessoPctViabilidade extends BadRequestException {
    constructor(taxaSucessoPct: number, viavel: boolean) {
        super(`Range de '${taxaSucessoPct}' é inválido para '${viavel === true ? 'reproduções viáveis' : 'reproduções inviáveis'}'`);
    }
}