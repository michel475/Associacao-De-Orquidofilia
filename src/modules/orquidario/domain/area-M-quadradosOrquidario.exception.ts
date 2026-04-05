<<<<<<< HEAD
import { BadRequestException } from '@nestjs/common';

export class InvalidAreaMQuadradoOrquidario extends BadRequestException {
    constructor(areaM: number) {
        super(`Área do orquidário deve ser superior à 10 metros\nÁrea informada: '${areaM}'`);
=======
import { BadRequestException } from "@nestjs/common";

export class InvalidAreaMQuadradoOrquidario extends BadRequestException{
    constructor(area: number){
        super(`Valor ${area} inválida para o campo àrea do orquidário!\nÁrea do metro quadrado deve ser superior a 10m²`)
>>>>>>> e9d47525487a357f2a88b70ab860ec7df2654e17
    }
}