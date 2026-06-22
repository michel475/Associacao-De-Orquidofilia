import { BadRequestException } from "@nestjs/common"

export class InactiveUser extends BadRequestException{
    constructor(){
        super(`Usuário não ativbo. Aguarde a ativação pelo administrador`);
    }
}