import { Orquidario } from "../../domain/orquidario";

export interface OrquidarioRepositoryPort {
    create(orquidario: Orquidario): Promise<Orquidario>;
    findAll(): Promise<Orquidario[]>;
    findById(id: number): Promise<Orquidario | undefined>;
}