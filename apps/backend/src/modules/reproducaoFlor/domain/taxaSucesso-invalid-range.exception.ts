import { BadRequestException } from '@nestjs/common';

export class InvalidRangeTaxaSucessoPct extends BadRequestException {
    constructor(taxaSucessoPct: number) {
        super(`Range '${taxaSucessoPct}' não aceito para taxa de sucesso`);
    }
}