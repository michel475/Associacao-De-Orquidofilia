import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReproducaoFlorController } from './presentation/reproducaoFlor.controller';
import { ReproducaoFlorService } from './application/reproducaoFlor.service';
import { ReproducaoFlorOrmEntity } from './infrastructure/persistence/typeorm/reproducaoFlor.orm-entity';
import { ReproducaoFlorTypeOrmRepository } from './infrastructure/persistence/typeorm/reproducaoFlor.typeorm.repository';
import { OrquidarioOrmEntity } from '../orquidario/infrastructure/persistence/typeorm/orquidario.orm-entity';


@Module({
    imports: [TypeOrmModule.forFeature([ReproducaoFlorOrmEntity]), TypeOrmModule.forFeature([OrquidarioOrmEntity])],
    controllers: [ReproducaoFlorController],
    providers: [
        ReproducaoFlorService,
        {
            provide: 'ReproducaoFlorRepositoryPort',
            useClass: ReproducaoFlorTypeOrmRepository,
        },
    ],
})
export class ReproducaoFlorModule { }