import { BadRequestException } from "@nestjs/common";

export class InvalidDataCriacao extends BadRequestException{
    constructor(){
        super('Data inválida! Insira uma data válida')
    }
}