import {ApiProperty} from '@nestjs/swagger'

export class UpdateOrquidarioDTO{
    @ApiProperty()
    id: number;
    
    @ApiProperty({example: 'Avenida Presidente Kennedy, Qd G Lte 10'})
    endereco: string;

    @ApiProperty({example: '26-03-2026'})
    dataCriacao: Date;

    @ApiProperty({example: true})
    irrigadoAuto: boolean;

    @ApiProperty({example: 55})
    areaMquadrados: number;

}