import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateReproducaoFlorDTO {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    orquidarioId: number;

    @ApiProperty({ example: 'Cattleya Trianae x Laelia purpurata' })
    hibridoNome: string;

    @Type(() => Date)
    @ApiProperty({ example: '2026-02-01', type: String, format: 'date' })
    dataGerminacao: Date;

    @ApiProperty({ example: 'true' })
    viavel: boolean;

    @ApiProperty({ example: 45 })
    taxaSucessoPct: number;

}
