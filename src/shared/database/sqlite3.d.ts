declare module 'sqlite3' {
  interface RunResult {
    lastID: number;
    changes: number;
  }

  interface SqliteError extends Error {
    code?: string;
  }

  type RunCallback = (this: RunResult, error: SqliteError | null) => void;

  class Database {
    constructor(
      filename: string,
      callback?: (error: SqliteError | null) => void,
    );
    run(
      sql: string,
      parameters: readonly (string | number | Buffer | null)[],
      callback: RunCallback,
    ): this;
    all(
      sql: string,
      parameters: readonly (string | number | Buffer | null)[],
      callback: (
        error: SqliteError | null,
        rows: Record<string, unknown>[],
      ) => void,
    ): this;
    get(
      sql: string,
      parameters: readonly (string | number | Buffer | null)[],
      callback: (
        error: SqliteError | null,
        row?: Record<string, unknown>,
      ) => void,
    ): this;
    close(callback: (error: SqliteError | null) => void): void;
  }

  const sqlite3: {
    Database: typeof Database;
    OPEN_READWRITE: number;
    OPEN_CREATE: number;
  };

  export = sqlite3;
}
