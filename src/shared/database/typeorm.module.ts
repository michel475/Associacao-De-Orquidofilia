import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReproducaoFlorOrmEntity } from 'src/modules/reproducaoFlor/infrastructure/persistence/typeorm/reproducaoFlor.orm-entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'data/app.db',
            entities: [OrquidarioOrmEntity, ReproducaoFlorOrmEntity],
            synchronize: true,
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
