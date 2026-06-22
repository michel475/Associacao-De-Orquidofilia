import { BadRequestException } from '@nestjs/common';

export class InvalidDataGerminacao extends BadRequestException {
    constructor(dataGerminacao: Date, dataCriacaoOrquidario: Date) {
        super(`Data de germinação de reprodução não pode ser anterior à data de criação do orquidário\nData de crição do orquidário: '${dataCriacaoOrquidario}' Data germinação informada: '${dataGerminacao}'`);
    }
}