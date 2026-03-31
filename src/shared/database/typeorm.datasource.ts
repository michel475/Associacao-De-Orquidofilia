import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { OrquidarioOrmEntity } from "";
import { ReproducaoFlorOrmEntity } from "";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'data/app.db',
    entities: [/*OrquidarioOrmEntity, ReproducaoFlorOrmEntity*/],
    synchronize: false,
});