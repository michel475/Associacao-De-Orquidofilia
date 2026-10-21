import { SuperTabela } from "../superTabela";
import { SQLGen } from "./SQL-Gen";

export interface SQLQueryExecutor {
    query(sql: string, parameters: unknown[]): Promise<SQLExecutionResult>;
}

export interface SQLReadQueryExecutor {
    queryAll(
        sql: string,
        parameters: unknown[],
    ): Promise<Record<string, unknown>[]>;
    queryOne(
        sql: string,
        parameters: unknown[],
    ): Promise<Record<string, unknown> | undefined>;
}

export interface SQLExecutionResult {
    lastID: number;
    changes: number;
}

export class SQLInsertExecutor {
    constructor(
        private readonly executor: SQLQueryExecutor,
        private readonly sqlGen = new SQLGen(),
    ) {}

    public inserir(objeto: SuperTabela<unknown>): Promise<SQLExecutionResult> {
        const insert = this.sqlGen.inserirTupla(objeto);
        return this.executor.query(insert.sql, insert.parameters);
    }
}
