import { OrquidarioEntity } from '../entities/orquidario.entity';
import { Orquidario } from '../../../domain/orquidario';
import { OrquidarioRepositoryPort } from '../../../application/ports/orquidario.repository.port';
import { Injetavel } from 'src/shared/database/decorators/injetavel-dec';
import { Injetar } from 'src/shared/database/decorators/injetar-dec';
import { ReflectiveRepository } from 'src/shared/database/reflective-repository';

@Injetavel()
export class OrquidarioRepository implements OrquidarioRepositoryPort {
  constructor(
    @Injetar(OrquidarioEntity)
    private readonly repo: ReflectiveRepository<OrquidarioEntity>,
  ) {}

  async create(orquidario: Orquidario): Promise<Orquidario> {
    const entity = new OrquidarioEntity(
      0,
      orquidario.endereco,
      orquidario.dataCriacao,
      orquidario.irrigadoAuto,
      orquidario.areaMquadrados,
    );
    const result = await this.repo.inserir(entity);
    return new Orquidario(
      result.lastID,
      entity.endereco,
      entity.dataCriacao,
      entity.irrigadoAuto,
      entity.areaMquadrados,
    );
  }

  async findAll(): Promise<Orquidario[]> {
    const rows = await this.repo.listar();
    return rows.map((row) => this.toDomain(row));
  }

  async findById(id: number): Promise<Orquidario | undefined> {
    const row = await this.repo.buscarPorPk(id);
    return row ? this.toDomain(row) : undefined;
  }

  private toDomain(row: Record<string, unknown>): Orquidario {
    const id = Number(row.id);
    const endereco = String(row.endereco);
    const dataCriacao = new Date(String(row.dataCriacao));
    const irrigadoAuto = row.irrigadoAuto === true ? true : false;
    const areaMquadrados = Number(row.areaMquadrados);
    const data = typeof dataCriacao === 'string' ? new Date(dataCriacao) : dataCriacao;
    console.log(row)

    if (
      typeof id !== 'number' ||
      typeof endereco !== 'string' ||
      !(data instanceof Date) ||
      Number.isNaN(data.getTime())
    ) {
      console.log('validação temporária')
    }

    return new Orquidario(
      id,
      endereco,
      data,
      Boolean(irrigadoAuto),
      areaMquadrados,
    );
  }
}
