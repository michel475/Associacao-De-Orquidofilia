import { ReproducaoFlor } from "src/modules/reproducaoFlor/domain/reproducaoFlor";
import { Orquidario } from "../../domain/orquidario";

export interface OrquidarioRepositoryPort {
    create(orquidario: Orquidario): Promise<Orquidario>;
    update(orquidario: Orquidario): Promise<Orquidario | null>;
    findAll(): Promise<Orquidario[] | null>;
    findById(id: number): Promise<Orquidario | null>;
    listarReproducoes(id: number): Promise<ReproducaoFlor[] | null>;
    delete(id: number): Promise<Orquidario | null>;
}