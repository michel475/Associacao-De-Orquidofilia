import {ApiProperty} from '@nestjs/swagger'
import { IsDateString } from 'class-validator';

export class CreateOrquidarioDTO{
    @ApiProperty({example: 'Avenida Presidente Kennedy, Qd G Lte 10'})
    enderecoOrquidario: string;

<<<<<<< HEAD
    @ApiProperty({ example: '2026-03-26' })
    @IsDateString()
    dataCriacao: string;
=======
    @ApiProperty({example: '2026-03-20'})
    dataCriacao: Date;
>>>>>>> ff7bd2b (Remoção do parâmetro id em create-orquidário.dto)

    @ApiProperty({example: true})
    irrigadoAuto: boolean;

    @ApiProperty({example: 55})
    areaMquadrados: number;
}