import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateOrquidarioDTO {
    @ApiProperty()
    id: number;

    @ApiProperty({ example: 'Avenida Presidente Kennedy, Qd G Lte 10' })
    enderecoOrquidario: string;

    @Type(() => Date)
    @ApiProperty({ example: '2026-01-09', type: String, format: 'date' })
    dataCriacao: Date;

    @ApiProperty({ example: true })
    irrigadoAuto: boolean;

    @ApiProperty({ example: 55 })
    areaMquadrados: number;
}
