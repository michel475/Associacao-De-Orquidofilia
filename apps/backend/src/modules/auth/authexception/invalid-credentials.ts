import { BadRequestException } from "@nestjs/common"

export class InvalidCredentials extends BadRequestException{
    constructor(){
        super(`Login inválido. Email ou senha incorretos`);
    }
}