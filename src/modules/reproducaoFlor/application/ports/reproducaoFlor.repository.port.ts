import { ReproducaoFlor } from "../../domain/reproducaoFlor";

export interface ReproducaoFlorRepositoryPort {
    create(reproducaoFlor: ReproducaoFlor): Promise<ReproducaoFlor>;
    update(id: number, orquidario: ReproducaoFlor): Promise<ReproducaoFlor>;
    findAll(): Promise<ReproducaoFlor[] | null>;
    findById(id: number): Promise<ReproducaoFlor | null>;
    delete(id: number): Promise<ReproducaoFlor | null>;
}