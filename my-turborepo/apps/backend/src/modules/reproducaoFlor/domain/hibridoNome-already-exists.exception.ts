import { ConflictException } from '@nestjs/common';

export class HibridoNomeAlreadyExists extends ConflictException {
    constructor(hibridoNome: string, orquidarioId?: number) {
        const message = orquidarioId 
            ? `Híbrido com nome '${hibridoNome}' já existe para o orquidário ID ${orquidarioId}`
            : `Híbrido nome '${hibridoNome}' já está cadastrado`;
        super(message);
    }
}