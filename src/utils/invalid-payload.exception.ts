import { BadRequestException } from "@nestjs/common";
import { CreateReproducaoFlorDTO } from "src/modules/reproducaoFlor/presentation/dto/create-reproducaoFlor.dto";
import { UpdateReproducaoFlorDTO } from "src/modules/reproducaoFlor/presentation/dto/update-reproducaoFlor.dto";

export class InvalidPayload extends BadRequestException {
    constructor(dto: CreateReproducaoFlorDTO | UpdateReproducaoFlorDTO) {
        const fields = [{ 'orquidarioId': dto.orquidarioId }, { 'hibridoNome': dto.hibridoNome }, { 'dataGerminacao': dto.dataGerminacao }, { 'viavel': dto.viavel }, { 'taxaSucessoPct': dto.taxaSucessoPct }];
        const emptyFields = fields.map(field => ({
            field: null,
        }))
        let message = 'Campos não informados:';
        for (let i = 0; i < emptyFields.length; i++) {
            message = message + ` '${emptyFields[i]}',`;
        }
        super(`Todos os campos devem ser informados! '${message}'`);
    }
}

//  @ApiProperty({ example: 1 })
//     orquidarioId: number;

//     @ApiProperty({ example: 'Cattleya Trianae x Laelia purpurata' })
//     hibridoNome: string;

//     @ApiProperty({ example: '2026-02-01' })
//     dataGerminacao: Date;

//     @ApiProperty({ example: 'true' })
//     viavel: boolean;

//     @ApiProperty({ example: 45 })
//     taxaSucessoPct: number;