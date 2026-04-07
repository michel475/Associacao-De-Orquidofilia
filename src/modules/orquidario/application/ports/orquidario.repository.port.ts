import { ReproducaoFlor } from "src/modules/reproducaoFlor/domain/reproducaoFlor";
import { Orquidario } from "../../domain/orquidario";

export interface OrquidarioRepositoryPort {
    create(orquidario: Orquidario): Promise<Orquidario>;
<<<<<<< HEAD
<<<<<<< HEAD
    update(id: number, orquidario: Orquidario): Promise<Orquidario | null>;
=======
    update(orquidario: Orquidario): Promise<Orquidario | null>;
>>>>>>> 609c2b7 (Alterações realizadas para buscar as reproduções de um orquidário)
=======
    update(orquidario: Orquidario): Promise<Orquidario | null>;
>>>>>>> 609c2b7b7a417dce1be783e72ec3b4ba01c78675
    findAll(): Promise<Orquidario[] | null>;
    findById(id: number): Promise<Orquidario | null>;
    listarReproducoes(id: number): Promise<ReproducaoFlor[] | null>;
    delete(id: number): Promise<Orquidario | null>;
}