import { Module } from '@nestjs/common';
import { ReproducaoFlorController } from './presentation/reproducaoFlor.controller';
import { ReproducaoFlorService } from './application/reproducaoFlor.service';
import { ReproducaoFlorRepository } from './infrastructure/persistence/repositories/reproducaoFlor.repository';
import { OrquidarioRepository } from '../orquidario/infrastructure/persistence/repositories/orquidario.repository';

@Module({
    controllers: [ReproducaoFlorController],
    providers: [
        ReproducaoFlorService,
        {
            provide: 'ReproducaoFlorRepositoryPort',
            useClass: ReproducaoFlorRepository,
        },
        {
            provide: 'OrquidarioRepositoryPort',
            useClass: OrquidarioRepository
        }
    ],
})
export class ReproducaoFlorModule { }