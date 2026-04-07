import { Orquidario } from "../../domain/orquidario";

export interface OrquidarioRepositoryPort {
    create(orquidario: Orquidario): Promise<Orquidario>;
    update(id: number, orquidario: Orquidario): Promise<Orquidario | null>;
    findAll(): Promise<Orquidario[] | null>;
    findById(id: number): Promise<Orquidario | null>;
    delete(id: number): Promise<Orquidario | null>;
}