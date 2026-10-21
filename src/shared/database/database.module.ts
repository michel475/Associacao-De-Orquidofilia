import { Global, Module } from '@nestjs/common';
import { OrquidarioEntity } from 'src/modules/orquidario/infrastructure/persistence/entities/orquidario.entity';
import { ReproducaoFlorEntity } from 'src/modules/reproducaoFlor/infrastructure/persistence/entities/reproducaoFlor.entity';
import { getEntityRepositoryToken } from './decorators/injetar-dec';
import {
  SQLITE_DATABASE_ENTITIES,
  SQLITE_DATABASE_PATH,
  SQLiteDatabase,
} from './sqlite-database';
import { SQLite3Driver } from './sqlite3-driver';
import { ConstrutorTabela } from './utils/ReflexaoTabela';
import { ReflectiveRepository } from './reflective-repository';

const entities: ConstrutorTabela[] = [OrquidarioEntity, ReproducaoFlorEntity];

const entityRepositoryProviders = entities.map((entity) => ({
  provide: getEntityRepositoryToken(entity),
  useFactory: (database: SQLiteDatabase) =>
    new ReflectiveRepository(entity, database),
  inject: [SQLiteDatabase],
}));

@Global()
@Module({
  providers: [
    {
      provide: SQLITE_DATABASE_PATH,
      useValue: process.env.DATABASE_PATH ?? 'data/app.db',
    },
    {
      provide: SQLITE_DATABASE_ENTITIES,
      useValue: entities,
    },
    {
      provide: SQLite3Driver,
      useFactory: () => new SQLite3Driver(),
    },
    {
      provide: SQLiteDatabase,
      useFactory: (
        path: string,
        registeredEntities: ConstrutorTabela[],
        driver: SQLite3Driver,
      ) => new SQLiteDatabase(path, registeredEntities, driver),
      inject: [SQLITE_DATABASE_PATH, SQLITE_DATABASE_ENTITIES, SQLite3Driver],
    },
    ...entityRepositoryProviders,
  ],
  exports: [
    SQLiteDatabase,
    ...entityRepositoryProviders.map((provider) => provider.provide),
  ],
})
export class DatabaseModule {}
