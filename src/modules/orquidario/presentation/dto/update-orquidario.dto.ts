import {ApiProperty} from '@nestjs/swagger'
import { IsDateString } from 'class-validator';

export class UpdateOrquidarioDTO{
    @ApiProperty({example: 'Avenida Presidente Kennedy, Qd G Lte 10'})
    endereco: string;

    @ApiProperty({ example: '2026-03-26' })
    @IsDateString()
    dataCriacao: string;

    @ApiProperty({example: true})
    irrigadoAuto: boolean;

    @ApiProperty({example: 55})
    areaMquadrados: number;

}