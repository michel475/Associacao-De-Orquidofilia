import { ReproducaoFlor } from "src/modules/reproducaoFlor/domain/reproducaoFlor";
import { Orquidario } from "../../domain/orquidario";

export interface OrquidarioRepositoryPort {
    create(orquidario: Orquidario): Promise<Orquidario>;
    update(orquidario: Orquidario): Promise<Orquidario>;
    findAll(): Promise<Orquidario[] | null>;
    findById(id: number): Promise<Orquidario | null>;
    listarReproducoes(): Promise<ReproducaoFlor | null>;
    delete(id: number): Promise<Orquidario | null>;
}