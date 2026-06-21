import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrquidarioOrmEntity } from 'src/modules/orquidario/infrastructure/persistence/typeorm/orquidario.orm-entity';
import { ReproducaoFlorOrmEntity } from 'src/modules/reproducaoFlor/infrastructure/persistence/typeorm/reproducaoFlor.orm-entity';
import { User } from 'src/modules/users/user.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'data/associacao-orquidofilia.db',
            entities: [OrquidarioOrmEntity, ReproducaoFlorOrmEntity, User],
            synchronize: true,
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
