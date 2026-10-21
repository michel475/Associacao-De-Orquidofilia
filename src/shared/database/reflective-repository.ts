import { Injetavel } from './decorators/injetavel-dec';
import type { ConstrutorTabela } from './utils/ReflexaoTabela';
import { SQLGen } from './utils/SQL-Gen';
import {
  SQLExecutionResult,
  SQLInsertExecutor,
} from './utils/SQL-Insert-Executor';
import type { SQLQueryExecutor } from './utils/SQL-Insert-Executor';
import type { SQLReadQueryExecutor } from './utils/SQL-Insert-Executor';
import { SuperTabela } from './superTabela';

@Injetavel()
export class ReflectiveRepository<TEntity extends SuperTabela<unknown>> {
  private readonly insertExecutor: SQLInsertExecutor;

  constructor(
    private readonly entityClass: ConstrutorTabela,
    private readonly executor: SQLQueryExecutor & SQLReadQueryExecutor,
    sqlGen = new SQLGen(),
  ) {
    this.insertExecutor = new SQLInsertExecutor(executor, sqlGen);
    this.sqlGen = sqlGen;
  }

  private readonly sqlGen: SQLGen;

  inserir(entity: TEntity): Promise<SQLExecutionResult> {
    if (entity.constructor !== this.entityClass) {
      throw new Error(
        `O repository de ${this.entityClass.name} não aceita a entidade ${entity.constructor.name}.`,
      );
    }

    return this.insertExecutor.inserir(entity);
  }

  listar(): Promise<Record<string, unknown>[]> {
    return this.executor.queryAll(
      this.sqlGen.selecionarTodos(this.entityClass),
      [],
    );
  }

  buscarPorPk(
    id: number,
  ): Promise<Record<string, unknown> | undefined> {
    return this.executor.queryOne(
      this.sqlGen.selecionarPorPk(this.entityClass),
      [id],
    );
  }
}
