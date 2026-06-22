import { BadRequestException } from "@nestjs/common"

export class EnderecoNotFound extends BadRequestException{
    constructor(){
        super(`Preenchimento do campo endereço é obrigatório!`);
    }
}