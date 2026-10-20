import { SuperTabela } from "../superTabela";
import { SQLGen } from "./SQL-Gen";

export interface SQLQueryExecutor {
    query(sql: string, parameters: unknown[]): Promise<unknown>;
}

export class SQLInsertExecutor {
    constructor(
        private readonly executor: SQLQueryExecutor,
        private readonly sqlGen = new SQLGen(),
    ) {}

    public inserir(objeto: SuperTabela<unknown>): Promise<unknown> {
        const insert = this.sqlGen.inserirTupla(objeto);
        return this.executor.query(insert.sql, insert.parameters);
    }
}
