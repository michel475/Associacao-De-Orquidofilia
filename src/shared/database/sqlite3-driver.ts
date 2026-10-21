import sqlite3 from 'sqlite3';
import { Injetavel } from './decorators/injetavel-dec';
import type { SQLiteConnection, SQLiteDriver } from './sqlite-database';

@Injetavel()
export class SQLite3Driver implements SQLiteDriver {
  open(
    filename: string,
    callback: (error: (Error & { code?: string }) | null) => void,
  ): SQLiteConnection {
    return new sqlite3.Database(filename, callback);
  }
}
