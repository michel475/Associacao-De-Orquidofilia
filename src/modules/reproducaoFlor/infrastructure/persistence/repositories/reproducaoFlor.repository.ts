import { ReproducaoFlorRepositoryPort } from '../../../application/ports/reproducaoFlor.repository.port';
import { ReproducaoFlorEntity } from '../entities/reproducaoFlor.entity';
import { ReproducaoFlor } from '../../../domain/reproducaoFlor';
import { Injetavel } from 'src/shared/database/decorators/injetavel-dec';
import { Injetar } from 'src/shared/database/decorators/injetar-dec';
import { ReflectiveRepository } from 'src/shared/database/reflective-repository';

@Injetavel()
export class ReproducaoFlorRepository implements ReproducaoFlorRepositoryPort {
  constructor(
    @Injetar(ReproducaoFlorEntity)
    private readonly repo: ReflectiveRepository<ReproducaoFlorEntity>,
  ) {}

  async create(reproducaoFlor: ReproducaoFlor): Promise<ReproducaoFlor> {
    const entity = new ReproducaoFlorEntity(
      0,
      reproducaoFlor.orquidarioId,
      reproducaoFlor.hibridoNome,
      reproducaoFlor.dataGerminacao,
      reproducaoFlor.viavel,
      reproducaoFlor.taxaSucessoPct,
    );
    const result = await this.repo.inserir(entity);
    return new ReproducaoFlor(
      result.lastID,
      entity.orquidarioId,
      entity.hibridoNome,
      entity.dataGerminacao,
      entity.viavel,
      entity.taxaSucessoPct,
    );
  }

  async findAll(): Promise<ReproducaoFlor[]> {
    const rows = await this.repo.listar()
    return rows.map(row => this.toDomain(row));
  }

  private toDomain(row: Record<string, unknown>): ReproducaoFlor {
      const id = Number(row.id);
      const orquidarioId = Number(row.orquidarioId);
      const hibridoNome = String(row.hibridoNome)
      const dataGerminacao = new Date(String(row.dataGerminacao));
      const viavel = row.viavel === true ? true : false;
      const taxaSucessoPct = Number(row.taxaSucessoPct);
      const data = typeof dataGerminacao === 'string' ? new Date(dataGerminacao) : dataGerminacao;
      console.log(row)
  
      if (
        typeof id !== 'number' ||
        typeof orquidarioId !== 'number' ||
        typeof hibridoNome !== 'string' ||
        typeof taxaSucessoPct !== 'number' ||
        !(data instanceof Date) ||
        Number.isNaN(data.getTime())
      ) {
        console.log('tem parada errada aí irmao')
      }
  
      return new ReproducaoFlor(
        id,
        orquidarioId,
        hibridoNome,
        dataGerminacao,
        Boolean(viavel),
        taxaSucessoPct,
      );
    }

    async findById(id: string): Promise<ReproducaoFlor | undefined> {
      const row = await this.repo.buscarPorPk(Number(id))
      return row ? this.toDomain(row) : undefined
    }
}
