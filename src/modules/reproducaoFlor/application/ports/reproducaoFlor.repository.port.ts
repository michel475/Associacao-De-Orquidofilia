import { ReproducaoFlor } from "../../domain/reproducaoFlor";

export interface ReproducaoFlorRepositoryPort {
    create(reproducaoFlor: ReproducaoFlor): Promise<ReproducaoFlor>;
    findAll(): Promise<ReproducaoFlor[]>
    findById(id: string): Promise<ReproducaoFlor | undefined>
}