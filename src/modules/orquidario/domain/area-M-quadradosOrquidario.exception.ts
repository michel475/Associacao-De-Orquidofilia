import { BadRequestException } from "@nestjs/common";

export class InvalidAreaMQuadradoOrquidario extends BadRequestException{
    constructor(area: number){
        super(`Valor ${area} inválida para o campo àrea do orquidário!\nÁrea do metro quadrado deve ser superior a 10m²`)
    }
}