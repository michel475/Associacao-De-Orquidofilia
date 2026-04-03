import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { OrquidarioOrmEntity } from "caminho do orquidario orm entity";
import { ReproducaoFlorOrmEntity } from 'src/modules/reproducaoFlor/infrastructure/persistence/typeorm/reproducaoFlor.orm-entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'data/app.db',
    entities: [OrquidarioOrmEntity, ReproducaoFlorOrmEntity],
    synchronize: false,
});