import { Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { Injetavel } from './decorators/injetavel-dec';
import type { ConstrutorTabela } from './utils/ReflexaoTabela';
import { DatabaseOperationError } from './database-operation.error';
import { SQLGen } from './utils/SQL-Gen';
import type {
  SQLExecutionResult,
  SQLQueryExecutor,
} from './utils/SQL-Insert-Executor';

export const SQLITE_DATABASE_PATH = Symbol('sqlite-database-path');
export const SQLITE_DATABASE_ENTITIES = Symbol('sqlite-database-entities');

type SQLiteParameter = string | number | Buffer | null;

export interface SQLiteRunResult {
  lastID: number;
  changes: number;
}

export interface SQLiteConnection {
  run(
    sql: string,
    parameters: SQLiteParameter[],
    callback: (
      this: SQLiteRunResult,
      error: (Error & { code?: string }) | null,
    ) => void,
  ): unknown;
  all(
    sql: string,
    parameters: SQLiteParameter[],
    callback: (
      error: (Error & { code?: string }) | null,
      rows: Record<string, unknown>[],
    ) => void,
  ): unknown;
  get(
    sql: string,
    parameters: SQLiteParameter[],
    callback: (
      error: (Error & { code?: string }) | null,
      row?: Record<string, unknown>,
    ) => void,
  ): unknown;
  close(callback: (error: (Error & { code?: string }) | null) => void): void;
}

export interface SQLiteDriver {
  open(
    filename: string,
    callback: (error: (Error & { code?: string }) | null) => void,
  ): SQLiteConnection;
}

@Injetavel()
export class SQLiteDatabase
  implements OnModuleInit, OnModuleDestroy, SQLQueryExecutor
{
  private connection: SQLiteConnection | undefined;

  constructor(
    @Inject(SQLITE_DATABASE_PATH)
    private readonly databasePath: string,
    @Inject(SQLITE_DATABASE_ENTITIES)
    private readonly entities: ConstrutorTabela[],
    private readonly driver: SQLiteDriver,
    private readonly sqlGen = new SQLGen(),
  ) {}

  async onModuleInit(): Promise<void> {
    if (this.databasePath !== ':memory:') {
      await mkdir(dirname(this.databasePath), { recursive: true });
    }

    this.connection = await new Promise((resolve, reject) => {
      const connection = this.driver.open(this.databasePath, (error) => {
        if (error) {
          reject(this.toDatabaseError(error));
          return;
        }
        resolve(connection);
      });
    });

    try {
      for (const entity of this.entities) {
        await this.query(this.sqlGen.criarTabela(entity), []);
      }
    } catch (error) {
      await this.onModuleDestroy();
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    const connection = this.connection;
    this.connection = undefined;

    if (!connection) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      connection.close((error) => {
        if (error) {
          reject(this.toDatabaseError(error));
          return;
        }
        resolve();
      });
    });
  }

  async query(sql: string, parameters: unknown[]): Promise<SQLExecutionResult> {
    const connection = this.connection;
    if (!connection) {
      throw new Error(
        'A conexão SQLite não está inicializada. Aguarde o início do módulo de banco de dados.',
      );
    }

    const sqliteParameters = parameters.map((parameter) =>
      this.toSQLiteParameter(parameter),
    );

    return new Promise((resolve, reject) => {
      connection.run(sql, sqliteParameters, function (error) {
        if (error) {
          reject(
            new DatabaseOperationError(error.message, error.code, {
              cause: error,
            }),
          );
          return;
        }

        resolve({
          lastID: this.lastID,
          changes: this.changes,
        });
      });
    });
  }

  async queryAll(
    sql: string,
    parameters: unknown[],
  ): Promise<Record<string, unknown>[]> {
    const connection = this.connection;
    if (!connection) {
      throw new Error(
        'A conexão SQLite não está inicializada. Aguarde o início do módulo de banco de dados.',
      );
    }

    return new Promise((resolve, reject) => {
      connection.all(
        sql,
        parameters.map((parameter) => this.toSQLiteParameter(parameter)),
        (error, rows) => {
          if (error) {
            reject(this.toDatabaseError(error));
            return;
          }
          resolve(rows);
        },
      );
    });
  }

  async queryOne(
    sql: string,
    parameters: unknown[],
  ): Promise<Record<string, unknown> | undefined> {
    const connection = this.connection;
    if (!connection) {
      throw new Error(
        'A conexão SQLite não está inicializada. Aguarde o início do módulo de banco de dados.',
      );
    }

    return new Promise((resolve, reject) => {
      connection.get(
        sql,
        parameters.map((parameter) => this.toSQLiteParameter(parameter)),
        (error, row) => {
          if (error) {
            reject(this.toDatabaseError(error));
            return;
          }
          resolve(row);
        },
      );
    });
  }

  private toSQLiteParameter(value: unknown): SQLiteParameter {
    if (value === null) {
      return null;
    }
    if (typeof value === 'boolean') {
      return Number(value);
    }
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      Buffer.isBuffer(value)
    ) {
      return value;
    }

    throw new TypeError(
      `Tipo de parâmetro SQLite não suportado: ${typeof value}.`,
    );
  }

  private toDatabaseError(
    error: Error & { code?: string },
  ): DatabaseOperationError {
    return new DatabaseOperationError(error.message, error.code, {
      cause: error,
    });
  }
}
