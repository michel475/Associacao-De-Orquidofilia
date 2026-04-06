import { ReproducaoFlor } from "../../domain/reproducaoFlor";
import { ReproducaoFlorOrmEntity } from "../../infrastructure/persistence/typeorm/reproducaoFlor.orm-entity"

export interface ReproducaoFlorRepositoryPort {
    create(reproducaoFlor: ReproducaoFlor): Promise<ReproducaoFlor>;
    update(id: number, orquidario: ReproducaoFlor): Promise<ReproducaoFlor>;
    findAll(): Promise<ReproducaoFlor[] | null>;
    findById(id: number): Promise<ReproducaoFlor | null>;
    delete(id: number): Promise<ReproducaoFlor | null>;
    findByOrquidarioIdAndHibridoNome(orquidarioId: number, hibridoNome: string): Promise<ReproducaoFlor | null>;
    findByIdWithRelations(id: number): Promise<ReproducaoFlorOrmEntity | null>;
}