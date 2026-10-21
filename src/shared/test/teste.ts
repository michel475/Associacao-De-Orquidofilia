import { SQLGen } from "../database/utils/SQL-Gen";
import { OrquidarioEntity } from "src/modules/orquidario/infrastructure/persistence/entities/orquidario.entity";

const orquidario = new OrquidarioEntity(4, "av para quadra 68 lote 6 setor centro", new Date("2021-10-29"), false, 56)
const sqlgen = new SQLGen();
sqlgen.criarTabela(OrquidarioEntity);
sqlgen.inserirTupla(orquidario);