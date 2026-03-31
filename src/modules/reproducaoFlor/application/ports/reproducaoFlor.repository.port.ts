import { ReproducaoFlor } from "../../domain/reproducaoFlor";

export interface ReproducaoFlorRepositoryPort {
    create(orquidario: ReproducaoFlor): Promise<ReproducaoFlor>;
    update(orquidario: ReproducaoFlor): Promise<ReproducaoFlor>;
    findAll(): Promise<ReproducaoFlor[] | null>;
    findById(id: number): Promise<ReproducaoFlor | null>;
    delete(id: number): Promise<ReproducaoFlor | null>;
}