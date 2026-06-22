import {ApiProperty} from '@nestjs/swagger'
import { IsDateString } from 'class-validator';

export class UpdateOrquidarioDTO{
    @ApiProperty({example: 'Orquidário Santa Maria'})
    nome!: string;
    
    @ApiProperty({example: 'Avenida Presidente Kennedy, Qd G Lte 10'})
    endereco!: string;

    @ApiProperty({ example: '2026-03-26' })
    @IsDateString()
    dataCriacao!: string;
    
    @ApiProperty({example: 55})
    areaMQuadrados!: number;

    @ApiProperty({example: true})
    irrigadoAuto!: boolean;

}