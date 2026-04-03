import { BadRequestException } from '@nestjs/common';

export class InvalidAreaMQuadradoOrquidario extends BadRequestException {
    constructor(areaM: number) {
        super(`Área do orquidário deve ser superior à 10 metros\nÁrea informada: '${areaM}'`);
    }
}