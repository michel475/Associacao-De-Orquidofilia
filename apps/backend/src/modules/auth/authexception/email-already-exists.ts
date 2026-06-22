import { BadRequestException } from "@nestjs/common"

export class EmailAlreadyExists extends BadRequestException{
    constructor(){
        super(`Email informado já está em uso`);
    }
}