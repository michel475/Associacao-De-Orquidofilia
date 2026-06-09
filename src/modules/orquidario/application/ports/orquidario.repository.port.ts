import { Orquidario } from "../../domain/orquidario";

export interface OrquidarioRepositoryPort {
    create(orquidario: Orquidario): Promise<Orquidario>;
    update(orquidario: Orquidario): Promise<Orquidario>;
    findAll(): Promise<Orquidario[] | null>;
    findById(id: number): Promise<Orquidario | null>;
    delete(id: number): Promise<Orquidario | null>;
}