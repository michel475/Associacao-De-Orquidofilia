import { Orquidario } from "src/modules/orquidario/domain/orquidario";
import { ReflexaoTabela } from "../database/utils/ReflexaoTabela";
import { SQLGen } from "../database/utils/SQL-Gen";
import { OrquidarioOrmEntity } from "src/modules/orquidario/infrastructure/persistence/typeorm/orquidario.orm-entity";

const orquidario = new OrquidarioOrmEntity(4, "av para quadra 68 lote 6 setor centro", new Date("2021-10-29"), false, 56)
const sqlgen = new SQLGen();
sqlgen.criarTabela(orquidario);
sqlgen.inserirTupla(orquidario);