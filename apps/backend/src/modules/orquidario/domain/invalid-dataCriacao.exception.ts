import { BadRequestException } from '@nestjs/common';

export class InvalidDataCriacaoOrquidario extends BadRequestException {
    constructor(dataCriacao: Date) {
        super(`Data de criação do orquidário não pode ser futura\nData informada: '${dataCriacao}'`);
    }
}