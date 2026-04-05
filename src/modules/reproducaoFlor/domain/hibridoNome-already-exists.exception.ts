import { BadRequestException } from '@nestjs/common';

export class HibridoNomeAlreadyExists extends BadRequestException {
    constructor(hibridoNome: string) {
        super(`Híbrido nome '${hibridoNome}' já está cadastrado`);
    }
}