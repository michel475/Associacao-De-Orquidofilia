import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class CreateReproducaoFlorDTO {
    @ApiProperty({ example: 1 })
    orquidarioId: number;

    @ApiProperty({ example: 'Cattleya Trianae x Laelia purpurata' })
    hibridoNome: string;

    @ApiProperty({ example: '2026-02-01' })
    @IsDateString()
    dataGerminacao: string;

    @ApiProperty({ example: 'true' })
    viavel: boolean;

    @ApiProperty({ example: 45 })
    taxaSucessoPct: number;

}
