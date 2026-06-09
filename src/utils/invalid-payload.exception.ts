import { BadRequestException } from "@nestjs/common";
import { CreateReproducaoFlorDTO } from "src/modules/reproducaoFlor/presentation/dto/create-reproducaoFlor.dto";
import { UpdateReproducaoFlorDTO } from "src/modules/reproducaoFlor/presentation/dto/update-reproducaoFlor.dto";

export class InvalidPayload extends BadRequestException {
    constructor(dtoOrMessage: CreateReproducaoFlorDTO | UpdateReproducaoFlorDTO | string) {
        let message = 'Todos os campos devem ser informados!';

        if (typeof dtoOrMessage === 'string') {
            message = dtoOrMessage;
        } else {
            const dto = dtoOrMessage as CreateReproducaoFlorDTO | UpdateReproducaoFlorDTO;
            const emptyFields:any = [];
            
            if (!dto.orquidarioId) emptyFields.push('orquidarioId');
            if (!dto.hibridoNome) emptyFields.push('hibridoNome');
            if (!dto.dataGerminacao) emptyFields.push('dataGerminacao');
            if (dto.viavel === undefined || dto.viavel === null) emptyFields.push('viavel');
            if (!dto.taxaSucessoPct && dto.taxaSucessoPct !== 0) emptyFields.push('taxaSucessoPct');

            if (emptyFields.length > 0) {
                message = `Campos não informados: ${emptyFields.join(', ')}`;
            }
        }

        super(message);
    }
}

//     @ApiProperty({ example: 45 })
//     taxaSucessoPct: number;