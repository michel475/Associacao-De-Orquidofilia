import { ApiProperty } from "@nestjs/swagger";

export class UpdateReproducaoFlorDTO {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Cattleya Trianae x Laelia purpurata' })
    hibridoNome: string;

    @ApiProperty({ example: '2026-02-01' })
    dataGerminacao: Date;

    @ApiProperty({ example: 'true' })
    viavel: boolean;

    @ApiProperty({ example: 45 })
    taxaSucessoPct: number;

}
