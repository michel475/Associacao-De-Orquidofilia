import { BadRequestException } from "@nestjs/common"

export class InactiveUser extends BadRequestException{
    constructor(){
        super(`Usuário não ativo. Aguarde a ativação pelo administrador`);
    }
}