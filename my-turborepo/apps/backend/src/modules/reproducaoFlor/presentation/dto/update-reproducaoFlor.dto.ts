import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class UpdateReproducaoFlorDTO {

    @ApiProperty({ example: 'Cattleya Trianae x Laelia purpurata' })
    hibridoNome!: string;

    @ApiProperty({ example: '2026-02-01' })
    @IsDateString()
    dataGerminacao!: Date;

    @ApiProperty({ example: 45 })
    taxaSucessoPct!: number;

    @ApiProperty({ example: 'true' })
    viavel!: boolean;

}
