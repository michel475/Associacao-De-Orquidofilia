import { BadRequestException } from "@nestjs/common";

export class InvalidPayload extends BadRequestException {
    constructor() {
        super('Necessário informar todos os campos');
        Object.setPrototypeOf(this, InvalidPayload.prototype);
    }
}